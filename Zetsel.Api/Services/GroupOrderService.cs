
using Zetsel.Api.Dtos;
using Zetsel.Api.Models;
using Zetsel.Api.Repositories;

namespace Zetsel.Api.Services;

public class GroupOrderService : IGroupOrderService
{
    private readonly IRepository<GroupOrder> _orders;
    private readonly IRepository<OrderShare> _shares;

    public GroupOrderService(
        IRepository<GroupOrder> orders,
        IRepository<OrderShare> shares)
    {
        _orders = orders;
        _shares = shares;
    }

    public async Task<List<GroupOrderDto>> GetAllAsync()
    {
        var orders = await _orders.GetAllAsync();
        var shares = await _shares.GetAllAsync();

        return orders.Select(order => ToDto(order, shares)).ToList();
    }

    public async Task<GroupOrderDto?> GetByIdAsync(int id)
    {
        var order = await _orders.GetByIdAsync(id);

        if (order is null)
            return null;

        var shares = await _shares.GetAllAsync();

        return ToDto(order, shares);
    }

    private static GroupOrderDto ToDto(
        GroupOrder order,
        List<OrderShare> shares)
    {
        return new GroupOrderDto
        {
            Id = order.Id,
            BeanId = order.BeanId,
            StartedById = order.StartedById,
            MinimumGrams = order.MinimumGrams,
            ClosingDate = order.ClosingDate,
            Status = order.Status,
            TotalGrams = shares
                .Where(share => share.OrderId == order.Id)
                .Sum(share => share.Grams)
        };
    }
}
