import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useState } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Category, Color, Product } from "../../model/Product";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};
const fontFamilyAbyssinica = {
  fontFamily: "'Abyssinica SIL', serif",
};
const ProductNameTypography = styled(Typography)(({ theme }) => ({
  fontSize: "30px",
  fontFamily: "'Abyssinica SIL', serif",
  marginBottom: "2%",
}));

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetalis({ product }: ProductDetailsProps) {
  const [showDescription, setShowDescription] = useState(false);
  const handleShowDescription = () => {
    setShowDescription(showDescription ? false : true);
  };

  return (
    <Card sx={style} style={{ position: "relative" }}>
      <ProductNameTypography sx={fontFamilyAbyssinica}>
        Dress
      </ProductNameTypography>

      <Box
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-evently",
          gap: "35px",
        }}
      >
        <Box style={{ width: "45%" }}>
          <CardMedia
            style={{ marginLeft: "5%", width: "100%" }}
            component="img"
            image={product.imageUrl}
            alt="Product Image"
          />
          <Box style={{}}>
            <Typography
              textAlign="center"
              sx={fontFamilyAbyssinica}
              style={{
                marginTop: "3%",
                marginBottom: "2%",
                fontSize: "14px",
                wordSpacing: "3px",
                fontWeight: "bold",
              }}
            >
              ProductCode №-{product.productCode}
            </Typography>
            {showDescription ? (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={fontFamilyAbyssinica}
                style={{
                  fontSize: "12px",
                  textAlign: "center",
                  textIndent: "5px",
                }}
              >
                {product?.description
                  ? product.description
                  : "No added description for this product!"}
              </Typography>
            ) : (
              ""
            )}

            <Box style={{ textAlign: "center" }}>
              <Button
                onClick={handleShowDescription}
                variant="outlined"
                href="#outlined-buttons"
                sx={fontFamilyAbyssinica}
                size="small"
                style={{
                  marginTop: "5%",
                  color: "black",
                  fontWeight: "500",
                  textAlign: "center",
                  borderColor: "black",
                }}
              >
                {!showDescription ? "Show " : "Hide "}Description
              </Button>
            </Box>
          </Box>
        </Box>

        <Box width="35%">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            style={{ position: "absolute", top: "5%", right: "5%" }}
          >
            <FavoriteIcon style={{ color: "#ff8197" }} />
          </IconButton>
          <CardContent
            style={{
              alignSelf: "end",
            }}
          >
            <Typography
              sx={fontFamilyAbyssinica}
              fontSize="17px"
              fontWeight="bold"
            >
              Category: {Category[product.category]}
            </Typography>

            <Typography
              sx={fontFamilyAbyssinica}
              fontSize="16px"
              marginTop="5%"
              fontWeight="bold"
            >
              Color: {Color[product.color]}
            </Typography>

            <Typography
              sx={fontFamilyAbyssinica}
              fontSize="17px"
              marginTop="5%"
            >
              {product.price}
            </Typography>

            <FormControl style={{ marginTop: "15%", width: "100%" }}>
              <InputLabel
                id="demo-simple-select-label"
                color="secondary"
                sx={fontFamilyAbyssinica}
              >
                Size
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value=""
                label="Size"
                sx={fontFamilyAbyssinica}
                color="secondary"
                style={{ color: "pink" }}
                //   onChange={handleChange}
              >
                <MenuItem
                  value={10}
                  style={{ fontSize: "12px" }}
                  sx={fontFamilyAbyssinica}
                >
                  S ({product.quantityS || 0})
                </MenuItem>
                <MenuItem
                  value={20}
                  style={{ fontSize: "12px" }}
                  sx={fontFamilyAbyssinica}
                >
                  M ({product.quantityM || 0})
                </MenuItem>
                <MenuItem
                  value={30}
                  style={{ fontSize: "12px" }}
                  sx={fontFamilyAbyssinica}
                >
                  XL ({product.quantityXl || 0})
                </MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              startIcon={<LocalMallIcon />}
              style={{
                background: "black",
                marginTop: "5%",
                width: "100%",
              }}
            >
              Add
            </Button>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
}
