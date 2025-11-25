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

resource "azurerm_user_assigned_identity" "desktop_storage_identity" {
  name                = "${var.project_name}-desktop-storage-identity"
  resource_group_name = var.resource_group_name
  location            = data.azurerm_resource_group.rg.location

  tags = {
    Project = var.project_name
    IAC     = true
  }
}

resource "azurerm_role_assignment" "desktop_storage_role_assignment" {
  scope                = azurerm_storage_account.desktop_storage_account.id
  principal_id         = azurerm_user_assigned_identity.desktop_storage_identity.principal_id
  role_definition_name = "Storage Blob Data Contributor"
}
