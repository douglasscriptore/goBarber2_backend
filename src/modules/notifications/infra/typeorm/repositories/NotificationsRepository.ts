import Notification from '../schemas/Notification';
import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateUserDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    // quando utiliza maais de um banco, o que não for default deve ser passado no segundo parametro
    // do getRepository ou getMongoRepository
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateUserDTO): Promise<Notification> {
    const notification = await this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
