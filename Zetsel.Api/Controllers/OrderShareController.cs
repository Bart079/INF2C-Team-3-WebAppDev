using Microsoft.AspNetCore.Mvc;
using Zetsel.Api.Dtos;
using Zetsel.Api.Services;

namespace Zetsel.Api.Controllers;

[ApiController]
[Route("api/ordershares")]
public class OrderSharesController : ControllerBase
{
    private readonly IOrderShareService _shares;

    public OrderSharesController(IOrderShareService shares)
    {
        _shares = shares;
    }

    [HttpGet]
    public async Task<ActionResult<List<OrderShareDto>>> GetAll()
    {
        var shares = await _shares.GetAllAsync();
        return Ok(shares);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderShareDto>> GetById(int id)
    {
        var share = await _shares.GetByIdAsync(id);

        if (share is null)
            return NotFound();

        return Ok(share);
    }

    [HttpPost]
    public async Task<ActionResult<OrderShareDto>> Create(
        CreateOrderShareDto dto)
    {
        try
        {
            var share = await _shares.CreateAsync(dto);

            return CreatedAtAction(
                nameof(GetById),
                new { id = share.Id },
                share);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<OrderShareDto>> Update(
        int id,
        UpdateOrderShareDto dto)
    {
        try
        {
            var share = await _shares.UpdateAsync(id, dto);

            if (share is null)
                return NotFound();

            return Ok(share);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var deleted = await _shares.DeleteAsync(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }
}
