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
}
