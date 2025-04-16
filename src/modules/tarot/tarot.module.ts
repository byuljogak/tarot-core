import { Module } from '@nestjs/common';
import { TarotController } from 'src/controllers/tarot.controller';
import { OpenAIModule } from '../openai.module';
import { TodayTarotService } from 'src/services/tarot/today_tarot.service';
import { RomanceTarotService } from 'src/services/tarot/romance_tarot.service';
import { MonthlyStudyTarotService } from 'src/services/tarot/monthly_study_tarot.service';

@Module({
  imports: [OpenAIModule],
  controllers: [TarotController],
  providers: [TodayTarotService, RomanceTarotService, MonthlyStudyTarotService],
})
export class TarotModule {}
