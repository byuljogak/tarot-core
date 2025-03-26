import { z } from 'zod';
import { majorArcanaCardSchema } from './major_arcana.schema';
import { minorArcanaCardSchema } from './minor_arcana';

export const arcanaCardSchema = z.union([
  majorArcanaCardSchema,
  minorArcanaCardSchema,
]);
export type ArcanaCard = z.infer<typeof arcanaCardSchema>;

export const arcanaCardWithoutImageSchema = z.union([
  majorArcanaCardSchema.omit({
    image: true,
  }),
  minorArcanaCardSchema.omit({
    image: true,
  }),
]);
export type ArcanaCardWithoutImage = z.infer<
  typeof arcanaCardWithoutImageSchema
>;
