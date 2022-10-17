/*
  Warnings:

  - You are about to drop the column `addon_milk` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `addon_sugar` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `addon_vitamin` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `addon_water` on the `Program` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Program` DROP COLUMN `addon_milk`,
    DROP COLUMN `addon_sugar`,
    DROP COLUMN `addon_vitamin`,
    DROP COLUMN `addon_water`,
    ADD COLUMN `milk` VARCHAR(191) NULL,
    ADD COLUMN `sugar` VARCHAR(191) NULL,
    ADD COLUMN `vitamin` VARCHAR(191) NULL,
    ADD COLUMN `water` VARCHAR(191) NULL;
