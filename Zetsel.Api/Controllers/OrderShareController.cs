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
}
