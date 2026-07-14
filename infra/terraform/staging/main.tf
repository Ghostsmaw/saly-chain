terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  type    = string
  default = "eu-west-1"
}

module "signer_kms" {
  source      = "../modules/kms"
  environment = "staging"
}

output "signer_kms_key_id" {
  value = module.signer_kms.key_id
}

output "signer_kms_key_arn" {
  value = module.signer_kms.key_arn
}
