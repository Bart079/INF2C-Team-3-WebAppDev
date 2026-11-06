using Microsoft.AspNetCore.Mvc;
using Zetsel.Api.Dtos;
using Zetsel.Api.Services;

namespace Zetsel.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TastingSignupsController : ControllerBase
{
    private readonly ITastingSignupService _signups;

    public TastingSignupsController(ITastingSignupService signups)
    {
        _signups = signups;
    }

    [HttpGet]
    public async Task<ActionResult<List<TastingSignupDto>>> GetAll()
        => Ok(await _signups.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TastingSignupDto>> GetById(int id)
    {
        var signup = await _signups.GetByIdAsync(id);
        return signup is null ? NotFound() : Ok(signup);
    }
}
