# resource "random_password" "db_password" {
#   length           = 16
#   special          = true
#   override_special = "_%@"
# }

# Resolve the resource group by name so we can pass its full resource ID
data "azurerm_resource_group" "rg" {
  name = var.resource_group_name
}

resource "azapi_resource" "neon_org" {
  type      = "Neon.Postgres/organizations@2025-06-23-preview"
  name      = "${var.project_name}-neon-org"
  parent_id = data.azurerm_resource_group.rg.id
  location  = "eastus2"

  tags = {
    IAC     = true
    Project = var.project_name
  }
}

resource "azapi_resource" "neon_postgres" {
  name      = "${var.project_name}-neon-postgres"
  type      = "Neon.Postgres/organizations/projects@2025-06-23-preview"
  parent_id = azapi_resource.neon_org.id

  body = {
    properties = {
      pgVersion = 17
    }
  }
}
