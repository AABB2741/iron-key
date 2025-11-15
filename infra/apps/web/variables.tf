variable "resource_group_name" {
  type        = string
  description = "The name of the resource group."
}

variable "resource_group_location" {
  type        = string
  description = "The location of the resource group."
}

variable "project_name" {
  type        = string
  default     = "IronKey"
  description = "The name of the project."
}

variable "location" {
  type        = string
  default     = "East Us 2"
  description = "The Azure region where resources will be deployed. Note that Brazil South is not available."
}

variable "api_url" {
  type        = string
  description = "The URL of the API endpoint."
}
