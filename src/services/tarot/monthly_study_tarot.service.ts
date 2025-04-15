import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../openai.service';
import { MonthlyStudyOpenAIRequest } from 'src/schemas/service/monthly_study.schema';

@Injectable()
export class MonthlyStudyTarotService {
  constructor(private readonly openAIService: OpenAIService) {}

  /**
   * Get monthly study tarot message
   * @param data MonthlyStudyOpenAIRequest
   * @returns MonthlyStudyOpenAIResponse
   */
  getMonthlyStudyTarotMessage(data: MonthlyStudyOpenAIRequest) {
    return this.openAIService.getMonthlyStudyTarotMessage(data);
  }
}
