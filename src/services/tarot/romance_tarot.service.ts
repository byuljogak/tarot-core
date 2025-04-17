import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { OpenAIService } from '../openai.service';
import {
  RomanceOpenAIRequest,
  RomanceOpenAIResponse,
  romanceOpenAIResponseSchema,
} from 'src/schemas/service/romance.schema';
import { PrismaService } from '../prisma.service';
import { LastTarotReading, TarotType } from '@prisma/client';

@Injectable()
export class RomanceTarotService {
  static version = 1.0;

  constructor(
    private readonly openAIService: OpenAIService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Get existing data for romance tarot
   * @param userUuid User UUID
   * @returns RomanceOpenAIResponse | null
   */
  async getExistingData(
    userUuid: string,
  ): Promise<RomanceOpenAIResponse | null> {
    const lastData = await this.prisma.lastTarotReading.findFirst({
      where: {
        user: {
          uuid: userUuid,
        },
        type: TarotType.ROMMANCE,
        version: RomanceTarotService.version,
        updatedAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    });
    if (!lastData) {
      return null;
    }
    const parsed = await romanceOpenAIResponseSchema
      .parseAsync(lastData.data)
      .catch((err) => {
        Logger.error(err, 'RomanceTarotService');
        throw new InternalServerErrorException('Failed to parse data');
      });

    return parsed;
  }

  /**
   * Read romance tarot message
   * @param data RomanceOpenAIRequest
   * @returns RomanceOpenAIResponse
   */
  async readTarot(data: RomanceOpenAIRequest): Promise<RomanceOpenAIResponse> {
    return this.openAIService.getRomanceTarotMessage(data);
  }

  /**
   * Save romance tarot message
   * @param data {{
   *  result: RomanceOpenAIResponse;
   *  userUuid: string;
   * }}
   */
  async saveData(data: {
    result: RomanceOpenAIResponse;
    userUuid: string;
  }): Promise<LastTarotReading> {
    const user = await this.prisma.user.findUnique({
      where: {
        uuid: data.userUuid,
      },
    });
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }
    return this.prisma.lastTarotReading.upsert({
      where: {
        userId_type: {
          userId: user.id,
          type: TarotType.ROMMANCE,
        },
      },
      create: {
        userId: user.id,
        type: TarotType.ROMMANCE,
        version: RomanceTarotService.version,
        data: data.result,
      },
      update: {
        data: data.result,
      },
    });
  }
}
