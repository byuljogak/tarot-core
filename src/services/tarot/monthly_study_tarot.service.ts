import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { OpenAIService } from '../openai.service';
import {
  MonthlyStudyOpenAIRequest,
  MonthlyStudyOpenAIResponse,
  monthlyStudyOpenAIResponseSchema,
} from 'src/schemas/service/monthly_study.schema';
import { PrismaService } from '../prisma.service';
import { LatestTarot, TarotType } from '@prisma/client';

@Injectable()
export class MonthlyStudyTarotService {
  static version = 1.0;

  constructor(
    private readonly openAIService: OpenAIService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Get existing data for monthly study tarot
   * @param userUuid User UUID
   * @returns MonthlyStudyOpenAIResponse | null
   */
  async getExistingData(
    userUuid: string,
  ): Promise<MonthlyStudyOpenAIResponse | null> {
    const lastData = await this.prisma.latestTarot.findFirst({
      where: {
        user: {
          uuid: userUuid,
        },
        type: TarotType.MONTHLY_STUDY,
        version: MonthlyStudyTarotService.version,
        updatedAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    });
    if (!lastData) {
      return null;
    }
    const parsed = await monthlyStudyOpenAIResponseSchema
      .parseAsync(lastData.data)
      .catch((err) => {
        Logger.error(err, 'MonthlyStudyTarotService');
        throw new InternalServerErrorException('Failed to parse data');
      });

    return parsed;
  }

  /**
   * Read monthly study tarot message
   * @param data MonthlyStudyOpenAIRequest
   * @returns MonthlyStudyOpenAIResponse
   */
  async readTarot(
    data: MonthlyStudyOpenAIRequest,
  ): Promise<MonthlyStudyOpenAIResponse> {
    return this.openAIService.getMonthlyStudyTarotMessage(data);
  }

  /**
   * Save monthly study tarot message
   * @param data {{
   *  result: MonthlyStudyOpenAIResponse;
   *  userUuid: string;
   * }}
   */
  async saveData(data: {
    result: MonthlyStudyOpenAIResponse;
    userUuid: string;
  }): Promise<LatestTarot> {
    const user = await this.prisma.user.findUnique({
      where: {
        uuid: data.userUuid,
      },
    });
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }
    return this.prisma.latestTarot.upsert({
      where: {
        userId_type: {
          userId: user.id,
          type: TarotType.MONTHLY_STUDY,
        },
      },
      create: {
        userId: user.id,
        type: TarotType.MONTHLY_STUDY,
        version: MonthlyStudyTarotService.version,
        data: data.result,
      },
      update: {
        data: data.result,
      },
    });
  }
}
