/*
  Warnings:

  - You are about to drop the column `order_number` on the `workout_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `reps` on the `workout_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `sets` on the `workout_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `workout_exercises` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "workout_exercises" DROP COLUMN "order_number",
DROP COLUMN "reps",
DROP COLUMN "sets",
DROP COLUMN "weight";

-- CreateTable
CREATE TABLE "workout_sets" (
    "id" SERIAL NOT NULL,
    "workout_exercise_id" INTEGER NOT NULL,
    "set_number" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "order_number" INTEGER,

    CONSTRAINT "workout_sets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workout_sets" ADD CONSTRAINT "workout_sets_workout_exercise_id_fkey" FOREIGN KEY ("workout_exercise_id") REFERENCES "workout_exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
