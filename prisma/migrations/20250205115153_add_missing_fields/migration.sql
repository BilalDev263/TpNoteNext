/*
  Warnings:

  - You are about to alter the column `amount` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `amount` on the `Revenue` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Revenue` table. All the data in the column will be lost.
  - Added the required column `month` to the `Revenue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `revenue` to the `Revenue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "amount" SET DATA TYPE INTEGER,
ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Revenue" DROP COLUMN "amount",
DROP COLUMN "date",
ADD COLUMN     "month" TEXT NOT NULL,
ADD COLUMN     "revenue" INTEGER NOT NULL;
