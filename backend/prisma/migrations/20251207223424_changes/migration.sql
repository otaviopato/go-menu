/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `itens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome,restauranteId]` on the table `categorias` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `restauranteId` to the `categorias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restauranteId` to the `itens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "itens" DROP CONSTRAINT "itens_usuarioId_fkey";

-- DropIndex
DROP INDEX "categorias_nome_key";

-- AlterTable
ALTER TABLE "categorias" ADD COLUMN     "restauranteId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "itens" DROP COLUMN "usuarioId",
ADD COLUMN     "restauranteId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "restaurantes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "usuarioId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurantes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurantes_slug_key" ON "restaurantes"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_restauranteId_key" ON "categorias"("nome", "restauranteId");

-- AddForeignKey
ALTER TABLE "restaurantes" ADD CONSTRAINT "restaurantes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_restauranteId_fkey" FOREIGN KEY ("restauranteId") REFERENCES "restaurantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens" ADD CONSTRAINT "itens_restauranteId_fkey" FOREIGN KEY ("restauranteId") REFERENCES "restaurantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
