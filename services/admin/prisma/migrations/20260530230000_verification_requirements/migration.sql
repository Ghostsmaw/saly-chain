-- Replace flow packages with document/information requirements
DROP TABLE IF EXISTS "verification_flows";
DROP TYPE IF EXISTS "VerificationFlowKind";

CREATE TYPE "VerificationCategory" AS ENUM ('KYB', 'KYC');
CREATE TYPE "RequirementInputType" AS ENUM ('DOCUMENT', 'INFORMATION');

CREATE TABLE "verification_requirements" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "category" "VerificationCategory" NOT NULL,
    "input_type" "RequirementInputType" NOT NULL,
    "field_key" TEXT NOT NULL,
    "step_key" TEXT NOT NULL,
    "value_format" TEXT,
    "placeholder" TEXT,
    "accept" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "target_business" BOOLEAN NOT NULL DEFAULT false,
    "target_developer" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_requirements_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "verification_requirements_slug_key" ON "verification_requirements"("slug");
