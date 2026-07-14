variable "environment" {
  description = "Deployment environment label"
  type        = string
  default     = "staging"
}

variable "signer_service" {
  description = "Service name tag for the signer CMK"
  type        = string
  default     = "salychain-signer"
}

resource "aws_kms_key" "signer" {
  description             = "SalyChain signer — custodial private key wrapping (${var.environment})"
  deletion_window_in_days = 30
  enable_key_rotation     = true

  tags = {
    Environment = var.environment
    Service     = var.signer_service
    ManagedBy   = "terraform"
  }
}

resource "aws_kms_alias" "signer" {
  name          = "alias/${var.signer_service}-${var.environment}"
  target_key_id = aws_kms_key.signer.key_id
}

output "key_id" {
  description = "KMS key id — set as KMS_AWS_KEY_ID on the signer service"
  value       = aws_kms_key.signer.key_id
}

output "key_arn" {
  description = "KMS key ARN — use in IAM policies"
  value       = aws_kms_key.signer.arn
}

output "alias_name" {
  value = aws_kms_alias.signer.name
}
