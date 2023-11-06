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
            from: "selamawitlb@gmail.com",
            to: "getanehselam8@gmail.com",
            subject: subject,

            html: body,

        })
            .then(() => {
                console.log('Email sent');
            })
            .catch((e) => {
                console.log('Error sending email', e);
            });
    };


}








