import { z } from "zod";

/**
 * Hedgehog interface shared between server and client
 */

export const hedgehogSchema = z.object({
  id: z.number(), 
  name: z.string(),
  gender: z.enum(["M", "F"]),
  age: z.number().int().positive(),
  latitude: z.number(),
  longitude: z.number()
});

export type Hedgehog = z.infer<typeof hedgehogSchema>;
