import {
  Box,
  Typography,
  Link as MuiLink,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Drawer,
  Divider,
  Container,
  IconButton,
  Modal,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import InventoryIcon from "@mui/icons-material/Inventory";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OrderRow from "./OrderRow";
import OrderDetails from "./OrderDetails";

const CustomTypographyLabel = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "#222",
  fontFamily: "'Abyssinica SIL',serif",
}));

const CustomTypographyText = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#222",
  fontFamily: "'Abyssinica SIL',serif",
  marginBottom: "5px",
}));

const EditLink = styled(Link)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: "2%",
  color: "#222",
  fontFamily: "'Abyssinica SIL',serif",
  letterSpacing: "2px",
}));

const Title = styled(Typography)(({ theme }) => ({
  color: "#222",
  fontFamily: "'Abyssinica SIL',serif",
  letterSpacing: "2px",
  textAlign: "center",
  marginTop: "15px",
  fontSize: "28px",
}));

const BoxNavContainer = styled(Box)(({ theme }) => ({
  background: "whitesmoke",
  width: "60%",
  marginTop: "5%",
  [theme.breakpoints.down(700)]: {
    width: "100%",
  },
}));

const MyProfileTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: "2%",
  fontSize: "27px",
}));

const MainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const LeftNavContainer = styled(Box)(({ theme }) => ({
  width: "40%",
  marginTop: "6%",
  [theme.breakpoints.down(700)]: {
    // width: "50%",
    // position: "relative",
    // left: "25%",
    display: "flex",
    alignSelf: "center",
    width: "100%",
  },
  [theme.breakpoints.down(350)]: {
    width: "100%",
    left: "3%",
  },
}));

const RightSideContainer = styled(Box)(({ theme }) => ({
  width: "50%",
  marginTop: "5%",
  [theme.breakpoints.down(700)]: {
    width: "100%",
  },
}));

export default function MyProfile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () =>{
    setOpen(true);
    <OrderDetails/>
  };
  // const handleClose = () => setOpen(false);

  return (
    <Container>
      {/* <MyProfileTitle>My profile</MyProfileTitle> */}
      <MainContainer maxWidth="xl">
        <LeftNavContainer>
          {/* <Typography fontWeight="bold" fontFamily="'Abyssinica SIL',serif">
          peter@abv.bg
        </Typography> */}
          <BoxNavContainer>
            <List>
              <ListItem key="orders" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InventoryIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "15px",
                        fontFamily: "'Abyssinica SIL',serif",
                      },
                    }}
                    primary="My orders"
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem key="settings" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsSuggestIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "15px",
                        fontFamily: "'Abyssinica SIL',serif",
                      },
                    }}
                    primary="Profile settings"
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </BoxNavContainer>
        </LeftNavContainer>

        <RightSideContainer>
        {open?<OrderDetails />:(
          <>
          <Title>My orders</Title>

          <Box style={{ background: "whitesmoke" }} maxWidth="xl">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 550 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Order №</TableCell>
                    <TableCell align="right">Date of creation</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Delivary note</TableCell>
                    <TableCell align="right">More Info</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <OrderRow handleOnClick={handleOpen} />
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          </>
        )}
        </RightSideContainer>

        {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <OrderDetails />
      </Modal> */}

        {/* <RightSideContainer>
          <Title>Settings</Title>
          <Typography fontSize="13px" textAlign="center" marginBottom="15px">
            You can manage your account and subscriptions here
          </Typography>
          <Box
            style={{
              backgroundColor: "#eddcef6b",
              position: "relative",
              paddingLeft: "20px",
              paddingBottom: "10px",
            }}
          >
            <Typography
              paddingTop="5px"
              variant="h6"
              marginBottom="15px"
              fontWeight="bold"
              fontFamily="'Abyssinica SIL',serif"
            >
              My Data
            </Typography>

            <EditLink to={"/register"}>Edit</EditLink>

            <CustomTypographyLabel>Email</CustomTypographyLabel>
            <CustomTypographyText>peter@abv.bg</CustomTypographyText>

            <CustomTypographyLabel>First name</CustomTypographyLabel>
            <CustomTypographyText>Peter</CustomTypographyText>

            <CustomTypographyLabel>Last name</CustomTypographyLabel>
            <CustomTypographyText>Peterson</CustomTypographyText>

            <CustomTypographyLabel>Gender</CustomTypographyLabel>
            <CustomTypographyText>Male</CustomTypographyText>

            <CustomTypographyLabel>Date of birth</CustomTypographyLabel>
            <CustomTypographyText>28/01/2022</CustomTypographyText>
          </Box>
        </RightSideContainer> */}
      </MainContainer>
    </Container>
  );
}
