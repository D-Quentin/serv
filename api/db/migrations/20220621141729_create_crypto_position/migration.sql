-- AlterTable
ALTER TABLE "User" ADD COLUMN "ApiKey" TEXT;
ALTER TABLE "User" ADD COLUMN "SecretKey" TEXT;
ALTER TABLE "User" ADD COLUMN "TestApiKey" TEXT;
ALTER TABLE "User" ADD COLUMN "TestSecretKey" TEXT;

-- CreateTable
CREATE TABLE "CryptoPosition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'starting',
    "symbol" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CryptoPosition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cryptoPositionId" TEXT NOT NULL,
    CONSTRAINT "Log_cryptoPositionId_fkey" FOREIGN KEY ("cryptoPositionId") REFERENCES "CryptoPosition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
