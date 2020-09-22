import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IEmailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IEmailProvider,
    @inject('UsersTokenRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) { }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.usersTokensRepository.generate(user.id);

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido ${token}`,
    );
  }
}

export default SendForgotPasswordEmailService;
