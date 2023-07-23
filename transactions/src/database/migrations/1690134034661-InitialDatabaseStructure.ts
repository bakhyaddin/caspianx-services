import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabaseStructure1690134034661 implements MigrationInterface {
    name = 'InitialDatabaseStructure1690134034661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "city" character varying NOT NULL, "district" character varying NOT NULL, "street" character varying NOT NULL, "building" character varying, "building_number" character varying, "apartment_number" character varying, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."bank_accounts_currency_enum" AS ENUM('AZN', 'USD', 'EURO')`);
        await queryRunner.query(`CREATE TABLE "bank_accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "bank_name" character varying NOT NULL, "account_number" character varying NOT NULL, "currency" "public"."bank_accounts_currency_enum" NOT NULL, "addressId" uuid, CONSTRAINT "REL_c6b0c4caea717f24dd1a173220" UNIQUE ("addressId"), CONSTRAINT "PK_c872de764f2038224a013ff25ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "institutions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "realmName" character varying NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "taxId" character varying NOT NULL, "addressId" uuid, CONSTRAINT "REL_8e500098fa33bf92132cd66ca2" UNIQUE ("addressId"), CONSTRAINT "PK_0be7539dcdba335470dc05e9690" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7b896a74ee83ccd557e311d24d" ON "institutions" ("realmName") `);
        await queryRunner.query(`CREATE INDEX "IDX_15c98649276025998cd1acaf61" ON "institutions" ("name") `);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "realm" character varying NOT NULL, "transaction_code" bigint NOT NULL, "description" character varying, "toInstitutionId" uuid, "bankAccountId" uuid, CONSTRAINT "REL_14b059650e8636dec345843cad" UNIQUE ("toInstitutionId"), CONSTRAINT "REL_dd5f9a2ef07b89d35aeb480f37" UNIQUE ("bankAccountId"), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_520746bb2b0bccf96983afc71e" ON "transactions" ("realm") `);
        await queryRunner.query(`CREATE INDEX "IDX_b6ad9578dad7e7a9de482a2d98" ON "transactions" ("transaction_code") `);
        await queryRunner.query(`ALTER TABLE "bank_accounts" ADD CONSTRAINT "FK_c6b0c4caea717f24dd1a1732203" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "institutions" ADD CONSTRAINT "FK_8e500098fa33bf92132cd66ca2d" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_14b059650e8636dec345843cadb" FOREIGN KEY ("toInstitutionId") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_dd5f9a2ef07b89d35aeb480f376" FOREIGN KEY ("bankAccountId") REFERENCES "bank_accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_dd5f9a2ef07b89d35aeb480f376"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_14b059650e8636dec345843cadb"`);
        await queryRunner.query(`ALTER TABLE "institutions" DROP CONSTRAINT "FK_8e500098fa33bf92132cd66ca2d"`);
        await queryRunner.query(`ALTER TABLE "bank_accounts" DROP CONSTRAINT "FK_c6b0c4caea717f24dd1a1732203"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b6ad9578dad7e7a9de482a2d98"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_520746bb2b0bccf96983afc71e"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_15c98649276025998cd1acaf61"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7b896a74ee83ccd557e311d24d"`);
        await queryRunner.query(`DROP TABLE "institutions"`);
        await queryRunner.query(`DROP TABLE "bank_accounts"`);
        await queryRunner.query(`DROP TYPE "public"."bank_accounts_currency_enum"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
