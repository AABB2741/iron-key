resource "azurerm_container_registry" "acr" {
  name                = lower(var.project_name)
  resource_group_name = var.resource_group_name
  location            = var.resource_group_location
  sku                 = "Basic"
  admin_enabled       = true

  tags = {
    Project = var.project_name
    IAC     = true
  }
}