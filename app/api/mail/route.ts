import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST (request: Request, res: Response) {

    const { email } = await request.json();

    const { data, error } = await resend.emails.send({
        from: "Nizzy <noreply@nizzystarter.com>",
        to: [email],
        subject: "Nizzy Starter Kit",
        text: "<p> Your starter kit is here </p>",
    })

    if (error) {
        return Response.json(error)
    }

    resend.contacts.create({
        email: email,
        audienceId: process.env.RESEND_AUDIENCE
    })

    return Response.json({ message: "Email sent successfully" })

}