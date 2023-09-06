import {
  alpha,
  Box,
  Checkbox,
  ListSubheader,
  FormGroup,
  FormControlLabel,
  styled,
  useTheme
} from '@mui/material';
import { useFilterContext } from 'src/contexts/FilterContext';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

export default function ProductFilter() {
  const { filteredBrands, brandsChange } = useFilterContext();
  const theme = useTheme();
  return (
    <>
      <ListSubheader sx={{ p: 0, ml: 1 }} disableSticky>
        Brands
      </ListSubheader>
      <FormGroup sx={{ ml: 4 }}>
        {filteredBrands?.map((item) => (
          <FormControlLabel
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                bgcolor: alpha(theme.palette.background.default, 0.9),
                borderRadius: 1
              }
            }}
            control={
              <Checkbox
                sx={{
                  '&:hover': {
                    bgcolor: 'transparent'
                  }
                }}
              />
            }
            label={item.attributes.title}
            id={item.id}
            key={item.id}
            value={item.attributes.title}
            onChange={brandsChange}
          />
        ))}
      </FormGroup>
    </>
  );
}
