-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isPro" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "clientFirstName" TEXT NOT NULL,
    "clientLastName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientAddress" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "visaStatus" TEXT NOT NULL,
    "legalConcern" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "tool_call_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "name" TEXT,
    "chatId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chat_id_key" ON "Chat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Client_clientEmail_key" ON "Client"("clientEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
