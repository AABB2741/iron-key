resource "azurerm_resource_group" "rg" {
  name = "ironkey-resources"
  location = "Central India"

  tags = {
    Project = var.project_name
    IAC     = true
  }
}
