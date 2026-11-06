using Zetsel.Api.Dtos;
using Zetsel.Api.Models;
using Zetsel.Api.Repositories;

namespace Zetsel.Api.Services;

public class OrderShareService : IOrderShareService
{
    private readonly IRepository<OrderShare> _shares;
    private readonly IRepository<GroupOrder> _orders;
    private readonly IRepository<Member> _members;

    public OrderShareService(
        IRepository<OrderShare> shares,
        IRepository<GroupOrder> orders,
        IRepository<Member> members)
    {
        _shares = shares;
        _orders = orders;
        _members = members;
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

    public async Task<OrderShareDto> CreateAsync(CreateOrderShareDto dto)
    {
        if (dto.Grams <= 0)
            throw new ArgumentException(
                "Grams must be greater than 0.");

        var order = await _orders.GetByIdAsync(dto.OrderId);

        if (order is null)
            throw new ArgumentException(
                "OrderId does not exist.");

        if (await _members.GetByIdAsync(dto.MemberId) is null)
            throw new ArgumentException(
                "MemberId does not exist.");

        if (order.Status != "Open")
            throw new InvalidOperationException(
                "Cannot add shares to a closed group order.");

        var existingShares = await _shares.GetAllAsync();

        if (existingShares.Any(share =>
            share.OrderId == dto.OrderId &&
            share.MemberId == dto.MemberId))
        {
            throw new InvalidOperationException(
                "Member already has a share in this group order.");
        }

        var share = new OrderShare
        {
            OrderId = dto.OrderId,
            MemberId = dto.MemberId,
            Grams = dto.Grams
        };

        _shares.Add(share);
        await _shares.SaveChangesAsync();

        return ToDto(share);
    }

    public async Task<OrderShareDto?> UpdateAsync(
        int id,
        UpdateOrderShareDto dto)
    {
        var share = await _shares.GetByIdAsync(id);

        if (share is null)
            return null;

        if (dto.Grams <= 0)
            throw new ArgumentException(
                "Grams must be greater than 0.");

        var order = await _orders.GetByIdAsync(share.OrderId);

        if (order is null)
            throw new InvalidOperationException(
                "Group order no longer exists.");

        if (order.Status != "Open")
            throw new InvalidOperationException(
                "Cannot update shares of a closed group order.");

        share.Grams = dto.Grams;

        _shares.Update(share);
        await _shares.SaveChangesAsync();

        return ToDto(share);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var share = await _shares.GetByIdAsync(id);

        if (share is null)
            return false;

        var order = await _orders.GetByIdAsync(share.OrderId);

        if (order is null)
            throw new InvalidOperationException(
                "Group order no longer exists.");

        if (order.Status != "Open")
            throw new InvalidOperationException(
                "Cannot delete shares of a closed group order.");

        _shares.Delete(share);
        await _shares.SaveChangesAsync();

        return true;
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
