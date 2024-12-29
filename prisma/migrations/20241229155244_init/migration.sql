-- AlterTable
ALTER TABLE "users" ADD COLUMN     "pin" TEXT,
ADD COLUMN     "pinExpiry" TIMESTAMP(3);
