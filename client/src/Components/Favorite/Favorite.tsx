import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import FavoriteProduct from './FavoriteProduct';
import { Product } from '../../model/Product';
import { UserApi } from '../../services/user-service';
import { cookies } from '../Authentication/Login';

export default function Favorite() {
  const [products,setPorducts]=useState<Product[]>([]);
  const token = cookies.get("token");

  useEffect(()=>{
     (async function getAllFavProducts(){
        const user=await UserApi.getUser();
        const favProducts=await UserApi.getFavoritesProduct(user.userId,token);
        console.log(favProducts)
     })();
  },[]);

  return (
    <Container maxWidth="lg">
    <Typography
      textAlign="center"
      variant="h4"
      marginTop="15px"
      marginBottom="25px"
    >
      Favorite Products
    </Typography>
    <Box
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "32px",
        justifyContent: "center",
      }}
    >
      {}
      <Outlet />
    </Box>
  </Container>
  )
}
