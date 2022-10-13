import React from 'react'
import IconLink from './IconLink';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function CartIcon() {
  return (
    <IconLink
        href="/api/cart"
        linkName=""
        icon={<ShoppingCartIcon />}
        count={2}
      />
  )
}
