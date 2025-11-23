output "id" {
  value = azurerm_static_web_app.web_app.id
}

output "name" {
  value = azurerm_static_web_app.web_app.name
}

output "location" {
  value = azurerm_static_web_app.web_app.location
}

output "api_key" {
  value     = azurerm_static_web_app.web_app.api_key
  sensitive = true
}

output "app_settings" {
  value = azurerm_static_web_app.web_app.app_settings
}

output "default_hostname" {
  value = azurerm_static_web_app.web_app.default_host_name
}
