using Microsoft.AspNetCore.Mvc;
using Zetsel.Api.Dtos;
using Zetsel.Api.Services;

namespace Zetsel.Api.Controllers;

[ApiController]
[Route("api/grouporders")]
public class GroupOrdersController : ControllerBase
{
    private readonly IGroupOrderService _orders;

    public GroupOrdersController(IGroupOrderService orders)
    {
        _orders = orders;
    }

    [HttpGet]
    public async Task<ActionResult<List<GroupOrderDto>>> GetAll()
    {
        var orders = await _orders.GetAllAsync();
        return Ok(orders);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<GroupOrderDto>> GetById(int id)
    {
        var order = await _orders.GetByIdAsync(id);

        if (order is null)
            return NotFound();

        return Ok(order);
    }

    [HttpPost]
    public async Task<ActionResult<GroupOrderDto>> Create(
        CreateGroupOrderDto dto)
    {
        try
        {
            var order = await _orders.CreateAsync(dto);

            return CreatedAtAction(
                nameof(GetById),
                new { id = order.Id },
                order);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<GroupOrderDto>> Update(
        int id,
        UpdateGroupOrderDto dto)
    {
        try
        {
            var order = await _orders.UpdateAsync(id, dto);

            if (order is null)
                return NotFound();

            return Ok(order);
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
            var deleted = await _orders.DeleteAsync(id);

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
