using Zetsel.Api.Dtos;
using Zetsel.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Zetsel.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemController : ControllerBase
{
    private readonly IItemService _items;

    public ItemController(IItemService items)
    {
        _items = items;
    }

    [HttpGet]
    public async Task<ActionResult<List<ItemDto>>> GetAll()
        => Ok(await _items.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ItemDto>> GetById(int id)
    {
        var item = await _items.GetByIdAsync(id);
        return item is null ? NotFound() : Ok(item);
    }
}