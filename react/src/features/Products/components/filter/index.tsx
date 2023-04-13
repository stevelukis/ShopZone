import React from "react";
import FilterCategory from "./FilterCategory";
import FilterPrice from "./FilterPrice";

function FilterSideBar() {
  const handleCategoryClick = (id: number) => {
    console.log(id);
  };

  return (
    <div className="w-[16rem] border-2 border-gray-200 rounded-lg">
      <div className="p-3">
        <FilterCategory onCategoryClick={handleCategoryClick} />
      </div>
      <div className="p-3 border-t-2 border-gray-200">
        <FilterPrice />
      </div>
    </div>
  );
}

export default FilterSideBar;
