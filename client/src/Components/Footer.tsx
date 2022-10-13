import { Box, Container, Grid, Link, Paper, Typography } from "@mui/material";
import React from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

export default function Footer() {
  return (
      <Box
        paddingTop="20px"
        paddingBottom="30px" 
        color="white"
        position="sticky"
        marginTop="8px"
        style={{
          backgroundImage:
            "url(https://satine.qodeinteractive.com/wp-content/uploads/2017/08/footer-background-img.jpg)",
          opacity: "0.8",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} marginTop="15px">
            <Grid item xs={12} sm={3}>
              <Typography variant="h6">Contact</Typography>
              <Typography variant="body2" marginTop="5px" fontWeight="100">
                If you have any questions and doubts, don't hesitate to contact
                us at any time
              </Typography>

              <Box style={{marginTop:"15px",display:"flex",gap:"10px"}}>
                 <PhoneIphoneIcon />
                 <Typography fontWeight="100" marginTop="4px" fontSize="13px">1-777-777-7744</Typography>
              </Box>

              <Box style={{marginTop:"15px",display:"flex",gap:"10px"}}>
                 <LocationOnIcon />
                 <Typography fontWeight="100" marginTop="4px" fontSize="13px">Street West Sofia, Bulgaria</Typography>
              </Box>

              <Box style={{marginTop:"15px",display:"flex",gap:"10px"}}>
                 <AccessTimeIcon />
                 <Typography fontWeight="100" marginTop="4px" fontSize="13px">Mon - Sun 8.00 - 20.00</Typography>
              </Box>
            </Grid>
            {/* <Grid item xs={12} sm={4}>
          <Box borderBottom={1}>Account</Box>
          <Box>
            <Link href="/" color="inherit">
              Login
            </Link>
          </Box>
          <Box>
            <Link href="/" color="inherit">
              Register
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box borderBottom={1}>Messages</Box>
          <Box>
            <Link href="/" color="inherit">
              Backup
            </Link>
          </Box>
          <Box>
            <Link href="/" color="inherit">
              History
            </Link>
          </Box>
          <Box>
            <Link href="/" color="inherit">
              Roll
            </Link>
          </Box>
        </Grid> */}
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Material UI Workshop &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
  );
}
