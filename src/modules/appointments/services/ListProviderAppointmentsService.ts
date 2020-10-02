import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointimentsRepository from '../repositories/IAppointimentsRepository';

interface IRequestDTO {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointimentsRepository: IAppointimentsRepository,
  ) { }

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequestDTO): Promise<Appointment[]> {
    const appointments = await this.appointimentsRepository.findAllInDayFromProvider(
      { provider_id, day, month, year },
    );

    return appointments;
  }
}

export default ListProviderAppointmentsService;
