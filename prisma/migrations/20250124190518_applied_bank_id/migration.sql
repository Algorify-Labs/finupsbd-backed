/*
  Warnings:

  - Added the required column `appliedBankId` to the `applicationFrom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "applicationFrom" ADD COLUMN     "appliedBankId" TEXT NOT NULL,
ADD COLUMN     "bankId" TEXT,
ALTER COLUMN "applicationId" DROP NOT NULL;
