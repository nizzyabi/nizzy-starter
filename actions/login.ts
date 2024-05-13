// Actions must be use server
"use server"
import * as z from "zod";
import { LoginSchema } from "@/schemas"

export const login = async (values: z.infer<typeof LoginSchema>) => {

}