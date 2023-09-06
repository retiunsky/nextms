import Head from 'next/head';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ItemsList from 'src/components/itemsList';
import SidebarLayout from 'src/layout';
import { useFilterContext, FilterProvider } from 'src/contexts/FilterContext';
import {  useEffect } from 'react';
import Footer from 'src/components/Footer';
import { CMS_URL } from 'src/lib/config';

 function ProductsPage({ catId, category }) {
  const { selectedBrands, setCatId } = useFilterContext();
  useEffect(() => {
    setCatId(catId);
  }, []);

  return (
    <FilterProvider>
      <Head>
        <title>MNS - {category.data.attributes.title}</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading={category.data.attributes.title}
          subHeading="Products  content."
        />
      </PageTitleWrapper>
      <ItemsList catId={catId} selectedBrands={selectedBrands} />
      <Footer />
    </FilterProvider>
  );
}

export async function getServerSideProps({ params: { catId } }) {
    const response = await fetch(`${CMS_URL}/categories/${catId}`);
    const category = await response.json();
 
  return {
    props: { catId, category }
  };
}

ProductsPage.provider = FilterProvider

ProductsPage.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ProductsPage