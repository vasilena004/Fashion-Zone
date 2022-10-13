import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";

const BannerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  fleWrap:"wrap",
  flexDirection:"column",
  background: "#E7E7E7",
  position:"relative",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const BannerContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxWidth: "100%",
  paddding: "30px",
}));

const BannerTypography = styled(Typography)(({ theme }) => ({
  lineHeight: 1.5,
  fontSize: "52px",
  textAlign:"center",
  fontFamily: "'Abyssinica SIL', sans-serif",
  [theme.breakpoints.down("md")]: {
    fontSize: "42px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "22px",
  },
}));

const BannerDescription = styled(Typography)(({ theme }) => ({
  lineHeight: 1.5,
  marginBottom: "3em",
  letterSpacing: 1.25,
  [theme.breakpoints.down("md")]: {
    marginBottom: "1.5em",
    letterSpacing: 1.15,
  },
}));

const BannerImage = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  width: "100%",
  height:"530px",
  [theme.breakpoints.down("md")]: {
    height: "25%",
  },
}));

const BannerTextBox=styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  height: "30%",
  padding: "7px 25px 7px 25px",
  background: "white",
  left: "35%"
}));

const messages = ["Summer sale", "Message 1", "Message 2"];

const PromotionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px 0px 20px 0px",
  overflow:"hidden",
  background: "#C6ADCA",
}));

const PromotionMessage = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montez', cursive",
  color: "white",
  fontSize: "1.7rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
}));

export default function Home() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);

    const intervalId = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);

      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 3000);

    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <BannerContainer>
        <BannerImage src="https://satine.qodeinteractive.com/wp-content/uploads/2017/08/h2-slajder-1.jpg"></BannerImage>
         <BannerTextBox>
           <BannerTypography variant="h6">
              Fashion Zone
           </BannerTypography>
         </BannerTextBox>
        {/* <BannerContent>
          <BannerTypography variant="h6">Fashion Site</BannerTypography>
          <BannerDescription variant="subtitle1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi animi
            asperiores magnam quam ducimus a iure voluptatum tempora
            perspiciatis aliquam, tempore obcaecati ab consequuntur tenetur
            soluta error nulla dolores excepturi.
          </BannerDescription>
        </BannerContent> */}
      </BannerContainer>
      <PromotionContainer>
        <Slide direction={show?"left":"right"} in={show} timeout={{enter:500,exit:100}}>
          <PromotionMessage>{messages[messageIndex]}</PromotionMessage>
        </Slide>
      </PromotionContainer>
    </>
  );
}
