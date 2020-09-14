import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDto from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentesRepository {
  create(data: ICreateAppointmentDto): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
