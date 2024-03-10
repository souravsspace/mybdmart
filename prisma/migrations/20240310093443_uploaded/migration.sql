/*
  Warnings:

  - You are about to drop the column `userId` on the `DeliveryAddress` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DeliveryAddress" DROP CONSTRAINT "DeliveryAddress_userId_fkey";

-- AlterTable
ALTER TABLE "DeliveryAddress" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deliveryAddressId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_deliveryAddressId_fkey" FOREIGN KEY ("deliveryAddressId") REFERENCES "DeliveryAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
