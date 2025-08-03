namespace EzraTasker.TaskAPI.Models;

/// <summary>
/// Data Transfer Object for updating task details.
/// </summary>
public class TaskUpdateDto
{
  public string? Title { get; set; }
  public string? Description { get; set; }
  public Boolean? IsCompleted { get; set; }
}