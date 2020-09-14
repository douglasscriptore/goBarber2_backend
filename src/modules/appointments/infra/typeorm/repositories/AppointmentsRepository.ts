import Appointment from '../entities/Appointment';
import { getRepository, Repository } from 'typeorm';

import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointimentsRepository from '@modules/appointments/repositories/IAppointimentsRepository';

class AppointmentsRepository implements IAppointimentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDto): Promise<Appointment> {
    const appointment = await this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save();

    return appointment;
  }
}

export default AppointmentsRepository;
