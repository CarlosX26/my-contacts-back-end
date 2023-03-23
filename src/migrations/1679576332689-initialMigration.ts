import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1679576332689 implements MigrationInterface {
    name = 'initialMigration1679576332689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, "phoneNumber" character varying(11) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" uuid, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, "phoneNumber" character varying(11) NOT NULL, "password" character varying(150) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "UQ_c7997e228eb23f5f3931ac6701c" UNIQUE ("phoneNumber"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_8039454fab552403d5579cf7423" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_8039454fab552403d5579cf7423"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
    }

}
