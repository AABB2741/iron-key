terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.52.0"
    }

    neon = {
      source  = "kislerdm/neon"
      version = "0.12.0"
    }

    random = {
      source  = "hashicorp/random"
      version = "3.7.2"
    }
  }
}

provider "azurerm" {
  resource_provider_registrations = "none"
  features {}
}

provider "random" {}

provider "neon" {
  api_key = var.neon_api_key
}
