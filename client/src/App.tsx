import { Container } from "@mui/material";
import React from "react";
import {
  Outlet,
} from "react-router-dom";
import Footer from "./Components/Footer";
import Navigation from "./Components/Navigation/Navigation";



export default function App() {
  return (
    <>
      <Container maxWidth="lg">
        <Navigation />
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
