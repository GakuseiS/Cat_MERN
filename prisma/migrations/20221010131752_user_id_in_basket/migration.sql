/*
  Warnings:

  - You are about to drop the column `basketId` on the `Basket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Basket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Basket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Basket` DROP FOREIGN KEY `Basket_basketId_fkey`;

-- AlterTable
ALTER TABLE `Basket` DROP COLUMN `basketId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Basket_userId_key` ON `Basket`(`userId`);

-- AddForeignKey
ALTER TABLE `Basket` ADD CONSTRAINT `Basket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
