using Microsoft.AspNetCore.Mvc;
using Zetsel.Api.Dtos;
using Zetsel.Api.Services;

namespace Zetsel.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TastingLineupsController : ControllerBase
{
    private readonly ITastingLineupService _lineups;

    public TastingLineupsController(ITastingLineupService lineups)
    {
        _lineups = lineups;
    }

    [HttpGet]
    public async Task<ActionResult<List<TastingLineupDto>>> GetAll()
        => Ok(await _lineups.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TastingLineupDto>> GetById(int id)
    {
        var lineup = await _lineups.GetByIdAsync(id);
        return lineup is null ? NotFound() : Ok(lineup);
    }

    [HttpPost]
    public async Task<ActionResult<TastingLineupDto>> Create(CreateTastingLineupDto dto)
    {
        var created = await _lineups.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _lineups.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
