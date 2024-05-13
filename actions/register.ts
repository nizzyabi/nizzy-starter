"use server"
import * as z from "zod";
import { RegisterSchema } from "@/schemas"
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const exisitingUser = await db.user.findUnique({
        where: {
            email,
        }
    })

    if (exisitingUser) {
        return { error: "Email already exists!" }
    }

    await db.user.create({
        data: {
            name, 
            email,
            password: hashedPassword
        }
    })

    return { success: "Email sent!"}

}