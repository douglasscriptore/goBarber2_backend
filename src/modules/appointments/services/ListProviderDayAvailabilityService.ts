import { injectable, inject } from 'tsyringe';
import { getHours } from 'date-fns';

import IAppointimentsRepository from '../repositories/IAppointimentsRepository';

interface IRequestDTO {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

// no retorno da função, o certo é vc já retornar a estrutura correta e não usar IResponse[] por exemplo.
type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointimentsRepository')
    private appointimentsRepository: IAppointimentsRepository,
  ) { }

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequestDTO): Promise<IResponse> {
    const appointments = await this.appointimentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        month,
        year,
        day,
      },
    );

    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );
      return { hour, available: !hasAppointmentInHour };
    });
    return availability;
  }
}

export default ListProviderDayAvailabilityService;
