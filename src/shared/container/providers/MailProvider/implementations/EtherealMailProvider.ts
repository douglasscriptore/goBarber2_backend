import { injectable, inject } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';

import IEmailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

// foi feito a inejsão aqui, pois o template depende do provider de Mail, melhor deixar tudo junto.
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
class EtherealMailProvider implements IEmailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const info = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Go Barber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to: { name: to.name, address: to.email },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}

export default EtherealMailProvider;
