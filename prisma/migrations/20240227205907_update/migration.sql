/*
  Warnings:

  - You are about to drop the column `productId` on the `Color` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Size` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Color" DROP CONSTRAINT "Color_productId_fkey";

-- DropForeignKey
ALTER TABLE "Size" DROP CONSTRAINT "Size_productId_fkey";

-- AlterTable
ALTER TABLE "Color" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "Size" DROP COLUMN "productId";

-- CreateTable
CREATE TABLE "_ProductToSize" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToColor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSize_AB_unique" ON "_ProductToSize"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSize_B_index" ON "_ProductToSize"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToColor_AB_unique" ON "_ProductToColor"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToColor_B_index" ON "_ProductToColor"("B");

-- AddForeignKey
ALTER TABLE "_ProductToSize" ADD CONSTRAINT "_ProductToSize_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSize" ADD CONSTRAINT "_ProductToSize_B_fkey" FOREIGN KEY ("B") REFERENCES "Size"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToColor" ADD CONSTRAINT "_ProductToColor_A_fkey" FOREIGN KEY ("A") REFERENCES "Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToColor" ADD CONSTRAINT "_ProductToColor_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
