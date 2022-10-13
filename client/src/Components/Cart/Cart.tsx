import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CartProduct from "./CartProduct";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import "./Cart.css";
import { styled } from "@mui/material/styles";


const ShippingTitle=styled(Typography)(({theme})=>({
  fontFamily:"Exo",
  className:"shipping-title",
  textTransform: "uppercase",
  position:"relative",
  left:'17%',
  color:"#000",
  [theme.breakpoints.down("md")]: {
    left:"20%",
    border:"2px solid red"
  },
}));

export default function Cart() {
  return (
    <>
      <Typography textAlign="left" fontSize="40px" marginTop="15px">
        Shopping Cart
      </Typography>
      <Container style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <TableContainer
          component={Paper}
          style={{
            width: "600px",
            marginRight: "auto",
            marginTop: "20px",
          }}
        >
          <Table aria-label="simple table">
            <TableBody
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              <CartProduct />
              <CartProduct />
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{ background: "#F7F6F5", position: "relative" }}
          className="order-info"
        >
          <Typography
            className="cart-totals-typography"
            textTransform="uppercase"
            padding="15px"
            fontSize="19px"
            fontWeight="400"
            fontFamily="Exo"
          >
            Cart Totals
          </Typography>
          <Box style={{ display: "flex", flexFlow: "column wrap" }}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-around",
                letterSpacing: "2px",
              }}
            >
              <Typography
                fontFamily="Exo"
                style={{ textTransform: "uppercase" }}
                color="#000"
              >
                Subtotal
              </Typography>
              <Typography fontFamily="Exo" fontSize="15px" color="#717171">
                $525
              </Typography>
            </Box>

            <Box
              className="shipping-container"
              style={{
                display: "flex",
                justifyContent: "space-between",
                letterSpacing: "2px",
              }}
            >
              <ShippingTitle >Shipping</ShippingTitle>

              <RadioGroup
                defaultValue="Address"
                name="radio-buttons-group"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: "14px",
                  },
                  "& .MuiFormGroup-root": {
                    alignItems: "flex-end",
                  },
                }}
              >
                <FormControlLabel
                  value="Address"
                  label="Address: $10"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      fontFamily: "Exo",
                      
                      color: "#717171",
                    },
                  }}
                  style={{position:"relative",right:'0%'}}
                  control={<Radio size="small" style={{ color: "#C6ADCA" }} />}
                />
                <FormControlLabel
                  value="Office"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      fontFamily: "Exo",
                      color: "#717171",
                    },
                  }}
                  label="Office: $5"
                  control={<Radio size="small" style={{ color: "#C6ADCA" }} />}
                />
              </RadioGroup>
            </Box>
          </Box>

          <Box>
            <Divider style={{marginTop:"5%"}} variant="middle" />
            
            <Box
              style={{
                display: "flex",
                justifyContent: "space-around",
                letterSpacing: "2px",
                marginBottom:"10%"
              }}
            >
              <Typography
                fontFamily="Exo"
                style={{ textTransform: "uppercase" }}
                color="#000"
              >
                Subtotal
              </Typography>
              <Typography fontFamily="Exo" fontSize="15px" color="#717171">
                $525
              </Typography>
            </Box>

            <Button
              variant="contained"
              style={{
                marginTop:"5%",
                position: "absolute",
                bottom: "5%",
                fontSize: "13px",
                fontFamily: "'Exo', sans-serif",
                background: "black",
                width: "100%",
                borderRadius: "0px",
              }}
            >
              Proceed to checkout
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
