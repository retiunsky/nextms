import qs from "qs";
import { CMS_URL } from "./config";

export async function getDataById(id) {
  const response = await fetch(`${CMS_URL}/products/${id}?populate=*`);
  const item = await response.json();
  return item.data;
}

export async function getProducts(catId, selectedBrands) {
  const query = qs.stringify({
    filters: {
      sub_categories: {
        title: {
          $eq: selectedBrands,
        },
      },
    },
  });

  const response = await fetch(
    `${CMS_URL}/products?populate=*&[filters][categories][id]=${catId}&${query}`
  );
  const items = await response.json();
  return await items.data;
}

export async function getCategories() {
  const response = await fetch(`${CMS_URL}/categories?populate=*`);
  const items = await response.json();
  return await items.data;
}

export async function getBrands(catId) {
  const response = await fetch(
    `${CMS_URL}/sub-categories?populate=*`
    );
  const items = await response.json();
  return await items.data;
}


