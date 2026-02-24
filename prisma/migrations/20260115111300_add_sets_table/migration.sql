/*
  Warnings:

  - Made the column `workout_id` on table `workout_exercises` required. This step will fail if there are existing NULL values in that column.
  - Made the column `exercise_id` on table `workout_exercises` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order_number` on table `workout_sets` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "workout_exercises" DROP CONSTRAINT "workout_exercises_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "workout_exercises" DROP CONSTRAINT "workout_exercises_workout_id_fkey";

-- AlterTable
ALTER TABLE "workout_exercises" ALTER COLUMN "workout_id" SET NOT NULL,
ALTER COLUMN "exercise_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "workout_sets" ALTER COLUMN "order_number" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "workout_exercises" ADD CONSTRAINT "workout_exercises_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_exercises" ADD CONSTRAINT "workout_exercises_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
