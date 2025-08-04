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
      new TaskItem { Title = "Create git repo", Description = "Initialize an empty git repo with a README.md file", IsCompleted = true },
      new TaskItem { Title = "Clone repo", Description = "Clone the repo to my computer", IsCompleted = true },
      new TaskItem { Title = "Create mono repo structure", Description = "Create the standard mono repo folder structure with backend and frontend folders", IsCompleted = true },
      new TaskItem { Title = "Init backend", Description = "Set up a basic ASP.NET Core Web API project with the required DbContext, Controller, Model, etc.", IsCompleted = true },
      new TaskItem { Title = "Add CORS", Description = "Add CORS support to the backend to allow requests from the frontend", IsCompleted = true },
      new TaskItem { Title = "Add in-memory database", Description = "Use an in-memory database for the backend to simplify development and testing", IsCompleted = true },
      new TaskItem { Title = "Add Controller endpoints", Description = "Create the endpoints to fetch, create, and update tasks", IsCompleted = true },
      new TaskItem { Title = "Init frontend", Description = "Set up a basic React app with Vite, TypeScript, Tailwind CSS, and shadcn", IsCompleted = true },
      new TaskItem { Title = "Create Task API context", Description = "Create a context to manage API calls for tasks in the frontend", IsCompleted = true },
      new TaskItem { Title = "Create TasksList view", Description = "Create a view to display the list of tasks with loading and error states", IsCompleted = true },
      new TaskItem { Title = "Create TaskCard component", Description = "Create a component to display and edit individual task details", IsCompleted = true },
      new TaskItem { Title = "Submit demo project", Description = "Submit this demo project to Alex for review", IsCompleted = true },
      new TaskItem { Title = "Schedule follow-up", Description = "Setup a time to discuss this demo with the engineering team", IsCompleted = false }
    );
    db.SaveChanges();
  }
}

app.UseCors(corsAllowAll);
app.UseHttpsRedirection();
app.MapControllers();
app.Run();
