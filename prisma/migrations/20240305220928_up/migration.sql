/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `DeliveryAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DeliveryAddress_email_phoneNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryAddress_email_key" ON "DeliveryAddress"("email");
