/*
  Warnings:

  - You are about to drop the column `firebaseToken` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_firebaseToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firebaseToken";
