variable "project_name" {
  type = string
}

variable "app_settings" {
  description = "A map of application settings for the web app."
  type        = map(string)
}

variable "app_type" {
  description = "The type of the application (e.g., backend, frontend)."
  type        = string
  default     = "backend"
}
