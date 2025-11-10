variable "project_name" {
  type    = string
  default = "IronKey"
}

variable "node_env" {
  type        = string
  description = "The environment in which the application is running."
}

variable "port" {
  type        = number
  description = "The port on which the application will run. Modify only if necessary."
}

variable "web_url" {
  type        = string
  description = "The URL where the web application will be hosted."
}

variable "api_url" {
  type        = string
  description = "The URL where the API will be hosted."
}

variable "logger_level" {
  type        = string
  description = "The logging level for the application."
}

variable "database_url" {
  type        = string
  description = "The connection string for the database."
}

variable "better_auth_secret" {
  type        = string
  description = "The secret key used for BetterAuth authentication."
}
