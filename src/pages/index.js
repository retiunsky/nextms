import Head from "next/head";
import Layout from "src/layout";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Container } from "@mui/material";
import Footer from "src/components/Footer";
import Carousel from "src/components/SwiperCarousel";
import { useCategories } from "src/lib/hooks/useCategories";

export default function CategoriesPage() {
  const {categories, isLoading } = useCategories();
  
  return (
    <>
      <Head>
        <title>MNS - Categories</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle heading="Categories" subHeading="Categories content" />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Carousel categories={categories} isLoading={isLoading} />
      </Container>
      <Footer />
    </>
  );
}

CategoriesPage.getLayout = (page) => <Layout>{page}</Layout>;
