import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Typography, Button, Grid } from '@mui/material';
import ProductSortButton from 'src/components/productSortButton';
import Link from 'next/link';

const PageTitle = ({ heading = '', subHeading = '', docs = '', ...rest }) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="subtitle2">{subHeading}</Typography>
      </Grid>
      <Grid item>
        {currentRoute === '/products/[catId]' ? (
          <ProductSortButton />
        ) : (
          <Link href={'/about'}>
            <Button
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
            >
              Documentation
            </Button>
          </Link>
        )}
      </Grid>
    </Grid>
  );
};

PageTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  docs: PropTypes.string
};

export default PageTitle;
