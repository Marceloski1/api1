import { Muscle } from 'src/common/decorators/muscle.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Ejercicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', { length: 255 })
  name: string;

  @Column('character varying', { length: 255 })
  description: string;

  @Column({
    type: 'enum',
    enum: Muscle,
  })
  muscle: Muscle;
}
