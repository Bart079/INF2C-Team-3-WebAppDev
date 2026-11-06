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
    public async Task<BeanDto> CreateAsync(CreateBeanDto dto)
    {
        var bean = new Bean
        {
            Name = dto.Name,
            Roaster = dto.Roaster,
            Origin = dto.Origin,
            RoastLevel = dto.RoastLevel,
            FreshnessWeeks = dto.FreshnessWeeks
        };

        _beans.Add(bean);
        await _beans.SaveChangesAsync();

        return ToDto(bean);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var bean = await _beans.GetByIdAsync(id);
        if (bean is null) return false;

        _beans.Delete(bean);
        await _beans.SaveChangesAsync();

        return true;
    }

    public async Task<BeanDto?> UpdateAsync(int id, UpdateBeanDto dto)
    {
        var bean = await _beans.GetByIdAsync(id);
        if (bean is null) return null;

        bean.Name = dto.Name;
        bean.Roaster = dto.Roaster;
        bean.Origin = dto.Origin;
        bean.RoastLevel = dto.Roastlevel;
        bean.FreshnessWeeks = dto.Freshnessweeks;
        await _beans.SaveChangesAsync();
        return ToDto(bean);
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