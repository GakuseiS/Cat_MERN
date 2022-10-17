-- DropForeignKey
ALTER TABLE `CardItem` DROP FOREIGN KEY `CardItem_basketId_fkey`;

-- DropForeignKey
ALTER TABLE `CardItem` DROP FOREIGN KEY `CardItem_orderId_fkey`;

-- AlterTable
ALTER TABLE `CardItem` MODIFY `basketId` INTEGER NULL,
    MODIFY `orderId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `CardItem` ADD CONSTRAINT `CardItem_basketId_fkey` FOREIGN KEY (`basketId`) REFERENCES `Basket`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardItem` ADD CONSTRAINT `CardItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
