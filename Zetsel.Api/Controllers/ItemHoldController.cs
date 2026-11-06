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

    [HttpPost]
    public async Task<ActionResult<ItemHoldDto>> Create(CreateItemHoldDto dto)
    {
        var created = await _itemHolds.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _itemHolds.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ItemHoldDto>> Update(int id, UpdateItemHoldDto dto)
    {
        var updated = await _itemHolds.UpdateAsync(id, dto);
        return updated is null ? NotFound() : Ok(updated);
    }
}