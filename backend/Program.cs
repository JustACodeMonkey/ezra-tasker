using Microsoft.EntityFrameworkCore;
using EzraTasker.TaskAPI.Data;
using EzraTasker.TaskAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add the controller
builder.Services.AddControllers();

// Register the TaskDbContext with an in-memory database
builder.Services.AddDbContext<TaskDbContext>(options =>
    options.UseInMemoryDatabase("TaskDb"));

// Allow CORS for all origins, headers, and methods since this is just a demo
var corsAllowAll = "AllowAll";
builder.Services.AddCors(options =>
{
  options.AddPolicy(name: corsAllowAll, policy =>
  {
    policy.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod();
  });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();
}

// Add some default data so the task list doesn't start empty
using (var scope = app.Services.CreateScope())
{
  var db = scope.ServiceProvider.GetRequiredService<TaskDbContext>();

  if (!db.Tasks.Any())
  {
    db.Tasks.AddRange(
      new TaskItem { Title = "Apply for job at Ezra", Description = "Submit resume", IsCompleted = true },
      new TaskItem { Title = "Sample Task 2", Description = "This is another sample task.", IsCompleted = true },
      new TaskItem { Title = "Sample Task 3", Description = "This is yet another sample task.", IsCompleted = true }
    );
    db.SaveChanges();
  }
}

app.UseCors(corsAllowAll);
app.UseHttpsRedirection();
app.MapControllers();
app.Run();
