module "BackofficeWeb" {
  source = "./web"

  Domain      = var.Domain
  ProductName = var.ProductName
}
