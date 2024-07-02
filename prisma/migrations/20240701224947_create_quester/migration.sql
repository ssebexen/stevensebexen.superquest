-- CreateTable
CREATE TABLE "Quester" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "textureData" TEXT NOT NULL,

    CONSTRAINT "Quester_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Quester" ADD CONSTRAINT "Quester_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
