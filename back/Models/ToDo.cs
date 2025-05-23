namespace Devops.Models;

public record ToDo
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool Checked { get; set; }
    public DateTimeOffset CreatedAt { get; set; }= DateTimeOffset.UtcNow;
    public DateTimeOffset? FinishedAt { get; set; } 
}