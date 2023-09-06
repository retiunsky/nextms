import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";
import ItemCard from "src/components/itemCard";
import SidebarLayout from "src/layout";
import { CMS_URL } from "src/lib/config";

export default function SearchPage({ products }) {
  const router = useRouter();

  return (
    <SidebarLayout title="Search Results">
      <Link href={`/`}>Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {products.data.length === 0 && <h3>No products to show</h3>}

      {products.data.map((product) => (
        <ItemCard key={product.id} item={product} />
      ))}
    </SidebarLayout>
  );
}


export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    filters: {
        title: {
          $contains: term,
        },
    },
  });

  const res = await fetch(`${CMS_URL}/products?populate=*&${query}`);
  const products = await res.json();

  return {
    props: { products },
  };
}