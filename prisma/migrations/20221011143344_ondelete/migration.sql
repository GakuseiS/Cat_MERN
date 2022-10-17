-- DropForeignKey
ALTER TABLE `CardItem` DROP FOREIGN KEY `CardItem_basketId_fkey`;

-- AddForeignKey
ALTER TABLE `CardItem` ADD CONSTRAINT `CardItem_basketId_fkey` FOREIGN KEY (`basketId`) REFERENCES `Basket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
