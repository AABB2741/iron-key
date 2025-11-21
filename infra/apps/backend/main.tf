resource "azurerm_container_registry" "acr" {
  name                = var.project_name
  resource_group_name = var.resource_group_name
  location            = data.azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true

  tags = {
    Project = var.project_name
    IAC     = true
  }
}
