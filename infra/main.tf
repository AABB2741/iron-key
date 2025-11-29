module "arg" {
  source = "./modules/arg"

  project_name = var.project_name
}

module "web" {
  source = "./apps/web"

  project_name        = var.project_name
  resource_group_name = module.arg.name

  api_url = var.api_url
}

module "desktop" {
  source = "./apps/desktop"

  project_name        = var.project_name
  resource_group_name = module.arg.name
}


module "backend" {
  source = "./apps/backend"

  project_name        = var.project_name
  resource_group_name = module.arg.name

  neon_org_id = var.neon_org_id

  node_env     = var.node_env
  port         = var.port
  web_url      = "https://${module.web.default_hostname}"
  api_url      = var.api_url
  logger_level = var.logger_level
}
