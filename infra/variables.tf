variable "neon_api_key" {
  type      = string
  sensitive = true
}

variable "neon_org_id" {
  type = string
}

variable "project_name" {
  type    = string
  default = "ironkey"
}

variable "node_env" {
  type        = string
  description = "The environment in which the application is running."
}

variable "port" {
  type        = number
  description = "The port on which the application will run. Modify only if necessary."
}

variable "api_url" {
  type        = string
  description = "The URL where the API will be hosted."
}

variable "logger_level" {
  type        = string
  description = "The logging level for the application."
}

variable "better_auth_secret" {
  type        = string
  description = "The secret key used for BetterAuth authentication."
}
