resource "azurerm_resource_group" "arg" {
  name     = "${lower(var.project_name)}-resources"
  location = var.location

  tags = {
    Project = var.project_name
    IAC     = true
  }
}
