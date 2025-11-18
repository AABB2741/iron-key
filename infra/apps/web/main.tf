resource "azurerm_static_web_app" "web_app" {
  name = "${var.project_name}-web"

  resource_group_name = var.resource_group_name
  location            = var.location

  app_settings = {
    VITE_API_URL = var.api_url
  }

  tags = {
    Project = var.project_name
    IAC     = true
  }
}
