-- CreateEnum
CREATE TYPE "UserAliasKind" AS ENUM ('PHONE', 'EMAIL', 'HANDLE');

-- CreateTable
CREATE TABLE "user_aliases" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "kind" "UserAliasKind" NOT NULL,
    "value" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_aliases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_aliases_kind_value_key" ON "user_aliases"("kind", "value");

-- CreateIndex
CREATE INDEX "user_aliases_user_id_idx" ON "user_aliases"("user_id");

-- AddForeignKey
ALTER TABLE "user_aliases" ADD CONSTRAINT "user_aliases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
