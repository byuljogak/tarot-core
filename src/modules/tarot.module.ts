import { Module } from '@nestjs/common';
import { TarotController } from 'src/controllers/tarot.controller';
import { OpenAIModule } from './openai.module';
import { TodayTarotService } from 'src/services/today_tarot.service';
import { RomanceTarotService } from 'src/services/romance_tarot.service';
import { MonthlyStudyTarotService } from 'src/services/monthly_study_tarot.service';

@Module({
  imports: [OpenAIModule],
  controllers: [TarotController],
  providers: [TodayTarotService, RomanceTarotService, MonthlyStudyTarotService],
})
export class TarotModule {}
