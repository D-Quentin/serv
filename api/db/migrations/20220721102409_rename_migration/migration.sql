/*
  Warnings:

  - You are about to drop the column `ApiKey` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `SecretKey` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `TestApiKey` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `TestSecretKey` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "apiKeyBinance" TEXT,
    "secretKeyBinance" TEXT,
    "apiKeyBinanceTest" TEXT,
    "secretKeyBinanceTest" TEXT
);
INSERT INTO "new_User" ("hashedPassword", "id", "salt", "username") SELECT "hashedPassword", "id", "salt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
