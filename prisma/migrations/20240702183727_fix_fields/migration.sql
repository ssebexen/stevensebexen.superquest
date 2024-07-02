-- AlterTable
ALTER TABLE "Quester" ALTER COLUMN "name" DROP DEFAULT,
ALTER COLUMN "textureData" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "displayName" SET DEFAULT 'Mysterious Adventurer',
ALTER COLUMN "profile" SET DEFAULT 'I''m here to kick butt and chew bubblegum... and I''m all out of butt.';
