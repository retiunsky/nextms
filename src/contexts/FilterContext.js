import { createContext, useContext, useEffect, useState } from 'react';
import { getBrands } from 'src/lib/getData';

const FilterContext = createContext({});

export function FilterProvider({ children }) {
  const [catId, setCatId] = useState(null);
  const [brands, setBrands] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const data = async () => {
    const res = await getBrands(catId);
    setBrands(res);
  };

  const filteredBrands = brands.filter((item) => {
    if (item.attributes.categories.data.length) {
      for (var prop in item.attributes.categories.data) {
        if (item.attributes.categories.data[prop]['id'] == catId) {
          return true;
        }
      }
    }
    return false;
  });

  useEffect(() => {
    data();
    setLoading(false);
  }, []);

  const brandsChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setSelectedBrands(
      isChecked
        ? [...selectedBrands, value]
        : selectedBrands.filter((item) => item !== value)
    );
  };
  return (
    <FilterContext.Provider
      value={{ selectedBrands, brandsChange, catId, setCatId, filteredBrands }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  return useContext(FilterContext);
}