/*
  Warnings:

  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.
  - Added the required column `totalItems` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `OrderedItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `OrderedItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "price",
ADD COLUMN     "totalItems" INTEGER NOT NULL,
ADD COLUMN     "totalPrice" DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE "OrderedItem" ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "price" DECIMAL NOT NULL;
