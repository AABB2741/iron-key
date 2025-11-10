module "arg" {
  source = "../arg"

  project_name = var.project_name
}

resource "azurerm_container_registry" "acr" {
  name                = lower(var.project_name)
  resource_group_name = module.arg.name
  location            = module.arg.location
  sku                 = "Basic"
  admin_enabled       = true

  tags = {
    Project = var.project_name
    IAC     = true
  }
}
