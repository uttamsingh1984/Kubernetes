using CatalogApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CatalogApi.Data;

public class CatalogContext : DbContext
{
    public CatalogContext(DbContextOptions<CatalogContext> options) : base(options)
    {
    }

    public DbSet<Product> Products => Set<Product>();
}
