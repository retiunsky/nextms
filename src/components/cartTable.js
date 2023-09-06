import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  useTheme,
  alpha,
  styled,
  TableContainer,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import {useAuthContext} from "src/contexts/AuthContext";

function formatCurrency(value) {
  return "$" + value.toFixed(2);
}

function buildCart(cartItems) {
  let total = 0.0;
  const items = [];
  for (const cartItem of cartItems) {
    const itemTotal = cartItem.products[0].price * cartItem.quan;
    total += itemTotal;
    items.push({ ...cartItem, total: itemTotal });
  }
  return { items, total };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: alpha(theme.palette.background.paper, 0.9),
    color: theme.palette.text.secondary,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BasicTable({ cartItems }) {
  const { deleteCart } = useAuthContext();
  const theme = useTheme();
  const cart = buildCart(cartItems);

  return (
    <Box sx={{ p: { md: 7, sm: 1 } }} >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {cart.items.map((cartItem) => (
            <StyledTableRow
              key={cartItem.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {cartItem.products[0].title}
              </StyledTableCell>
              <StyledTableCell align="right">
                {formatCurrency(cartItem.products[0].price)}
              </StyledTableCell>
              <StyledTableCell align="right">{cartItem.quan}</StyledTableCell>
              <StyledTableCell align="right">
                {formatCurrency(cartItem.total)}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  onClick={() => deleteCart({ products: cartItem.id })}
                  sx={{
                    fontSize: 14,
                    pl: 2.5,
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      bgcolor: alpha(theme.palette.background.default, 0.9),
                      color: theme.palette.primary.main,
                    },
                  }}
                  disableRipple
                >
                  delete item
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableBody>
          <StyledTableRow
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <StyledTableCell component="th" scope="row"></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="center">
              <Typography sx={{ fontSize: 20 }}>Total</Typography>
            </StyledTableCell>
            <StyledTableCell sx={{ fontSize: 20 }} align="right">
              <Typography sx={{ fontSize: 20 }}>
                {formatCurrency(cart.total)}
              </Typography>
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
