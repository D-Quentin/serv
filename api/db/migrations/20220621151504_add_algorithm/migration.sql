/*
  Warnings:

  - Added the required column `algorithm` to the `CryptoPosition` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CryptoPosition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'starting',
    "symbol" TEXT NOT NULL,
    "algorithm" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CryptoPosition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CryptoPosition" ("amount", "createdAt", "id", "status", "symbol", "userId") SELECT "amount", "createdAt", "id", "status", "symbol", "userId" FROM "CryptoPosition";
DROP TABLE "CryptoPosition";
ALTER TABLE "new_CryptoPosition" RENAME TO "CryptoPosition";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
