using Zetsel.Api.Dtos;
using Zetsel.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Zetsel.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BeansController : ControllerBase
{
    private readonly IBeanService _beans;

    public BeansController(IBeanService beans)
    {
        _beans = beans;
    }

    [HttpGet]
    public async Task<ActionResult<List<BeanDto>>> GetAll()
        => Ok(await _beans.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<BeanDto>> GetById(int id)
    {
        var bean = await _beans.GetByIdAsync(id);
        return bean is null ? NotFound() : Ok(bean);
    }

    [HttpPost]
    public async Task<ActionResult<BeanDto>> Create(CreateBeanDto dto)
    {
        var created = await _beans.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _beans.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<BeanDto>> Update(int id, UpdateBeanDto dto)
    {
        var updated = await _beans.UpdateAsync(id, dto);
        return updated is null ? NotFound() : Ok(updated);
    }
}