using Microsoft.EntityFrameworkCore;

namespace Zetsel.Api.Models;

[Index(nameof(OrderId), nameof(MemberId), IsUnique = true)]
public class OrderShare : IEntity
{
    public int Id { get; set; }

    public int OrderId { get; set; }
    public GroupOrder Order { get; set; } = null!;

    public int MemberId { get; set; }
    public Member Member { get; set; } = null!;

    public int Grams { get; set; }
}
