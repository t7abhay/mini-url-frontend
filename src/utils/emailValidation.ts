import { z } from "zod";
const emailSchema = z.string().email();

export const isValidEmail = (email: string): boolean => {
  const { success } = emailSchema.safeParse(email);

  return success;
};
