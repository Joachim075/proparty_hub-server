-- CreateEnum
CREATE TYPE "Water" AS ENUM ('INDOOR', 'OUTDOOR');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('FOR_SALE', 'FOR_RENT');

-- CreateEnum
CREATE TYPE "Purpose" AS ENUM ('RESIDENTIALS', 'BUSINESS');

-- CreateEnum
CREATE TYPE "ElectricityMode" AS ENUM ('Private_YAKA', 'Controlled_Electricity');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'AGENT', 'LANDLORD', 'TENANT');

-- CreateEnum
CREATE TYPE "WashroomType" AS ENUM ('INDOOR', 'OUTDOOR');

-- CreateTable
CREATE TABLE "Agent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "propartyId" INTEGER,
    "role" "Role" NOT NULL DEFAULT 'TENANT',

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "contact" TEXT NOT NULL DEFAULT '',
    "status" "Status" NOT NULL DEFAULT 'FOR_RENT',
    "purpose" "Purpose" NOT NULL DEFAULT 'RESIDENTIALS',
    "location" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "price" TEXT NOT NULL DEFAULT '',
    "rooms" TEXT NOT NULL DEFAULT '',
    "washroom" "WashroomType" NOT NULL DEFAULT 'INDOOR',
    "electricity" "ElectricityMode" NOT NULL DEFAULT 'Private_YAKA',
    "water" "Water" NOT NULL DEFAULT 'INDOOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agent_email_key" ON "Agent"("email");

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_propartyId_fkey" FOREIGN KEY ("propartyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;
