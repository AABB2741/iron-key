module "backend" {
  source = "./stacks/backend"

  node_env           = var.node_env
  port               = var.port
  web_url            = var.web_url
  api_url            = var.api_url
  logger_level       = var.logger_level
  database_url       = var.database_url
  better_auth_secret = var.better_auth_secret
}
