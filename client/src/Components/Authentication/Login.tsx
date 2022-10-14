import React, { useState } from "react";
import Box from "@mui/material/Box";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import {
  CssBaseline,
  Typography,
  Avatar,
  Container,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextInputField from "./TextInputField";
import { UserApi } from "../../services/user-service";
import Cookies from "react-cookie/cjs/Cookies";

export const cookies = new Cookies();

interface FormData {
  email: string;
  password: string;
}

interface LoginProps {
  // loginUser: (email: string, password: string) => void;
}

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be a valid email"),
    password: yup
      .string()
      .required()
      .matches(/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/, {
        message: "Invalid password",
      }),
  })
  .required();

export default function Login() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    defaultValues: {},
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const login = async (loginData: FormData) => {
    try {
      const user = await UserApi.login(loginData.email, loginData.password);
      cookies.set("token", user.token);
      const savedUser = await UserApi.saveUser(user.user.id);
      console.log("save", savedUser);
      console.log();
      navigate("/api/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" style={{ marginTop: "2%", marginBottom: "7%" }}>
        <Box
          component="form"
          onSubmit={handleSubmit(login)}
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
            Login
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
              name="email"
              control={control}
              label="Email*"
              error={errors.email?.message}
            />
            <TextInputField
              name="password"
              control={control}
              label="Password*"
              type="password"
              error={errors.password?.message}
            />
              <Button
                variant="contained"
                type="submit"
                size="small"
                disabled={!(isDirty && isValid)}
                style={{
                  alignSelf: "center",
                  marginTop: "5px",
                  backgroundColor: "rgb(71, 11, 81)",
                  color: "white",
                }}
              >
                Login
              </Button>

            <Link
              to="/api/register"
              style={{
                marginTop: "5px",
                fontSize: "14px",
                backgroundColor: "#F3F1F3",
                textDecorationColor: "rgb(79, 55, 83)",
                cursor: "pointer",
                color: "rgb(79, 55, 83)",
              }}
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </Box>
      </Container>
    </>
  );
}
