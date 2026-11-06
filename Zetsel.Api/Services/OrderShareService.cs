using Zetsel.Api.Dtos;
using Zetsel.Api.Models;
using Zetsel.Api.Repositories;

namespace Zetsel.Api.Services;

public class OrderShareService : IOrderShareService
{
    private readonly IRepository<OrderShare> _shares;

    public OrderShareService(IRepository<OrderShare> shares)
    {
        _shares = shares;
    }

    public async Task<List<OrderShareDto>> GetAllAsync()
    {
        var shares = await _shares.GetAllAsync();

        return shares.Select(ToDto).ToList();
    }

    public async Task<OrderShareDto?> GetByIdAsync(int id)
    {
        var share = await _shares.GetByIdAsync(id);

        if (share is null)
            return null;

        return ToDto(share);
    }

    private static OrderShareDto ToDto(OrderShare share)
    {
        return new OrderShareDto
        {
            Id = share.Id,
            OrderId = share.OrderId,
            MemberId = share.MemberId,
            Grams = share.Grams
        };
    }
}
