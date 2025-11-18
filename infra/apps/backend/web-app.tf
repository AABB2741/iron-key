resource "azurerm_linux_web_app" "backend_app" {
  name                = "${var.project_name}-backend"
  location            = var.resource_group_location
  resource_group_name = var.resource_group_name
  service_plan_id     = azurerm_service_plan.app_service_plan.id

  site_config {
    always_on = false

    application_stack {
      docker_image_name        = "backend:latest"
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

  logs {
    application_logs {
      file_system_level = "Verbose"
    }
  }

  tags = {
    Project = var.project_name
    IAC     = true
  }
}

resource "azurerm_service_plan" "app_service_plan" {
  name                = "${var.project_name}-service-plan"
  location            = var.resource_group_location
  resource_group_name = var.resource_group_name
  os_type             = "Linux"
  sku_name            = "F1"

  tags = {
    Project = var.project_name
    IAC     = true
  }
}
