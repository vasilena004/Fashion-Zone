import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconLink from "./IconLink";

export default function FavoriteIconLink() {
  return (
    <IconLink
      href="/api/favorites"
      linkName=""
      icon={<FavoriteIcon />}
      count={1}
    />
  );
}
