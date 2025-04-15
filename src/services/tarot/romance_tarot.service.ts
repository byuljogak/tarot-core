import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../openai.service';
import { RomanceOpenAIRequest } from 'src/schemas/service/romance.schema';

@Injectable()
export class RomanceTarotService {
  constructor(private readonly openAIService: OpenAIService) {}

  /**
   * Get romance tarot message
   * @param data RomanceOpenAIRequest
   * @returns RomanceOpenAIResponse
   */
  getRomanceTarotMessage(data: RomanceOpenAIRequest) {
    return this.openAIService.getRomanceTarotMessage(data);
  }
}
