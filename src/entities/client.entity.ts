import { genSaltSync, hashSync } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Contact } from "./contact.entity";
import "dotenv/config";

@Entity("clients")
export class Client {
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

  @Column({
    type: "varchar",
    length: 150,
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Contact, (contact) => contact.client)
  contacts: Contact[];

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword(): void {
    if (this.password) {
      const salt = genSaltSync(Number(process.env.SALT_HASH));
      this.password = hashSync(this.password, salt);
    }
  }
}
