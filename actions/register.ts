"use server"
import * as z from "zod";
import { RegisterSchema } from "@/schemas"

export const register = async (values: z.infer<typeof RegisterSchema>) => {

}