using Zetsel.Api.Dtos;
using Zetsel.Api.Models;
using Zetsel.Api.Repositories;

namespace Zetsel.Api.Services;

public class GroupOrderService : IGroupOrderService
{
    private readonly IRepository<GroupOrder> _orders;
    private readonly IRepository<OrderShare> _shares;
    private readonly IRepository<Bean> _beans;
    private readonly IRepository<Member> _members;

    public GroupOrderService(
        IRepository<GroupOrder> orders,
        IRepository<OrderShare> shares,
        IRepository<Bean> beans,
        IRepository<Member> members)
    {
        _orders = orders;
        _shares = shares;
        _beans = beans;
        _members = members;
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

    public async Task<GroupOrderDto> CreateAsync(CreateGroupOrderDto dto)
    {
        if (dto.MinimumGrams <= 0)
            throw new ArgumentException(
                "MinimumGrams must be greater than 0.");

        if (dto.ClosingDate < DateOnly.FromDateTime(DateTime.Today))
            throw new ArgumentException(
                "ClosingDate cannot be in the past.");

        if (await _beans.GetByIdAsync(dto.BeanId) is null)
            throw new ArgumentException(
                "BeanId does not exist.");

        if (await _members.GetByIdAsync(dto.StartedById) is null)
            throw new ArgumentException(
                "StartedById does not exist.");

        var order = new GroupOrder
        {
            BeanId = dto.BeanId,
            StartedById = dto.StartedById,
            MinimumGrams = dto.MinimumGrams,
            ClosingDate = dto.ClosingDate,
            Status = "Open"
        };

        _orders.Add(order);
        await _orders.SaveChangesAsync();

        return ToDto(order, new List<OrderShare>());
    }

    public async Task<GroupOrderDto?> UpdateAsync(
        int id,
        UpdateGroupOrderDto dto)
    {
        var order = await _orders.GetByIdAsync(id);

        if (order is null)
            return null;

        if (dto.MinimumGrams <= 0)
            throw new ArgumentException(
                "MinimumGrams must be greater than 0.");

        if (dto.ClosingDate < DateOnly.FromDateTime(DateTime.Today))
            throw new ArgumentException(
                "ClosingDate cannot be in the past.");

        if (order.Status != "Open")
            throw new InvalidOperationException(
                "Only open group orders can be updated.");

        order.MinimumGrams = dto.MinimumGrams;
        order.ClosingDate = dto.ClosingDate;

        _orders.Update(order);
        await _orders.SaveChangesAsync();

        var shares = await _shares.GetAllAsync();

        return ToDto(order, shares);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var order = await _orders.GetByIdAsync(id);

        if (order is null)
            return false;

        var shares = await _shares.GetAllAsync();

        if (shares.Any(share => share.OrderId == id))
            throw new InvalidOperationException(
                "Cannot delete a group order with existing shares.");

        _orders.Delete(order);
        await _orders.SaveChangesAsync();

        return true;
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
