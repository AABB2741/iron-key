resource "random_password" "db_password" {
  length           = 16
  special          = true
  override_special = "_%@"
}

locals {
  database_password = var.database_password != null ? var.database_password : random_password.db_password.result
}

resource "azapi_resource" "neon_org" {
  type = "Neon.Postgres/organizations@2025-06-23-preview"
  name = "${lower(var.project_name)}-neon-org"

  body = {
    properties = {
      resource_group_name = var.resource_group_name
      location            = var.database_location
      name                = "${lower(var.project_name)}-neon-org"
    }
  }

  tags = {
    IAC     = true
    Project = var.project_name
  }
}

resource "azapi_resource" "neon_postgres" {
  type = "Neon.Postgres/organizations/projects@2025-06-23-preview"

  body = {
    properties = {
      name       = "${lower(var.project_name)}-neon-postgres"
      location   = var.database_location
      entityName = "${lower(var.project_name)}-neon-project"
      pgVersion  = 17
      regionId   = var.database_region_id
      branch = {
        databaseName = var.database_name
      }
    }
  }

  tags = {
    IAC     = true
    Project = var.project_name
  }
}
