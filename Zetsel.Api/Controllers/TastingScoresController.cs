using Microsoft.AspNetCore.Mvc;
using Zetsel.Api.Dtos;
using Zetsel.Api.Services;

namespace Zetsel.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TastingScoresController : ControllerBase
{
    private readonly ITastingScoreService _scores;

    public TastingScoresController(ITastingScoreService scores)
    {
        _scores = scores;
    }

    [HttpGet]
    public async Task<ActionResult<List<TastingScoreDto>>> GetAll()
        => Ok(await _scores.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TastingScoreDto>> GetById(int id)
    {
        var score = await _scores.GetByIdAsync(id);
        return score is null ? NotFound() : Ok(score);
    }
    [HttpPost]
    public async Task<ActionResult<TastingScoreDto>> Create(CreateTastingScoreDto dto)
    {
        var created = await _scores.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _scores.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
