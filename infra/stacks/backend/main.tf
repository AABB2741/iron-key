module "web_app" {
  source = "../../modules/web_app"

  project_name = var.project_name
  app_settings = {
    NODE_ENV           = var.node_env
    PORT               = var.port
    WEB_URL            = var.web_url
    API_URL            = var.api_url
    LOGGER             = var.logger_level
    DATABASE_URL       = var.database_url
    BETTER_AUTH_SECRET = var.better_auth_secret
  }
}
