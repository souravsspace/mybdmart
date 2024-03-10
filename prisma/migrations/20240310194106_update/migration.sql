-- AlterTable
ALTER TABLE "OrderedItem" ALTER COLUMN "productId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_ColorToOrderedItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OrderedItemToSize" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ColorToOrderedItem_AB_unique" ON "_ColorToOrderedItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ColorToOrderedItem_B_index" ON "_ColorToOrderedItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrderedItemToSize_AB_unique" ON "_OrderedItemToSize"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderedItemToSize_B_index" ON "_OrderedItemToSize"("B");

-- AddForeignKey
ALTER TABLE "OrderedItem" ADD CONSTRAINT "OrderedItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColorToOrderedItem" ADD CONSTRAINT "_ColorToOrderedItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColorToOrderedItem" ADD CONSTRAINT "_ColorToOrderedItem_B_fkey" FOREIGN KEY ("B") REFERENCES "OrderedItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderedItemToSize" ADD CONSTRAINT "_OrderedItemToSize_A_fkey" FOREIGN KEY ("A") REFERENCES "OrderedItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderedItemToSize" ADD CONSTRAINT "_OrderedItemToSize_B_fkey" FOREIGN KEY ("B") REFERENCES "Size"("id") ON DELETE CASCADE ON UPDATE CASCADE;
