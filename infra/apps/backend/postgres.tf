resource "neon_project" "postgres_project" {
  name   = "${var.project_name}-postgres"
  org_id = var.neon_org_id

  region_id                 = "aws-us-east-1"
  pg_version                = 18
  history_retention_seconds = 21600

  default_endpoint_settings {
    autoscaling_limit_max_cu = 2
  }
}

resource "neon_branch" "postgres_branch" {
  name       = "main"
  project_id = neon_project.postgres_project.id
}

resource "neon_role" "postgres_role" {
  name       = "${var.project_name}-role"
  project_id = neon_project.postgres_project.id
  branch_id  = neon_branch.postgres_branch.id
}

resource "neon_database" "postgres_database" {
  name = "${var.project_name}-db"

  project_id = neon_project.postgres_project.id
  branch_id  = neon_branch.postgres_branch.id
  owner_name = neon_role.postgres_role.name
}
