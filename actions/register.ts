"use server"
import * as z from "zod";
import { RegisterSchema } from "@/schemas"
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const exisitingUser = await getUserByEmail(email)

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

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
    );

    return { success: "Email sent!"}

}