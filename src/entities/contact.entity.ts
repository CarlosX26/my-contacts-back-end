import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Client } from "./client.entity";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 128,
  })
  fullName: string;

  @Column({
    type: "varchar",
    length: 128,
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 11,
    unique: true,
  })
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Client, (client) => client.contacts)
  client: Client;
}
