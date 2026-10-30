using Zetsel.Api.Dtos;
using Zetsel.Api.Models;
using Zetsel.Api.Repositories;

namespace Zetsel.Api.Services;

public class BeanService : IBeanService
{
    private readonly IRepository<Bean> _beans;

    public BeanService(IRepository<Bean> beans)
    {
        _beans = beans;
    }

    public async Task<List<BeanDto>> GetAllAsync()
    {
        var beans = await _beans.GetAllAsync();
        return beans.Select(ToDto).ToList();
    }

    public async Task<BeanDto?> GetByIdAsync(int id)
    {
        var bean = await _beans.GetByIdAsync(id);
        return bean is null ? null : ToDto(bean);
    }

    private static BeanDto ToDto(Bean bean) => new()
    {
        Id = bean.Id,
        Name = bean.Name,
        Roaster = bean.Roaster,
        Origin = bean.Origin,
        Roastlevel = bean.RoastLevel,
        Freshnessweeks = bean.FreshnessWeeks
    };
}
