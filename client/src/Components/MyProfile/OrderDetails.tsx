import { Box, Button, CardMedia, styled, Typography } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const style = {
  marginTop: "5%",
  boxShadow: "1px 1px 4px 0px rgba(0,0,0,1)",
  padding: "28px 28px 0px 28px",
};

const flexRowStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
};

const flexColumnStyleStart = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
};
const flexColumnStyleEnd = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "end",
};
const fontFamilyAbyssinica = {
  fontFamily: "'Abyssinica SIL', serif",
};

const boxStyle = {
  marginTop: "2%",
  p: "10px 23px",
  //   background: "#e7e4e4",
};

const Span = styled(Box)(({}) => ({
  fontWeight: "bold",
}));

const OrderBox = styled(Box)(({ theme }) => ({
  marginTop: "5%",
  marginBottom: "5%",
  display: "flex",
  flexFlow: "column wrap",
  gap: "15px",
}));

const ProductBox = styled(Box)(({ theme }) => ({
  width: "60%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
}));

const BoxBottomPosition = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
}));

const ShippingInfoTypography = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#2d2b2b",
  fontWeight: "500",
  // textAlign:"center",
  fontFamily: "'Abyssinica SIL', serif",
}));

export default function OrderDetails() {
  return (
    <>
      <Button
        variant="contained"
        style={{ background: "#c48893" }}
        size="small"
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>

      <Box sx={style}>
        <Typography
          sx={fontFamilyAbyssinica}
          textAlign="center"
          fontSize="25px"
        >
          Order Details
        </Typography>

        <Box sx={flexRowStyle}>
          <Box sx={flexColumnStyleStart}>
            <Typography sx={fontFamilyAbyssinica} fontWeight="bold">
              Order №
            </Typography>
            <Typography
              sx={fontFamilyAbyssinica}
              fontSize="15px"
              style={{ textDecoration: "underline" }}
            >
              Bgsd568
            </Typography>
          </Box>

          <Box sx={flexColumnStyleEnd}>
            <Typography sx={fontFamilyAbyssinica} fontWeight="bold">
              Order Date
            </Typography>
            <Typography
              sx={fontFamilyAbyssinica}
              fontSize="15px"
              style={{ textDecoration: "underline" }}
            >
              24/05/2000
            </Typography>
          </Box>
        </Box>
        <Box sx={boxStyle}>
          <Typography fontSize="14px" sx={fontFamilyAbyssinica}>
            <Span component="span">Delivery type</Span>: Address
          </Typography>
          <Typography sx={fontFamilyAbyssinica} fontSize="14px">
            <Span component="span">Order Status</Span>: Created
          </Typography>

          <Typography
            sx={fontFamilyAbyssinica}
            fontSize="20px"
            textAlign="center"
            marginTop="2%"
          >
            Summary of the order
          </Typography>

          <OrderBox>
            <ProductBox position="relative">
              <CardMedia
                component="img"
                style={{ width: "40%" }}
                image="https://satine.qodeinteractive.com/wp-content/uploads/2017/07/h-product-4-600x723.jpg"
                alt="Paella dish"
              />
              <Box marginLeft="5%">
                <Typography sx={fontFamilyAbyssinica} fontSize="15px">
                  Dress
                </Typography>
                <Typography
                  sx={fontFamilyAbyssinica}
                  fontSize="13px"
                  marginBottom="10%"
                >
                  34.99 BG
                </Typography>
                <Typography
                  fontSize="11px"
                  color="#3c3c3c"
                  sx={fontFamilyAbyssinica}
                >
                  Article Number: 155F
                </Typography>
                <Typography
                  fontSize="11px"
                  color="#3c3c3c"
                  sx={fontFamilyAbyssinica}
                >
                  Count: 1
                </Typography>
                <Typography
                  fontSize="11px"
                  color="#3c3c3c"
                  sx={fontFamilyAbyssinica}
                >
                  Color: grey
                </Typography>
                <Typography
                  fontSize="11px"
                  color="#3c3c3c"
                  sx={fontFamilyAbyssinica}
                >
                  Size: S
                </Typography>
                <Typography
                  fontSize="11px"
                  color="#3c3c3c"
                  sx={fontFamilyAbyssinica}
                >
                  Total: 34.99
                </Typography>
              </Box>
              {/* <BoxBottomPosition >
                <Typography fontSize="14px">Article Number: 155F</Typography>
              </BoxBottomPosition> */}
            </ProductBox>

            <ProductBox position="relative">
              <CardMedia
                component="img"
                style={{ width: "40%" }}
                image="https://satine.qodeinteractive.com/wp-content/uploads/2017/07/h-product-4-600x723.jpg"
                alt="Paella dish"
              />
              <Box marginLeft="5%">
                <Typography sx={fontFamilyAbyssinica} fontSize="15px">
                  Dress
                </Typography>
                <Typography
                  sx={fontFamilyAbyssinica}
                  fontSize="13px"
                  marginBottom="10%"
                >
                  34.99 BG
                </Typography>
                <Typography
                  fontSize="11px"
                  color="#3c3c3c"
                  sx={fontFamilyAbyssinica}
                >
                  Article Number: 155F
                </Typography>
                <Typography
                  fontSize="11px"
                  color="#3c3c3c"
                  sx={fontFamilyAbyssinica}
                >
                  Count: 1
                </Typography>
                <Typography
                  fontSize="11px"
                  color="#3c3c3c"
                  sx={fontFamilyAbyssinica}
                >
                  Color: grey
                </Typography>
                <Typography
                  fontSize="11px"
                  color="#3c3c3c"
                  sx={fontFamilyAbyssinica}
                >
                  Size: S
                </Typography>
                <Typography
                  fontSize="11px"
                  color="#3c3c3c"
                  sx={fontFamilyAbyssinica}
                >
                  Total: 34.99
                </Typography>
              </Box>
            </ProductBox>

            <Box style={{ marginTop: "3%" }}>
                <Typography
                  sx={fontFamilyAbyssinica}
                  fontWeight="bold"
                  marginBottom="3px"
                  fontSize="15px"
                >
                  Shipping address
                </Typography>
                <ShippingInfoTypography>
                  Vasilena Kosovska
                </ShippingInfoTypography>
                <ShippingInfoTypography>
                  Street Panichishte, №-92
                </ShippingInfoTypography>
                <ShippingInfoTypography>Sofia, Bulgaria</ShippingInfoTypography>
              </Box>

            <Box style={{ marginTop: "3%" }}>
              <Typography
                sx={fontFamilyAbyssinica}
                fontWeight="bold"
                marginBottom="3px"
                fontSize="15px"
              >
                Method of payment
              </Typography>
              <ShippingInfoTypography>
                Payment on delivery
              </ShippingInfoTypography>
            </Box>

            <Box style={{ marginTop: "3%" }}>
              <Typography
                sx={fontFamilyAbyssinica}
                fontWeight="bold"
                marginBottom="3px"
                fontSize="15px"
              >
                Delivery note:
              </Typography>
              <ShippingInfoTypography>
                Yes
              </ShippingInfoTypography>
            </Box>

            <Box style={{ marginTop: "7%", width: "100%", textAlign: "right" }}>
              <Typography
                sx={fontFamilyAbyssinica}
                fontWeight="bold"
                marginBottom="3px"
                fontSize="14px"
                style={{ textTransform: "uppercase" }}
              >
                Total sum with delivery: 159BG
              </Typography>
            </Box>
          </OrderBox>
        </Box>
      </Box>
    </>
  );
}
