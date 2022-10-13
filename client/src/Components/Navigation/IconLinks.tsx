import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuItemLink from "./MenuItemLink";
import { Divider } from "@mui/material";
import FavoriteIconLink from "./FavoriteIcon";
import CartIcon from "./CartIcon";

interface IconLinksProps {
  isLoggedIn: boolean;
}

export default function IconBtnNavigation({ isLoggedIn }: IconLinksProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <CartIcon />
      {isLoggedIn ? <FavoriteIconLink /> : ""}

      <MenuItem
        onClick={handleProfileMenuOpen}
        style={{ color: "rgb(97, 97, 97)" }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
          <AccountCircle
            style={{
              marginRight: "5px",
              marginLeft: "5px",
            }}
          />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLoggedIn ? (
        <>
          <MenuItemLink
            href="/api/my-profile"
            linkName="My Profile"
            handleMenuClose={handleMenuClose}
          />
          <MenuItemLink
            href="/api/logout"
            linkName="Logout"
            handleMenuClose={handleMenuClose}
          />
        </>
      ) : (
        <MenuItemLink
          href="/api/login"
          linkName="Login"
          handleMenuClose={handleMenuClose}
        />
      )}
    </Menu>
  );

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <CartIcon />
        <Divider orientation="vertical" flexItem />
        {isLoggedIn ? <FavoriteIconLink /> : ""}
        <Divider orientation="vertical" flexItem />

        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
        >
          <AccountCircle
            style={{ color: "#616161", marginRight: "5px", marginLeft: "5px" }}
          />
        </IconButton>
        {renderMobileMenu}
        {renderMenu}
      </Box>

      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon style={{ color: "rgb(97, 97, 97)" }} />
        </IconButton>
      </Box>
    </>
  );
}
