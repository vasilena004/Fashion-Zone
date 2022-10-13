import {  NavLink } from "react-router-dom";
import React from "react";
import "./NavigationLink.css";
import { Button, Link } from "@mui/material";

interface LinkProps {
  linkName: string;
  href: string;
  isUser?: boolean;
}

export default function NavigationLink({
  linkName,
  href,
  isUser = false,
}: LinkProps) {
  return (
    <NavLink to={href}>
      {({ isActive }) => (
        <Button
          className={isActive ? "navigationLink" : undefined}
          style={{
              color: "#69696A",
              fontSize: "15px",
              background: "white",
              padding: "15px",
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              marginLeft: "8px"
          }}
        >
          {linkName}
        </Button>
      )}
    </NavLink>
  );
}
