import { MailerService } from "@nestjs-modules/mailer";

export class emailsend {
    constructor() { }
    public static async sendEmail(
        mailerService: MailerService,
        from: string,
        to: string,
        subject: string,
        body: string,
    ): Promise<any> {
        await mailerService.sendMail({
            from: '"No Reply" <noreply@example.com>',
            replyTo: "noreply@example.com",
            to: to,
            subject: subject,
            html: body,
        })
        return "email sent"
    };
}








