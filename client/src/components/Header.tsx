import { useState, MouseEvent } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";
import {
   IconButton as IconButtonJoy,
   Badge,
   Avatar,
   Tooltip as ToolTipJoy,
   Button as ButtonJoy,
} from "@mui/joy";
import {
   Menu as MenuIcon,
   AccountCircle,
   Mail,
   Notifications,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";

import { NavbarMenu, AccountSettings } from "../components";
import { useAppSelector } from "../app/hooks";
import { selectLogin } from "../redux/reducer/authenticationSlice";

const backend_origin: string = process.env.REACT_APP_BACKEND_URL!;

const Navbar = () => {
   const navigate = useNavigate();
   const { isAuth, token, user } = useAppSelector(selectLogin);
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

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

                     {isAuth && token && user ? (
                        <>
                           <ToolTipJoy
                              title="Account settings"
                              color="primary"
                              size="sm"
                           >
                              <IconButton
                                 onClick={handleClick}
                                 size="small"
                                 aria-controls={
                                    open ? "account-menu" : undefined
                                 }
                                 aria-haspopup="true"
                                 aria-expanded={open ? "true" : undefined}
                              >
                                 <CssVarsProvider>
                                    <Avatar
                                       size="sm"
                                       variant="outlined"
                                       color="primary"
                                       src={
                                          user?.avatar === "avatar.png"
                                             ? "/avatar.png"
                                             : `${backend_origin}/public/avatars/${user?.avatar}`
                                       }
                                       sx={{ cursor: "pointer" }}
                                    />
                                 </CssVarsProvider>
                              </IconButton>
                           </ToolTipJoy>
                           <AccountSettings
                              anchorEl={anchorEl}
                              handleClose={handleClose}
                              open={open}
                           />
                        </>
                     ) : (
                        <ButtonJoy
                           variant="outlined"
                           color="primary"
                           onClick={() => navigate("/login")}
                           size="sm"
                           startDecorator={<AccountCircle />}
                        >
                           Login
                        </ButtonJoy>
                     )}
                  </Box>
               </Toolbar>
            </AppBar>
         </Box>
      </>
   );
};

export default Navbar;
