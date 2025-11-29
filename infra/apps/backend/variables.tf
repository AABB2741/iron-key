variable "neon_org_id" {
  type = string
}

variable "resource_group_name" {
  type        = string
  description = "The name of the resource group."
}

variable "project_name" {
  type = string
}

variable "node_env" {
  type        = string
  description = "The Node.js environment (e.g., development, production)."
}

variable "port" {
  type        = string
  description = "The port on which the application will run (inside the container). Only change this if necessary."
}

variable "web_url" {
  type        = string
  description = "The URL of the web application."
}

variable "api_url" {
  type        = string
  description = "The URL of the API."
}

variable "logger_level" {
  type        = string
  default     = "info"
  description = "The logging level for the application (e.g., info, warn, error)."
}
