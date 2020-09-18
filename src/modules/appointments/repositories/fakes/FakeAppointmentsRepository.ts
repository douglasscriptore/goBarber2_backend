import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import Appointment from '../../infra/typeorm/entities/Appointment';

import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointimentsRepository from '@modules/appointments/repositories/IAppointimentsRepository';

class AppointmentsRepository implements IAppointimentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDto): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
