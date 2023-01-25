/*
  Warnings:

  - You are about to drop the column `hashedJwt` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Order` table. All the data in the column will be lost.
  - Made the column `auctionEnd` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_clientId_fkey`;

-- AlterTable
ALTER TABLE `Bid` ADD COLUMN `clientId` INTEGER NULL,
    ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `parent_id` INTEGER NULL,
    MODIFY `description` VARCHAR(2000) NULL;

-- AlterTable
ALTER TABLE `Client` DROP COLUMN `hashedJwt`,
    ADD COLUMN `twoFactorAuth` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `clientId`,
    ADD COLUMN `ownerId` INTEGER NULL,
    ADD COLUMN `productId` INTEGER NULL,
    ADD COLUMN `product_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `Color` VARCHAR(191) NULL,
    ADD COLUMN `Interior_Color` VARCHAR(191) NULL,
    ADD COLUMN `Interior_Material` VARCHAR(191) NULL,
    ADD COLUMN `Material` VARCHAR(191) NULL,
    ADD COLUMN `Size` VARCHAR(191) NULL,
    ADD COLUMN `brandId` INTEGER NULL,
    ADD COLUMN `closure` ENUM('ZIP', 'BUTTON', 'CLOSED') NOT NULL DEFAULT 'ZIP',
    ADD COLUMN `department` ENUM('MEN', 'WOMEN', 'KIDS') NOT NULL DEFAULT 'MEN',
    MODIFY `state` ENUM('Active', 'Desactive', 'Sold', 'OUT') NOT NULL DEFAULT 'Active',
    MODIFY `auctionEnd` DATETIME(3) NOT NULL,
    MODIFY `condition` VARCHAR(191) NULL DEFAULT 'Good';

-- CreateTable
CREATE TABLE `Banner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(1000) NOT NULL,
    `image` VARCHAR(1000) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Order_clientId_fkey` ON `Order`(`ownerId`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bid` ADD CONSTRAINT `Bid_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
