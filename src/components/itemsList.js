import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ItemCard from './itemCard';
import { getProducts } from 'src/lib/getData';
import { useSortContext } from 'src/contexts/SortContext';
import { motion, AnimatePresence } from 'framer-motion';

export const gridSpacing = 3;

export default function ItemsList({ catId, selectedBrands }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sortedProducts, setSortedProducts] = useState([]);
  const { sortBy } = useSortContext();
  const data = async () => {
    const res = await getProducts(catId, selectedBrands);
    setProducts(res);
  };

  useEffect(() => {
    data();
    setLoading(false);
  }, [selectedBrands, sortBy]);

  useEffect(() => {
    setSortedProducts(
      products.sort((a, b) => {
        switch (sortBy) {
          case 'Price: Low-High':
            return a.attributes.price - b.attributes.price;
          case 'Price: High-Low':
            return b.attributes.price - a.attributes.price;
          case 'Newest':
            return b.attributes.createdAt.localeCompare(a.attributes.createdAt);
          default:
            return 0;
        }
      })
    );
  }, [products, sortBy]);

  return (
    <main>
      <Grid container sx={{ p: '30px' }} spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid component={motion.div} container spacing={gridSpacing}>
            <AnimatePresence>
              {sortedProducts.map((item) => (
                <ItemCard item={item} key={item.id} />
              ))}
            </AnimatePresence>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
}
