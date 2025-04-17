import { z } from 'zod';

export const genderSchema = z.union([z.literal('male'), z.literal('female')]);
export type Gender = z.infer<typeof genderSchema>;

export const datingStatusSchema = z.union([
  z.literal('single'),
  z.literal('dating'),
  z.literal('married'),
]);
export type DatingStatus = z.infer<typeof datingStatusSchema>;

export const jobStatusSchema = z.union([
  z.literal('student'),
  z.literal('employed'),
  z.literal('unemployed'),
]);
export type JobStatus = z.infer<typeof jobStatusSchema>;

export const userInfoSchema = z.object({
  gender: genderSchema,
  brithDateTime: z.string().datetime(),
  datingStatus: datingStatusSchema,
  jobStatus: jobStatusSchema,
});

export type UserInfo = z.infer<typeof userInfoSchema>;
