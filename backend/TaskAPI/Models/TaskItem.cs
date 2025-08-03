using EzraTasker.Utils;

namespace EzraTasker.TaskAPI.Models;

/// <summary>
/// Represents a task item in the task management system.
/// </summary>
public class TaskItem
{
    public string Id { get; set; } = SimpleHexGuid.GenerateHexId();
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public Boolean IsCompleted { get; set; } = false; // OPEN or COMPLETED
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
