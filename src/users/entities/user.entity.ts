import { Column, UpdateDateColumn, Entity } from 'typeorm';

@Entity()
export class User {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 15 })
  username: string;

  @Column({ length: 50 })
  first_name: string;

  @Column({ length: 50 })
  last_name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: true })
  active: boolean;

  @UpdateDateColumn()
  updatedAt: Date;
}
