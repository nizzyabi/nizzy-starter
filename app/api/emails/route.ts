import { Resend } from "resend"
import RepoEmail from "@/components/email/email";
import { render } from "@react-email/render"
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        const { data, error } = await resend.emails.send({
            from: "Nizzy <noreply@nizzystarter.com>",
            to: [email],
            subject: "Nizzy Starter Kit",
            html: render(RepoEmail()),
        });

        if (error) {
            return new NextResponse(JSON.stringify(error), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        await resend.contacts.create({
            email: email,
            audienceId: process.env.RESEND_AUDIENCE as string
        });

        return new NextResponse(JSON.stringify({ message: "Email sent successfully" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error:any) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
