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

variable "signer_role_arn" {
  description = "IAM role ARN of the signer workload (IRSA). Required for a least-privilege key policy."
  type        = string
}

variable "admin_role_arns" {
  description = "IAM role ARNs allowed to administer (but not decrypt) the key"
  type        = list(string)
  default     = []
}

data "aws_caller_identity" "current" {}
data "aws_partition" "current" {}

locals {
  account_id = data.aws_caller_identity.current.account_id
  partition  = data.aws_partition.current.partition
}

resource "aws_kms_key" "signer" {
  description             = "SalyChain signer — custodial private key wrapping (${var.environment})"
  deletion_window_in_days = 30
  enable_key_rotation     = true

  # Explicit key policy: root may administer; only the signer IRSA role may
  # Encrypt/Decrypt/GenerateDataKey. Without this, the default policy grants
  # kms:* to the account root and any IAM policy in the account can authorize
  # decrypt — including a compromised shared ServiceAccount.
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = concat(
      [
        {
          Sid    = "EnableRootAccountAdministration"
          Effect = "Allow"
          Principal = {
            AWS = "arn:${local.partition}:iam::${local.account_id}:root"
          }
          Action = [
            "kms:Create*",
            "kms:Describe*",
            "kms:Enable*",
            "kms:List*",
            "kms:Put*",
            "kms:Update*",
            "kms:Revoke*",
            "kms:Disable*",
            "kms:Get*",
            "kms:Delete*",
            "kms:ScheduleKeyDeletion",
            "kms:CancelKeyDeletion",
            "kms:TagResource",
            "kms:UntagResource",
          ]
          Resource = "*"
        },
        {
          Sid    = "AllowSignerWorkloadUse"
          Effect = "Allow"
          Principal = {
            AWS = var.signer_role_arn
          }
          Action = [
            "kms:Encrypt",
            "kms:Decrypt",
            "kms:GenerateDataKey",
            "kms:GenerateDataKeyWithoutPlaintext",
            "kms:DescribeKey",
            "kms:ReEncrypt*",
          ]
          Resource = "*"
          Condition = {
            StringEquals = {
              # Must match AWS_KMS_ENCRYPTION_CONTEXT in services/signer.
              "kms:EncryptionContext:service" = var.signer_service
              "kms:EncryptionContext:purpose" = "wallet-private-key"
            }
          }
        },
      ],
      length(var.admin_role_arns) > 0 ? [
        {
          Sid    = "AllowKeyAdmins"
          Effect = "Allow"
          Principal = {
            AWS = var.admin_role_arns
          }
          Action = [
            "kms:Describe*",
            "kms:Get*",
            "kms:List*",
            "kms:CreateAlias",
            "kms:UpdateAlias",
            "kms:ScheduleKeyDeletion",
            "kms:CancelKeyDeletion",
          ]
          Resource = "*"
        },
      ] : []
    )
  })

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
