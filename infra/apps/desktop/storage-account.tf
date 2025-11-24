resource "azurerm_storage_account" "desktop_storage_account" {
  name                = "${var.project_name}desktop"
  resource_group_name = var.resource_group_name
  location            = data.azurerm_resource_group.rg.location

  account_replication_type = "LRS"
  account_tier             = "Standard"

  tags = {
    Project = var.project_name
    IAC     = true
  }
}

resource "azurerm_storage_container" "desktop_storage_container" {
  name                  = "${var.project_name}-releases"
  storage_account_id    = azurerm_storage_account.desktop_storage_account.id
  container_access_type = "blob"
}
