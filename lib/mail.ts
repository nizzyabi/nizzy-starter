import { Resend } from "resend";

const resend  = new Resend(process.env.RESEND_API_KEY);

// Send a verification email to the user
export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

    await resend.emails.send({
        from: "Nizar <noreply@nizarlanding.com>",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    })

    resend.contacts.create({
        email: email,
        audienceId: 'ed288a7a-23ef-4f32-a2f1-3dc887da7a1c'
    })

    
}
// Send password reset token to user
export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `localhost:3000/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    })

}