import Box from "@mui/material/Box";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import {
  CssBaseline,
  Typography,
  Avatar,
  Container,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInputField from "../Authentication/TextInputField";
import { Category, Sizes, Color, Product } from "../../model/Product";
import { useState } from "react";
import { ProductApi } from "../../services/product-service";

interface FormData {
  productName: string;
  productCode: string;
  color: Color;
  price: number;
  imageUrl: string;
  category: Category;
  description?: string;
  quantityS?: number;
  quantityM?: number;
  quantityL?: number;
  quantityXL?: number;
}

const radioBtnStyle = {
  color: "rgb(71, 11, 81)",
  "&.Mui-checked": {
    color: "rgb(71, 11, 81)",
  },
};

const schema = yup
  .object({
    productName: yup
      .string()
      .required("Product Name is required")
      .min(2)
      .max(20),
    productCode: yup.string().required("Product Code is required").max(12),
    price: yup.number().required().positive(),
    imageUrl: yup.string().required().url(),
    description: yup.string().max(350),
    quantityS: yup
      .number()
      .typeError("Quantity must be number")
      .notRequired()
      .nullable(true)
      .positive("Quantity must have positive value"),
    quantityM: yup
      .number()
      .typeError("Quantity must be number")
      .notRequired()
      .nullable(true)
      .positive("Quantity must have positive value"),
    quantityL: yup
      .number()
      .typeError("Quantity must be number")
      .nullable(true)
      .notRequired()
      .positive("Quantity must have positive value"),
    quantityXL: yup
      .number()
      .typeError("Quantity must be number")
      .nullable(true)
      .notRequired()
      .positive("Quantity must have positive value"),
  })
  .required();

export default function ProductForm() {
  const navigate = useNavigate();

  const [color, setColor] = useState<string>("");
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [categoryIndex, setCategoryIndex] = useState<number>(0);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const addProduct = async (product: FormData) => {
    // product.color = { key: color, value: colorIndex } as unknown as Color;
    // product.category = {
    //   key: category,
    //   value: categoryIndex,
    // } as unknown as Category;

    await ProductApi.create(
      new Product(
        undefined,
        product.productName,
        product.productCode,
        colorIndex,
        product.price,
        product.imageUrl,
        categoryIndex, 
        product.description,
        product.quantityS,
        product.quantityM,
        product.quantityL,
        product.quantityXL
      )
    );
    navigate("/api/products");
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" style={{ marginTop: "2%", marginBottom: "7%" }}>
        <Box
          component="form"
          onSubmit={handleSubmit(addProduct)}
          sx={{
            "& .MuiTextField-root": { m: 1 },
            maxWidth: "md",
            padding: "26px",
            textAlign: "center",
            borderRadius: "30px",
            boxShadow: "0 0 2em hsl(231deg 68% 100%)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "center",
            backgroundColor: "#F3F1F3",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            fontFamily="Abyssinica SIL, serif"
            letterSpacing="2px"
            fontSize="28px"
          >
            Add Product
          </Typography>

          <Avatar>
            <HowToRegIcon style={{ color: "rgb(71, 11, 81)" }} />
          </Avatar>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            <TextInputField
              name="productName"
              control={control}
              label="Product Name*"
              error={errors.productName?.message}
            />

            <TextInputField
              name="productCode"
              control={control}
              label="Product Code*"
              error={errors.productCode?.message}
            />

            <TextInputField
              name="price"
              control={control}
              label="Price*"
              error={errors.price?.message}
            />

            <TextInputField
              name="imageUrl"
              control={control}
              label="Image Url*"
              error={errors.imageUrl?.message}
            />

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="select-color">Color</InputLabel>
              <Select
                labelId="select-color"
                id="select-color"
                value={color}
                label="Color"
              >
                {Object.keys(Color)
                  .filter((v) => isNaN(Number(v)))
                  .map((k: string, index = 0) => {
                    if (k in Color) {
                      return (
                        <MenuItem
                          onClick={() => {
                            setColor(k); setCategoryIndex(index);
                          }}
                          key={index}
                          value={k}
                        >
                          {Color[index]}
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="select-category">Category</InputLabel>
              <Select
                labelId="select-category"
                id="select-category"
                value={category}
                label="Color"
              >
                {Object.keys(Category)
                  .filter((v) => isNaN(Number(v)))
                  .map((k, index = 0) => {
                    if (k in Category) {
                      return (
                        <MenuItem
                          onClick={() => {
                            setCategory(k); setCategoryIndex(index);
                          }}
                          key={index}
                          value={k}
                        >
                          {Category[index]}
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
            </FormControl>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "300px",
                justifyContent: "center",
                marginLeft: "12px",
              }}
            >
              <TextInputField
                name="quantityS"
                control={control}
                label="Quantity-S"
                multiline={true}
                size="44%"
                error={errors.quantityS?.message}
              />
              <TextInputField
                name="quantityM"
                control={control}
                label="Quantity-M"
                multiline={true}
                size="44%"
                error={errors.quantityM?.message}
              />
              <TextInputField
                name="quantityL"
                control={control}
                label="Quantity-L"
                multiline={true}
                size="44%"
                error={errors.quantityL?.message}
              />
              <TextInputField
                name="quantityXL"
                control={control}
                label="Quantity-XL"
                multiline={true}
                size="44%"
                error={errors.quantityXL?.message}
              />
            </Box>

            <TextInputField
              name="description"
              control={control}
              label="Description"
              multiline={true}
              error={errors.description?.message}
            />

            <Button
              variant="contained"
              type="submit"
              disabled={!(isDirty && isValid)}
              size="small"
              style={{
                alignSelf: "center",
                marginTop: "5px",
                backgroundColor: "rgb(71, 11, 81)",
                color: "white",
              }}
            >
              Add
            </Button>
          </div>
        </Box>
      </Container>
    </>
  );
}
