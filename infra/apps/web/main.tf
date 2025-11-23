resource "azurerm_static_web_app" "web_app" {
  name = "${var.project_name}-web"

  resource_group_name = var.resource_group_name
  location            = var.location

  tags = {
    Project = var.project_name
    IAC     = true
  }
}
