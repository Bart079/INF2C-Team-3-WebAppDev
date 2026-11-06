using Microsoft.AspNetCore.Mvc;
using Zetsel.Api.Dtos;
using Zetsel.Api.Services;

namespace Zetsel.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MembersController : ControllerBase
{
    private readonly IMemberService _members;

    public MembersController(IMemberService members)
    {
        _members = members;
    }

    [HttpGet]
    public async Task<ActionResult<List<MemberDto>>> GetAll()
        => Ok(await _members.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<MemberDto>> GetById(int id)
    {
        var member = await _members.GetByIdAsync(id);
        return member is null ? NotFound() : Ok(member);
    }
}
