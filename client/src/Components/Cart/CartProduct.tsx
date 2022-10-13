import React from "react";
import {
  Badge,
  Box,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import "./Cart.css";

export default function CartProduct() {
  return (
    <TableRow
      key=""
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell align="center">
        <IconButton size="large" aria-label="close-icon" color="inherit">
          <Badge color="error">
            <CloseIcon style={{ color: "rgb(157, 157, 157)" }} />
          </Badge>
        </IconButton>
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        style={{ textAlign: "center", width: "10%" }}
      >
        <CardMedia
          component="img"
          height="110px"
          style={{ width: "100px", background: "#ebeeff" }}
          image="https://satine.qodeinteractive.com/wp-content/uploads/2017/07/h2-carousel-product-4-600x723.jpg"
          alt="image"
        />
      </TableCell>
      <TableCell align="left" className="cart-product-name">
        name
      </TableCell>
      <TableCell
        align="center"
        className="cart-product-price"
        style={{
          fontSize: "15px",
          fontWeight: "100",
          color: "#909090",
          width: "30%",
        }}
      >
        $120
      </TableCell>
      <TableCell align="left">
        <Box className="cart-quntity-container">
          <Typography className="cart-quntity-container-title" marginTop="4px">
            Quantity
          </Typography>
          <IconButton size="small" color="inherit" className="quantity-symbol">
            <Badge color="error">
              <ExpandLessIcon style={{ transform: "rotate(-90deg)" }} />
            </Badge>
          </IconButton>

          <Typography
            className="cart-quntity-container-subtitle"
            marginTop="4px"
          >
            4
          </Typography>

          <IconButton size="small" color="inherit" className="quantity-symbol">
            <Badge color="error">
              <ExpandLessIcon style={{ transform: "rotate(90deg)" }} />
            </Badge>
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
}
