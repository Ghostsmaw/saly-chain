terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Configure via: terraform init -backend-config=backend.hcl
  # See backend.hcl.example. Local state is acceptable only for disposable lab use.
  backend "s3" {}
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  type    = string
  default = "eu-west-1"
}

variable "signer_role_arn" {
  description = "IRSA role ARN for the signer ServiceAccount (salychain-*-signer-sa)"
  type        = string
}

module "signer_kms" {
  source          = "../modules/kms"
  environment     = "staging"
  signer_role_arn = var.signer_role_arn
}

output "signer_kms_key_id" {
  value = module.signer_kms.key_id
}

output "signer_kms_key_arn" {
  value = module.signer_kms.key_arn
}
