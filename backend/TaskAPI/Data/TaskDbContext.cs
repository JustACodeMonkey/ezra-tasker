using Microsoft.EntityFrameworkCore;
using EzraTasker.TaskAPI.Models;

namespace EzraTasker.TaskAPI.Data;

/// <summary>
/// Represents the database context using an in-memory database for task management.
/// </summary>
public class TaskDbContext(DbContextOptions<TaskDbContext> options) : DbContext(options)
{
  public DbSet<TaskItem> Tasks => Set<TaskItem>();
}
