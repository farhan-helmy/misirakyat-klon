/*
  Warnings:

  - You are about to drop the column `image` on the `Menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shop" ADD COLUMN "city" TEXT;
ALTER TABLE "Shop" ADD COLUMN "state" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Menu" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    CONSTRAINT "Menu_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Menu" ("id", "name", "price", "shopId") SELECT "id", "name", "price", "shopId" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
