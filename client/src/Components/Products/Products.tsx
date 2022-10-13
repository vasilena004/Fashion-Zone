import {
  Box,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import SearchIcon from "@mui/icons-material/Search";
import ProductComponent from "./Product";
import ProductDetalis from "./ProductDetalis";
import { Product } from "../../model/Product";
import { ProductApi } from "../../services/product-service";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productForDetailView,setProductForDetailView]=useState<Product | undefined>();

  const [open, setOpen] = useState(false);
  const handleOpen = (product:Product) => {
    setProductForDetailView(product);
    setOpen(true);
  }
  const handleClose = () => {
    setProductForDetailView(undefined);
    setOpen(false);
  }
  const [value, setValue] = useState(2);

  useEffect(() => {
    (async function getAllProducts() {
      const products = await ProductApi.findAll();
      setProducts(products);
    })();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="md">
      <Link to="add">
        <IconButton
          style={{
            background: "#D6C7D9",
            padding: "7px",
            position: "absolute",
          }}
          aria-label="add product"
        >
          <AddBusinessIcon />
        </IconButton>
      </Link>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          marginTop: "2%",
          width: "25%",
          marginLeft: "auto",
          marginBottom: "1%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for products"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <Box
        style={{
          display: "flex",
          flexFlow: "column wrap",
          justifyContent: "center",
          alignContent: "center",
          marginBottom: "2%",
        }}
      >
        <Typography textAlign="center" variant="h4" marginTop="15px">
          Products
        </Typography>

        <Box style={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="order-by-label">Order By</InputLabel>
            <Select
              labelId="order-by-label"
              id="order-by-label"
              // value={age}
              // onChange={handleChange}
              label="Order By"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="lowest-price">Lowest price</MenuItem>
              <MenuItem value="highest-price">Highest price</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-label"
              // value={age}
              // onChange={handleChange}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="t-shirt">T-Shirt</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="color-label">Color</InputLabel>
            <Select
              labelId="color-label"
              id="color-label"
              // value={age}
              // onChange={handleChange}
              label="Color"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="pink">Pink</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "32px",
          justifyContent: "center",
        }}
      >
        {products.map((product) => {
          return (
            <ProductComponent key={product.id} product={product} handleOpenDetails={handleOpen} />
          );
        })}
        <Outlet />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ProductDetalis product={productForDetailView as Product} />
      </Modal>
    </Container>
  );
}
