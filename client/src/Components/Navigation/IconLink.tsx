import { Badge, IconButton, MenuItem, SvgIconProps } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface IconLinkProps {
  href: string;
  linkName: string;
  count: number;
  icon: React.ReactElement<SvgIconProps>;
}

export default function FavoritesIconLink({
  href,
  count,
  icon,
  linkName,
}: IconLinkProps) {
  return (
    <MenuItem>
      <Link to={href}>
        <IconButton
          size="large"
          aria-label="favorite"
          color="primary"
          style={{ color: "#616161",marginRight:"5px" }}
        >
          <Badge
            badgeContent={count}
            sx={{ "& .MuiBadge-badge": { background: "#C6ADCA" } }}
          >
            {icon}
          </Badge>
        </IconButton>
      </Link>
      <p>{linkName}</p>
    </MenuItem>
  );
}
