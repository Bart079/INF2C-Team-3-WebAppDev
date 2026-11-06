
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
}
