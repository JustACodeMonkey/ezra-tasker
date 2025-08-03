using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EzraTasker.TaskAPI.Data;
using EzraTasker.TaskAPI.Models;
using EzraTasker.Utils;

namespace EzraTasker.TaskAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class TasksController(TaskDbContext context) : ControllerBase
{
  private readonly TaskDbContext _context = context;

  /// <summary>
  /// Gets all tasks ordered by creation date in descending order.
  /// </summary>
  [HttpGet]
  public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
  {
    return await _context.Tasks.OrderByDescending(t => t.CreatedAt).ToListAsync();
  }

  /// <summary>
  /// Creates a new task.
  /// </summary>
  /// <param name="input">The task details to create.</param>
  [HttpPost]
  public async Task<ActionResult<TaskItem>> CreateTask(TaskUpdateDto input  )
  {
    if (string.IsNullOrWhiteSpace(input.Title))
    return BadRequest("Title is required.");


    var task = new TaskItem
    {
      Id = SimpleHexGuid.GenerateHexId(),
      Title = input.Title,
      Description = input.Description ?? string.Empty,
      IsCompleted = input.IsCompleted ?? false, // Default to OPEN if not provided
      CreatedAt = DateTime.UtcNow,
      UpdatedAt = DateTime.UtcNow
    };

    _context.Tasks.Add(task);
    await _context.SaveChangesAsync();
    return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
  }

  /// <summary>
  /// Updates an existing task by ID.
  /// Only fields provided in the TaskUpdateDto will be updated.
  /// </summary>
  /// <param name="id">The ID of the task to update.</param>
  /// <param name="updated">The updated task details.</param>
  /// <returns>NoContent if successful, NotFound if the task does not exist.</returns>
  [HttpPatch("{id}")]
  public async Task<IActionResult> UpdateTask(string id, [FromBody] TaskUpdateDto updated)
  {
    var task = await _context.Tasks.FindAsync(id);
    if (task == null) return NotFound();

    if (updated.Title != null) task.Title = updated.Title;
    if (updated.Description != null) task.Description = updated.Description;
    if (updated.IsCompleted.HasValue) task.IsCompleted = updated.IsCompleted.Value;

    // Update the updated timestamp
    task.UpdatedAt = DateTime.UtcNow;

    await _context.SaveChangesAsync();
    return NoContent();
  }
}
