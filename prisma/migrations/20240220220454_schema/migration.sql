/*
  Warnings:

  - You are about to alter the column `totalPrice` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Integer`.
  - You are about to alter the column `price` on the `OrderedItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Integer`.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Integer`.
  - You are about to alter the column `newPrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "totalPrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "OrderedItem" ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "newPrice" SET DATA TYPE INTEGER;
