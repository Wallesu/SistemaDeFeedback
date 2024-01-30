/* eslint-disable no-unused-vars */

const FormatURLParams = dto => {
    dto = FilterSortByDesc(dto);
    dto = RemoveEmptyArrays(dto);
  
    'dataTermino' in dto ? (dto.dataTermino += 'T23:59:59') : null;
  
    return new URLSearchParams(dto);
  };
  
  const FilterSortByDesc = dto => {
    if (
      'sortBy' in dto &&
      'sortDesc' in dto &&
      !dto.sortBy.length &&
      dto.sortDesc.length
    ) {
      delete dto.sortBy;
      delete dto.sortDesc;
    }
    return dto;
  };
  
  const RemoveEmptyArrays = dto => {
    return Object.fromEntries(
      Object.entries(dto).filter(([_, value]) => {
        if (Array.isArray(value) && !value.length) return false;
        return value || value === 0 ? true : false;
      })
    );
  };
  
  module.exports = {
    FormatURLParams
  };
  