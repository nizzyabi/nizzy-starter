"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token:string) => {

    
    // if no token, display message
    const exisitingToken = await getVerificationTokenByToken(token);

    if(!exisitingToken) {
        return { error: "Token does not exisit!" };
    }
    // if token has expired, display message
    const hasExpired = new Date(exisitingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" };
    }
    // if user does not exist, display message
    const existingUser = await getUserByEmail(exisitingToken.email);

    if (!existingUser) {
        return { error: "User does not exisit!" };
    }
    // update email value when they verify
    await db.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: exisitingToken.email
        }
    })
    // delete token
    await db.verificationToken.delete({
        where: { id: exisitingToken.id }
    });

    return { success: "Email verified!"}

    
    
}