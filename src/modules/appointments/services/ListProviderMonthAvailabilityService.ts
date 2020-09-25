import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointimentsRepository from '../repositories/IAppointimentsRepository';

interface IRequestDTO {
  provider_id: string;
  month: number;
  year: number;
}

// no retorno da função, o certo é vc já retornar a estrutura correta e não usar IResponse[] por exemplo.
type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointimentsRepository')
    private appointimentsRepository: IAppointimentsRepository,
  ) { }

  public async execute({
    provider_id,
    month,
    year,
  }: IRequestDTO): Promise<IResponse> {
    const appointments = await this.appointimentsRepository.findAllInMonthFromProvider(
      { provider_id, month, year },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1, // como o index inicia em 0, e quero retornar os dias, coloco + 1 para retornar dia primeiro
    );

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return { day, available: appointmentsInDay.length < 10 };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
