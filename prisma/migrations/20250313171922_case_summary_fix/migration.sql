/*
  Warnings:

  - A unique constraint covering the columns `[caseFileId]` on the table `case_summaries` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('PENDING', 'FAILED', 'SUCCESS');

-- AlterTable
ALTER TABLE "case_summaries" ADD COLUMN     "status" "STATUS";

-- CreateIndex
CREATE UNIQUE INDEX "case_summaries_caseFileId_key" ON "case_summaries"("caseFileId");
