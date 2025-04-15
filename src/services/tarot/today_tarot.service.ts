import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../openai.service';
import { TodayOpenAIRequest } from 'src/schemas/service/today.schema';

@Injectable()
export class TodayTarotService {
  constructor(private readonly openAIService: OpenAIService) {}

  /**
   * Get today tarot message
   * @param data TodayOpenAIRequest
   * @returns TodayOpenAIResponse
   */
  getTodayTarotMessage(data: TodayOpenAIRequest) {
    return this.openAIService.getTodayTarotMessage(data);
  }
}
