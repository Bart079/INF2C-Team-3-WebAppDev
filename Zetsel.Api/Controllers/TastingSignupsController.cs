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

    [HttpPost]
    public async Task<ActionResult<TastingSignupDto>> Create(CreateTastingSignupDto dto)
    {
        var created = await _signups.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _signups.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
    [HttpPut("{id:int}")]
    public async Task<ActionResult<TastingSignupDto>> Update(int id, UpdateTastingSignupDto dto)
    {
        var updated = await _signups.UpdateAsync(id, dto);
        return updated is null ? NotFound() : Ok(updated);
    }
}
