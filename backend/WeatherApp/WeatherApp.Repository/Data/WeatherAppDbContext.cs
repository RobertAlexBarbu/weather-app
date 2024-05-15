using Microsoft.EntityFrameworkCore;
using WeatherApp.Domain.Entities;

namespace WeatherApp.Repository.Data;

public class WeatherAppDbContext(DbContextOptions<WeatherAppDbContext> options) : DbContext(options)
{
    public DbSet<Animal> Animals { get; set; }
}