resource "azurerm_resource_group" "arg" {
  name     = "ironkey-resources"
  location = "Brazil South"

  tags = {
    Project = var.project_name
    IAC     = true
  }
}

resource "azurerm_container_registry" "acr" {
  name                = var.project_name
  resource_group_name = azurerm_resource_group.arg.name
  location            = azurerm_resource_group.arg.location
  sku                 = "Basic"
  admin_enabled       = true

  tags = {
    Project = var.project_name
    IAC     = true
  }
}

resource "azurerm_service_plan" "app_service_plan" {
  name                = "${var.project_name}-service-plan"
  location            = azurerm_resource_group.arg.location
  resource_group_name = azurerm_resource_group.arg.name
  os_type             = "Linux"
  sku_name            = "F1"

  tags = {
    Project = var.project_name
    IAC     = true
  }
}

resource "azurerm_linux_web_app" "backend" {
  name                = "${var.project_name}-backend"
  location            = azurerm_resource_group.arg.location
  resource_group_name = azurerm_resource_group.arg.name
  service_plan_id     = azurerm_service_plan.app_service_plan.id

  site_config {
    always_on = false

    application_stack {
      docker_image_name        = "${azurerm_container_registry.acr.login_server}/backend:latest"
      docker_registry_url      = "https://${azurerm_container_registry.acr.login_server}"
      docker_registry_username = azurerm_container_registry.acr.admin_username
      docker_registry_password = azurerm_container_registry.acr.admin_password
    }

  }

  app_settings = {
    NODE_ENV           = var.node_env
    PORT               = var.port
    WEB_URL            = var.web_url
    API_URL            = var.api_url
    LOGGER             = var.logger_level
    DATABASE_URL       = var.database_url
    BETTER_AUTH_SECRET = var.better_auth_secret
  }

  tags = {
    Project = var.project_name
    IAC     = true
  }
}
