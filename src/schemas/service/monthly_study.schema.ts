import { z } from 'zod';
import { userInfoSchema } from '../user/user_info.schema';
import {
  arcanaCardSchema,
  arcanaCardWithoutImageSchema,
} from '../arcana/arcana';

export const monthlyStudyOpenAIRequestSchema = z.object({
  currentStateCard: arcanaCardWithoutImageSchema,
  obstacleCard: arcanaCardWithoutImageSchema,
  adviceCard: arcanaCardWithoutImageSchema,
  userInfo: userInfoSchema,
});
export type MonthlyStudyOpenAIRequest = z.infer<
  typeof monthlyStudyOpenAIRequestSchema
>;

export const monthlyStudyOpenAIResponseSchema = z.object({
  currentState: z.string(),
  obstacle: z.string(),
  advice: z.string(),
  summary: z.string(),
});
export type MonthlyStudyOpenAIResponse = z.infer<
  typeof monthlyStudyOpenAIResponseSchema
>;

export const monthlyStudyRequestSchema = z.object({
  currentStateCard: arcanaCardSchema,
  obstacleCard: arcanaCardSchema,
  adviceCard: arcanaCardSchema,
  userInfo: userInfoSchema,
});
export type MonthlyStudyRequest = z.infer<typeof monthlyStudyRequestSchema>;
