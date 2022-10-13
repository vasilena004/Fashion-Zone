import React from 'react'
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { IconButton } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';


interface OrderRowProps{
    handleOnClick:()=>void; 
}

export default function OrderRow({handleOnClick}:OrderRowProps) {
  return (
    <TableRow
    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  >
    <TableCell component="th" scope="row">
      1255yhH
    </TableCell>
    <TableCell align="center">25/05/2022</TableCell>
    <TableCell align="center">Finished</TableCell>
    <TableCell align="center">YES</TableCell>
    <TableCell align="center">
      <IconButton
        onClick={handleOnClick}
        component="label"
        style={{color:"rgb(97, 97, 97)"}}
      >
        <ReadMoreIcon />
      </IconButton>
    </TableCell>
  </TableRow>
  )
}
