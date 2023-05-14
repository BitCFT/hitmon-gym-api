export const IMailServiceToken = Symbol.for("IMailServiceToken");

export type SendEmailParams = {
  to: string;
  subject: string;
  body: any;
};

export interface IMailService {
  sendEmail(sendEmailParams: SendEmailParams): Promise<void>;
}
