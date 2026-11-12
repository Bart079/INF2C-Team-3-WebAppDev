using Zetsel.Api.Dtos;
using Zetsel.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Zetsel.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemRequestController : ControllerBase
{
    private readonly IItemRequestService _itemRequests;

    public ItemRequestController(IItemRequestService itemRequests)
    {
        _itemRequests = itemRequests;
    }

    [HttpGet]
    public async Task<ActionResult<List<ItemRequestDto>>> GetAll()
        => Ok(await _itemRequests.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ItemRequestDto>> GetById(int id)
    {
        var item = await _itemRequests.GetByIdAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<ItemRequestDto>> Create(CreateItemRequestDto dto)
    {
        var created = await _itemRequests.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _itemRequests.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ItemRequestDto>> Update(int id, UpdateItemRequestDto dto)
    {
        var updated = await _itemRequests.UpdateAsync(id, dto);
        return updated is null ? NotFound() : Ok(updated);
    }
}