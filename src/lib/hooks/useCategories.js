import { useEffect, useState } from 'react';
import { getCategories } from '../getData';

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const data = async () => {
    const res = await getCategories();
    setCategories(res);
  };

  useEffect(() => {
    data();
    setLoading(false);
  }, []);

  return categories
}

