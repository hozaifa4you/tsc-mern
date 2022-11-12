// import { useState } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";
import { IconButton as IconButtonJoy, Badge } from "@mui/joy";
import {
   Menu as MenuIcon,
   AccountCircle,
   Mail,
   Notifications,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";

import { NavbarMenu } from "../components";

const Navbar = () => {
   const navigate = useNavigate();

   return (
      <>
         <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="inherit">
               <Toolbar>
                  <IconButton
                     size="large"
                     edge="start"
                     color="inherit"
                     aria-label="open drawer"
                     sx={{
                        mr: 2,
                        display: {
                           md: "none",
                        },
                     }}
                  >
                     <MenuIcon />
                  </IconButton>
                  <img
                     src="logo.png"
                     alt="logo"
                     width={50}
                     style={{ cursor: "pointer" }}
                     onClick={() => navigate("/")}
                  />
                  <Typography
                     variant="h6"
                     noWrap
                     component="div"
                     color="primary"
                     sx={{
                        display: { cursor: "pointer" },
                     }}
                     fontFamily="Josefin Slab"
                     fontWeight="bold"
                     textTransform="uppercase"
                     onClick={() => navigate("/")}
                  >
                     Dev Projects
                  </Typography>

                  <Box sx={{ flexGrow: 1 }} />
                  <Box sx={{ flexGrow: 1 }} />
                  {/* TODO Tabs */}
                  <NavbarMenu />

                  <Box sx={{ flexGrow: 1 }} />
                  <Box
                     sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                     }}
                  >
                     <CssVarsProvider>
                        <Badge
                           color="info"
                           size="sm"
                           variant="solid"
                           badgeContent={10}
                        >
                           <IconButtonJoy
                              variant="outlined"
                              size="sm"
                              color="primary"
                           >
                              <Mail />
                           </IconButtonJoy>
                        </Badge>
                     </CssVarsProvider>

                     <CssVarsProvider>
                        <Badge
                           color="warning"
                           size="sm"
                           variant="solid"
                           badgeContent={9}
                        >
                           <IconButtonJoy
                              variant="outlined"
                              size="sm"
                              color="primary"
                           >
                              <Notifications />
                           </IconButtonJoy>
                        </Badge>
                     </CssVarsProvider>
                     <CssVarsProvider>
                        <IconButtonJoy
                           variant="outlined"
                           size="sm"
                           color="primary"
                        >
                           <AccountCircle />
                        </IconButtonJoy>
                     </CssVarsProvider>
                  </Box>
               </Toolbar>
            </AppBar>
         </Box>
      </>
   );
};

export default Navbar;
