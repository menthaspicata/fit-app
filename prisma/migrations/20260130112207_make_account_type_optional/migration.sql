/*
  Warnings:

  - The primary key for the `Authenticator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `Authenticator` table. All the data in the column will be lost.
  - The primary key for the `exercises` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `muscle_group` on the `exercises` table. All the data in the column will be lost.
  - The primary key for the `invites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `invites` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `invites` table. All the data in the column will be lost.
  - You are about to drop the column `trainer_id` on the `invites` table. All the data in the column will be lost.
  - The primary key for the `measurements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `measurements` table. All the data in the column will be lost.
  - The primary key for the `refresh_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `ip_address` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `user_agent` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `refresh_tokens` table. All the data in the column will be lost.
  - The primary key for the `user_sets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `exercise_id` on the `user_sets` table. All the data in the column will be lost.
  - You are about to drop the column `session_id` on the `user_sets` table. All the data in the column will be lost.
  - You are about to drop the column `set_number` on the `user_sets` table. All the data in the column will be lost.
  - The primary key for the `user_workout_sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `finished_at` on the `user_workout_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `started_at` on the `user_workout_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `user_workout_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `user_workout_id` on the `user_workout_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `workout_id` on the `user_workout_sessions` table. All the data in the column will be lost.
  - The primary key for the `user_workouts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assigned_by` on the `user_workouts` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `user_workouts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `user_workouts` table. All the data in the column will be lost.
  - You are about to drop the column `workout_id` on the `user_workouts` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `trainer_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - The primary key for the `workout_exercises` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `exercise_id` on the `workout_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `workout_id` on the `workout_exercises` table. All the data in the column will be lost.
  - The primary key for the `workout_sets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `workout_exercise_id` on the `workout_sets` table. All the data in the column will be lost.
  - The primary key for the `workouts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `workouts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `workouts` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Authenticator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciseId` to the `workout_exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workoutId` to the `workout_exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workoutExerciseId` to the `workout_sets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_id_fkey";

-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_trainer_id_fkey";

-- DropForeignKey
ALTER TABLE "measurements" DROP CONSTRAINT "measurements_user_id_fkey";

-- DropForeignKey
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_sets" DROP CONSTRAINT "user_sets_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "user_sets" DROP CONSTRAINT "user_sets_session_id_fkey";

-- DropForeignKey
ALTER TABLE "user_workout_sessions" DROP CONSTRAINT "user_workout_sessions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_workout_sessions" DROP CONSTRAINT "user_workout_sessions_user_workout_id_fkey";

-- DropForeignKey
ALTER TABLE "user_workout_sessions" DROP CONSTRAINT "user_workout_sessions_workout_id_fkey";

-- DropForeignKey
ALTER TABLE "user_workouts" DROP CONSTRAINT "user_workouts_assigned_by_fkey";

-- DropForeignKey
ALTER TABLE "user_workouts" DROP CONSTRAINT "user_workouts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_workouts" DROP CONSTRAINT "user_workouts_workout_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_trainer_id_fkey";

-- DropForeignKey
ALTER TABLE "workout_exercises" DROP CONSTRAINT "workout_exercises_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "workout_exercises" DROP CONSTRAINT "workout_exercises_workout_id_fkey";

-- DropForeignKey
ALTER TABLE "workout_sets" DROP CONSTRAINT "workout_sets_workout_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "workouts" DROP CONSTRAINT "workouts_user_id_fkey";

-- AlterTable
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId", "credentialID");

-- AlterTable
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_pkey",
DROP COLUMN "muscle_group",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "muscleGroup" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "exercises_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "exercises_id_seq";

-- AlterTable
ALTER TABLE "invites" DROP CONSTRAINT "invites_pkey",
DROP COLUMN "created_at",
DROP COLUMN "expires_at",
DROP COLUMN "trainer_id",
ADD COLUMN     "createdAt" TIMESTAMPTZ,
ADD COLUMN     "expiresAt" TIMESTAMPTZ,
ADD COLUMN     "trainerId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "invites_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "invites_id_seq";

-- AlterTable
ALTER TABLE "measurements" DROP CONSTRAINT "measurements_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "date" TIMESTAMPTZ,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "measurements_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "measurements_id_seq";

-- AlterTable
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_pkey",
DROP COLUMN "created_at",
DROP COLUMN "expires_at",
DROP COLUMN "ip_address",
DROP COLUMN "user_agent",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMPTZ,
ADD COLUMN     "expiresAt" TIMESTAMPTZ,
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "userAgent" TEXT,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "refresh_tokens_id_seq";

-- AlterTable
ALTER TABLE "user_sets" DROP CONSTRAINT "user_sets_pkey",
DROP COLUMN "exercise_id",
DROP COLUMN "session_id",
DROP COLUMN "set_number",
ADD COLUMN     "exerciseId" TEXT,
ADD COLUMN     "sessionId" TEXT,
ADD COLUMN     "setNumber" INTEGER,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_sets_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_sets_id_seq";

-- AlterTable
ALTER TABLE "user_workout_sessions" DROP CONSTRAINT "user_workout_sessions_pkey",
DROP COLUMN "finished_at",
DROP COLUMN "started_at",
DROP COLUMN "user_id",
DROP COLUMN "user_workout_id",
DROP COLUMN "workout_id",
ADD COLUMN     "finishedAt" TIMESTAMPTZ,
ADD COLUMN     "startedAt" TIMESTAMPTZ,
ADD COLUMN     "userId" TEXT,
ADD COLUMN     "userWorkoutId" TEXT,
ADD COLUMN     "workoutId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_workout_sessions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_workout_sessions_id_seq";

-- AlterTable
ALTER TABLE "user_workouts" DROP CONSTRAINT "user_workouts_pkey",
DROP COLUMN "assigned_by",
DROP COLUMN "start_date",
DROP COLUMN "user_id",
DROP COLUMN "workout_id",
ADD COLUMN     "assignedBy" TEXT,
ADD COLUMN     "startDate" TIMESTAMPTZ,
ADD COLUMN     "userId" TEXT,
ADD COLUMN     "workoutId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_workouts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_workouts_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "created_at",
DROP COLUMN "trainer_id",
DROP COLUMN "updated_at",
DROP COLUMN "username",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "trainerId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AlterTable
ALTER TABLE "workout_exercises" DROP CONSTRAINT "workout_exercises_pkey",
DROP COLUMN "exercise_id",
DROP COLUMN "workout_id",
ADD COLUMN     "exerciseId" TEXT NOT NULL,
ADD COLUMN     "workoutId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "workout_exercises_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "workout_exercises_id_seq";

-- AlterTable
ALTER TABLE "workout_sets" DROP CONSTRAINT "workout_sets_pkey",
DROP COLUMN "workout_exercise_id",
ADD COLUMN     "workoutExerciseId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "workout_sets_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "workout_sets_id_seq";

-- AlterTable
ALTER TABLE "workouts" DROP CONSTRAINT "workouts_pkey",
DROP COLUMN "created_at",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMPTZ,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "workouts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "workouts_id_seq";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "account" (
    "type" TEXT,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "password" TEXT,
    "scope" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "session" (
    "sessionToken" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_sessionToken_key" ON "session"("sessionToken");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurements" ADD CONSTRAINT "measurements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_exercises" ADD CONSTRAINT "workout_exercises_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_exercises" ADD CONSTRAINT "workout_exercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sets" ADD CONSTRAINT "workout_sets_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "workout_exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_workouts" ADD CONSTRAINT "user_workouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_workouts" ADD CONSTRAINT "user_workouts_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_workouts" ADD CONSTRAINT "user_workouts_assignedBy_fkey" FOREIGN KEY ("assignedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_workout_sessions" ADD CONSTRAINT "user_workout_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_workout_sessions" ADD CONSTRAINT "user_workout_sessions_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_workout_sessions" ADD CONSTRAINT "user_workout_sessions_userWorkoutId_fkey" FOREIGN KEY ("userWorkoutId") REFERENCES "user_workouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sets" ADD CONSTRAINT "user_sets_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "user_workout_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sets" ADD CONSTRAINT "user_sets_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
