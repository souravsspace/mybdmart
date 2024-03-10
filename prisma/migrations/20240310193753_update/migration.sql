/*
  Warnings:

  - You are about to drop the column `quantity` on the `OrderedItem` table. All the data in the column will be lost.
  - Added the required column `productQuantity` to the `OrderedItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderedItem" DROP COLUMN "quantity",
ADD COLUMN     "productQuantity" INTEGER NOT NULL;
