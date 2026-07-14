-- CreateEnum
CREATE TYPE "RoleTone" AS ENUM ('BRAND', 'SUCCESS', 'WARNING', 'DANGER');

-- CreateEnum
CREATE TYPE "AuditTone" AS ENUM ('BRAND', 'SUCCESS', 'WARNING', 'DANGER', 'NEUTRAL');

-- CreateTable
CREATE TABLE "platform_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "org_name" TEXT NOT NULL,
    "support_email" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "enforce_mfa" BOOLEAN NOT NULL DEFAULT true,
    "ip_allowlist" BOOLEAN NOT NULL DEFAULT false,
    "sso_enabled" BOOLEAN NOT NULL DEFAULT true,
    "session_timeout" BOOLEAN NOT NULL DEFAULT true,
    "notify_risk" BOOLEAN NOT NULL DEFAULT true,
    "notify_settlements" BOOLEAN NOT NULL DEFAULT true,
    "notify_digest" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_members" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role_name" TEXT NOT NULL,
    "mfa_enabled" BOOLEAN NOT NULL DEFAULT false,
    "last_active_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rbac_roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "member_count" INTEGER NOT NULL DEFAULT 0,
    "permissions" JSONB NOT NULL,
    "tone" "RoleTone" NOT NULL DEFAULT 'BRAND',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rbac_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feature_flags" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feature_flags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_entries" (
    "id" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "tone" "AuditTone" NOT NULL DEFAULT 'NEUTRAL',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_members_email_key" ON "admin_members"("email");

-- CreateIndex
CREATE UNIQUE INDEX "rbac_roles_name_key" ON "rbac_roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "feature_flags_key_key" ON "feature_flags"("key");

-- CreateIndex
CREATE INDEX "audit_entries_created_at_idx" ON "audit_entries"("created_at" DESC);
