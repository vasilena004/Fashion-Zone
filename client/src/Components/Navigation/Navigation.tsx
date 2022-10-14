import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationLink from "./NavigationLink";
import IconBtnNavigation from "./IconLinks";
import { Menu } from "@mui/material";
import MenuItemLink from "./MenuItemLink";
import { cookies } from "../Authentication/Login";

const Navbar = () => {
  let token = cookies.get("token");
  const [isLoggedIn, setLoggedIn] = React.useState<boolean>(
    token ? true : false
  );

  React.useEffect(() => {
    token = cookies.get("token");
    console.log(isLoggedIn);
    setLoggedIn(token ? true : false);
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl" style={{ background: "white" }}>
          <Toolbar disableGutters>
            <AdbIcon
              sx={{
                display: { xs: "none", md: "flex", color: "rgb(97, 97, 97)" },
                mr: 1,
              }}
            />

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none", color: "rgb(97, 97, 97)" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItemLink
                  href="/api/"
                  linkName="Home"
                  handleMenuClose={handleCloseNavMenu}
                />
                <MenuItemLink
                  href="/api/products"
                  linkName="Products"
                  handleMenuClose={handleCloseNavMenu}
                />
              </Menu>
            </Box>
            <AdbIcon
              sx={{
                display: { xs: "flex", md: "none", color: "rgb(97, 97, 97)" },
                mr: 1,
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "rgb(97, 97, 97)",
                textDecoration: "none",
              }}
            >
              MySite
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <NavigationLink linkName="Home" href="/api/" />
              <NavigationLink linkName="Products" href="/api/products" />
            </Box>
            <IconBtnNavigation isLoggedIn={isLoggedIn} />
          </Toolbar>
        </Container>
      </AppBar>

      {/* <Routes>
        <Route>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />

              <Route path="/my-profile" element={<ProtectedRoute />} >
                 <Route path="/my-profile" element={<MyProfile />} />
              </Route>
            
          <Route path="/login" element={<Login />} />
          <Route path="/favorite" element={<Favorite />} />

          <Route path="/register" element={<Register />} />

          {/* <Route path="/users" element={<Users />}>
            <Route path="userId" element={<User />} />
          </Route> */}

      {/* <Route path="/orders:userId" element={<Orders />}>
            <Route path="userId" element={<User />} />
          </Route> */}
      {/* <Route path="/favorites" element={<Favorites />} /> */}
      {/* </Route>
      </Routes>  */}
    </>
  );
};
export default Navbar;
