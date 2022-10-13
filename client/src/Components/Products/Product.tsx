import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Product as ProductModel } from "../../model/Product";
import { UserApi } from "../../services/user-service";
import { cookies } from "../Authentication/Login";

interface ProductProps {
  product: ProductModel;
  handleOpenDetails: (product: ProductModel) => void;
}

export default function Product({ handleOpenDetails, product }: ProductProps) {
  const [showButtons, setShowButtons] = useState(false);
  const token = cookies.get("token");

  const handleAddToFavorite = async () => {
    const user = await UserApi.getUser();
    if (user) {
      const added = await UserApi.addToFavorite(product.id, user.userId, token);
      console.log("use",added);
    }
  };

  return (
    <>
      <Card
        sx={{ width: 250 }}
        onMouseOver={() => setShowButtons(true)}
        onMouseOut={() => setShowButtons(false)}
        style={{ position: "relative" }}
      >
        <Box height="300px">
          <CardMedia
            component="img"
            style={{ height: "100%" }}
            image={product.imageUrl}
            alt="Paella dish"
          />
        </Box>
        <Box sx={{ maxHeight: 100 }}>
          <CardContent>
            <Typography
              variant="h6"
              color="inherit"
              textAlign="center"
              fontFamily="'Abyssinica SIL', serif"
            >
              {product.productName}
            </Typography>
            <Typography
              variant="body1"
              color="#7b7b7b"
              textAlign="center"
              fontFamily="'Abyssinica SIL', serif"
            >
              {product.price}
            </Typography>
          </CardContent>
          <CardActions style={{ boxShadow: "none" }}>
            {showButtons && (
              <>
                <Box
                  style={{
                    textAlign: "center",
                    padding: "7px 11px 3px 24px",
                    position: "absolute",
                    top: "30%",
                    left: "23%",
                    background: "white",
                    opacity: "0.9",
                    fontFamily: "open sans,sans-serif",
                  }}
                  aria-label="add to favorites"
                >
                  <Typography
                    color="#000"
                    fontSize="11px"
                    fontFamily="'Exo', sans-serif"
                    fontWeight="700"
                    style={{
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      letterSpacing: "2px",
                    }}
                  >
                    Add to Cart
                    <IconButton aria-label="add-to-cart" sx={{ color: "#000" }}>
                      <ControlPointIcon />
                    </IconButton>
                  </Typography>
                </Box>
                <Box
                  style={{
                    position: "absolute",
                    bottom: "25%",
                    right: "0%",
                    width: "100%",
                  }}
                >
                  <Button
                    onClick={(event) => handleOpenDetails(product)}
                    variant="contained"
                    startIcon={<RemoveRedEyeIcon />}
                    style={{
                      fontSize: "11px",
                      background: "black",
                      width: "50%",
                      borderRadius: "0px",
                      fontFamily: "'Exo', sans-serif",
                      borderRight: "1px solid white",
                    }}
                  >
                    Quicklook
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<FavoriteIcon />}
                    onClick={() => handleAddToFavorite()}
                    style={{
                      fontSize: "11px",
                      fontFamily: "'Exo', sans-serif",
                      background: "black",
                      width: "50%",
                      borderRadius: "0px",
                    }}
                  >
                    Favorites
                  </Button>
                </Box>
              </>
            )}
          </CardActions>
        </Box>
      </Card>
      <Outlet />
    </>
  );
}
