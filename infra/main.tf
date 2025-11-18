module "arg" {
  source = "./modules/arg"

  project_name = var.project_name
}

module "backend" {
  source = "./apps/backend"

  project_name            = var.project_name
  resource_group_name     = module.arg.name
  resource_group_location = module.arg.location

  node_env           = var.node_env
  port               = var.port
  web_url            = var.web_url
  api_url            = var.api_url
  logger_level       = var.logger_level
  database_url       = var.database_url
  better_auth_secret = var.better_auth_secret
}

module "web" {
  source = "./apps/web"

  project_name            = var.project_name
  resource_group_name     = module.arg.name
  resource_group_location = module.arg.location

  api_url = var.api_url
}
