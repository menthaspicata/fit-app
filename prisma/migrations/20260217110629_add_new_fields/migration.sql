/*
  Warnings:

  - The primary key for the `account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `provider` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `providerAccountId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `invites` table. All the data in the column will be lost.
  - You are about to drop the column `expires` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `session` table. All the data in the column will be lost.
  - Added the required column `id` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `invites` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `invites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `invites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expiresAt` on table `invites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `trainerId` on table `invites` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `id` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_trainerId_fkey";

-- DropIndex
DROP INDEX "account_userId_idx";

-- DropIndex
DROP INDEX "session_sessionToken_key";

-- DropIndex
DROP INDEX "session_userId_idx";

-- DropIndex
DROP INDEX "verification_identifier_idx";

-- AlterTable
ALTER TABLE "account" DROP CONSTRAINT "account_pkey",
DROP COLUMN "provider",
DROP COLUMN "providerAccountId",
DROP COLUMN "type",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT,
ADD CONSTRAINT "account_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "invites" DROP COLUMN "code",
ADD COLUMN     "name" VARCHAR(100),
ADD COLUMN     "token" VARCHAR(100) NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "expiresAt" SET NOT NULL,
ALTER COLUMN "trainerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "session" DROP COLUMN "expires",
DROP COLUMN "sessionToken",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT,
ADD CONSTRAINT "session_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "verification" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
