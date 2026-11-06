using Zetsel.Api.Dtos;
using Zetsel.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Zetsel.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemHoldController : ControllerBase
{
    private readonly IItemHoldService _itemHolds;

    public ItemHoldController(IItemHoldService itemHolds)
    {
        _itemHolds = itemHolds;
    }

    [HttpGet]
    public async Task<ActionResult<List<ItemHoldDto>>> GetAll()
        => Ok(await _itemHolds.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ItemHoldDto>> GetById(int id)
    {
        var item = await _itemHolds.GetByIdAsync(id);
        return item is null ? NotFound() : Ok(item);
    }
}