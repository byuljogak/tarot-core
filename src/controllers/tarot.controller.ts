import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { Roles } from 'src/decorators/role.decorator';
import { ResponseData } from 'src/interfaces/response.interface';
import { UserRequest } from 'src/interfaces/user_request.interface';
import { ZodValidationPipe } from 'src/pipes/zod_validation.pipe';
import { RoleEnum } from 'src/schemas/role.schema';
import {
  MonthlyStudyRequest,
  monthlyStudyRequestSchema,
} from 'src/schemas/service/monthly_study.schema';
import {
  RomanceRequest,
  romanceRequestSchema,
} from 'src/schemas/service/romance.schema';
import {
  TodayRequest,
  todayRequestSchema,
} from 'src/schemas/service/today.schema';
import { MonthlyStudyTarotService } from 'src/services/tarot/monthly_study_tarot.service';
import { RomanceTarotService } from 'src/services/tarot/romance_tarot.service';
import { TodayTarotService } from 'src/services/tarot/today_tarot.service';

@Controller('tarot')
export class TarotController {
  constructor(
    private readonly todayTarotService: TodayTarotService,
    private readonly romanceTarotService: RomanceTarotService,
    private readonly monthlyStudyTarotService: MonthlyStudyTarotService,
  ) {}

  @Post('today')
  @Roles([RoleEnum.USER, RoleEnum.ADMIN])
  @HttpCode(200)
  async getTodayTarotMessage(
    @Body(new ZodValidationPipe(todayRequestSchema)) data: TodayRequest,
  ): Promise<
    ResponseData<{
      description: string;
    }>
  > {
    const result = await this.todayTarotService.getTodayTarotMessage(data);
    return {
      message: 'success',
      data: result,
    };
  }

  @Post('romance')
  @Roles([RoleEnum.USER, RoleEnum.ADMIN])
  @HttpCode(200)
  @HttpCode(200)
  async getRomanceTarotMessage(
    @Body(new ZodValidationPipe(romanceRequestSchema)) data: RomanceRequest,
  ): Promise<
    ResponseData<{
      description: string;
    }>
  > {
    const result = await this.romanceTarotService.getRomanceTarotMessage(data);
    return {
      message: 'success',
      data: result,
    };
  }

  @Post('monthly-study')
  @Roles([RoleEnum.USER, RoleEnum.ADMIN])
  @HttpCode(200)
  @HttpCode(200)
  async getMonthlyStudyTarotMessage(
    @Body(new ZodValidationPipe(monthlyStudyRequestSchema))
    data: MonthlyStudyRequest,
  ): Promise<
    ResponseData<{
      currentState: string;
      obstacle: string;
      advice: string;
      summary: string;
    }>
  > {
    const result =
      await this.monthlyStudyTarotService.getMonthlyStudyTarotMessage(data);
    return {
      message: 'success',
      data: result,
    };
  }
}
