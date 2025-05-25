import { z } from "zod";

/**
 * Hedgehog interface - added here as sharing is not working
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
