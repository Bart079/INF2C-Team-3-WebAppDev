using Microsoft.AspNetCore.Mvc;
using Zetsel.Api.Dtos;
using Zetsel.Api.Services;

namespace Zetsel.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TastingsController : ControllerBase
{
    private readonly ITastingService _tastings;

    public TastingsController(ITastingService tastings)
    {
        _tastings = tastings;
    }

    [HttpGet]
    public async Task<ActionResult<List<TastingDto>>> GetAll()
        => Ok(await _tastings.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TastingDto>> GetById(int id)
    {
        var tasting = await _tastings.GetByIdAsync(id);
        return tasting is null ? NotFound() : Ok(tasting);
    }

    [HttpPost]
    public async Task<ActionResult<TastingDto>> Create(CreateTastingDto dto)
    {
        var created = await _tastings.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

        [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _tastings.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
