import { z } from "zod";

export const isValidUrl = (url: string): boolean => {
  const urlSchema = z.string().url();

  const result  = urlSchema.safeParse(url);

  return result.success;
};
