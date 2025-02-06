/*
  Warnings:

  - Made the column `schedule` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `capacity` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "schedule" SET NOT NULL,
ALTER COLUMN "capacity" SET NOT NULL;
