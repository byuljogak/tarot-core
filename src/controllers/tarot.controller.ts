import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { UserRequest } from 'src/interfaces/user_request.interface';
import { MonthlyStudyRequest } from 'src/schemas/service/monthly_study.schema';
import { RomanceRequest } from 'src/schemas/service/romance.schema';
import { TodayRequest } from 'src/schemas/service/today.schema';
import { MonthlyStudyTarotService } from 'src/services/monthly_study_tarot.service';
import { RomanceTarotService } from 'src/services/romance_tarot.service';
import { TodayTarotService } from 'src/services/today_tarot.service';

@Controller('tarot')
export class TarotController {
  constructor(
    private readonly todayTarotService: TodayTarotService,
    private readonly romanceTarotService: RomanceTarotService,
    private readonly monthlyStudyTarotService: MonthlyStudyTarotService,
  ) {}

  @Post('today')
  @HttpCode(200)
  async getTodayTarotMessage(
    @Body() data: TodayRequest,
    @Req() req: UserRequest,
  ) {
    const result = await this.todayTarotService.getTodayTarotMessage(data);
    return result;
  }

  @Post('romance')
  @HttpCode(200)
  async getRomanceTarotMessage(
    @Body() data: RomanceRequest,
    @Req() req: UserRequest,
  ) {
    return this.romanceTarotService.getRomanceTarotMessage(data);
  }

  @Post('monthly-study')
  @HttpCode(200)
  async getMonthlyStudyTarotMessage(
    @Body() data: MonthlyStudyRequest,
    @Req() req: UserRequest,
  ) {
    return this.monthlyStudyTarotService.getMonthlyStudyTarotMessage(data);
  }
}
