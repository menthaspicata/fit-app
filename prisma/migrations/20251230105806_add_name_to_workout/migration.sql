/*
  Warnings:

  - Added the required column `name` to the `workouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workouts" ADD COLUMN     "name" VARCHAR(100) NOT NULL;
