import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointimentsRepository from '../repositories/IAppointimentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

// o injectable precisa ir em toda a classe que recebe a injeção de dependencia
@injectable()
class CreateAppointmentService {
  // se criar a variavel que vc recebe como parametro no constructor como private, não precisa recriar a variavel
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointimentsRepository,
  ) { }

  public async execute({
    date,
    provider_id,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    // o create cria a instancia do objeto mas não salva no banco de dados
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
