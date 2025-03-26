import { z } from 'zod';

export enum DirectionEnum {
  UPRIGHT = 'upright',
  REVERSED = 'reversed',
}

export const directionSchema = z.nativeEnum(DirectionEnum);

export type Direction = z.infer<typeof directionSchema>;
