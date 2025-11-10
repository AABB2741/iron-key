module "arg" {
  source = "../arg"

  project_name = var.project_name
}

module "acr" {
  source = "../acr"

  project_name = var.project_name
}

resource "azurerm_linux_web_app" "web_app" {
  name                = "${lower(var.project_name)}-${var.app_type}"
  location            = module.arg.location
  resource_group_name = module.arg.name
  service_plan_id     = azurerm_service_plan.app_service_plan.id

  site_config {
    always_on = false

    application_stack {
      docker_image_name        = "${var.app_type}:latest"
      docker_registry_url      = "https://${module.acr.login_server}"
      docker_registry_username = module.acr.admin_username
      docker_registry_password = module.acr.admin_password
    }
  }

  app_settings = var.app_settings

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
  name                = "${lower(var.project_name)}-service-plan"
  location            = module.arg.location
  resource_group_name = module.arg.name
  os_type             = "Linux"
  sku_name            = "F1"

  tags = {
    Project = var.project_name
    IAC     = true
  }
}
