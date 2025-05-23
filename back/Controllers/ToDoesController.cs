using Devops.Data;
using Devops.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Devops.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ToDoesController(DevopsContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ToDo>>> GetToDo()
    {
        return await context.ToDo
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> PatchTodo(int id)
    {
        await context.ToDo
            .Where(t => t.Id == id && !t.Checked)
             .ExecuteUpdateAsync(prop => prop
             .SetProperty(p => p.Checked, true)
             .SetProperty(p => p.FinishedAt, DateTimeOffset.UtcNow));
        return Accepted();
    }

    [HttpPost]
    public async Task<ActionResult<ToDo>> PostToDo(ToDo toDo)
    {
        context.ToDo.Add(toDo);
        await context.SaveChangesAsync();

        return CreatedAtAction("GetToDo", null, toDo);
    }
}