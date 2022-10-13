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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Outlet } from "react-router-dom";

export default function FavoriteProduct() {

  const [showButtons, setShowButtons] = useState(false);

  return (
    <Card
      sx={{ maxWidth: 320 }}
      onMouseOver={() => setShowButtons(true)}
      onMouseOut={() => setShowButtons(false)}
      style={{ position: "relative" }}
    >
      <Box height="300px">
        <CardMedia
          component="img"
          style={{ height: "100%" }}
          image="https://satine.qodeinteractive.com/wp-content/uploads/2017/07/h-product-4-600x723.jpg"
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
            3/4 Sleeve Shirt
          </Typography>
          <Typography
            variant="body1"
            color="#7b7b7b"
            textAlign="center"
            fontFamily="'Abyssinica SIL', serif"
          >
            $75
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
              <Box style={{position:"absolute",bottom:"25%", right:"0%",width:'100%'}}>
                <Button variant="contained" startIcon={<RemoveRedEyeIcon/> } style={{fontSize:"11px",
                background:"black",width:"50%",borderRadius:"0px",fontFamily:"'Exo', sans-serif",borderRight:"1px solid white"}}>
                  Quicklook</Button>

                <Button variant="contained" startIcon={<DeleteIcon />} style={{fontSize:"11px",fontFamily:"'Exo', sans-serif",
                background:"black",width:"50%",borderRadius:"0px"}}>Remove</Button>
              </Box>
            </>
          )}
        </CardActions>
        <Outlet />
      </Box>
    </Card>
  );
}

