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
}