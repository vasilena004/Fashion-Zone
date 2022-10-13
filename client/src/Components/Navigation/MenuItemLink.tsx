import { Badge, IconButton, MenuItem, SvgIconProps } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface MenuLinkProps {
  href: string;
  linkName: string;
  handleMenuClose: ()=>void;
}

export default function MenuItemLink({href,linkName,handleMenuClose}:MenuLinkProps) {
  return (
    <Link to={href} style={{textDecoration:"none"}}>
    <MenuItem onClick={()=>handleMenuClose()} href="/my-profile">
       {linkName}
    </MenuItem>
  </Link>
  )
}
