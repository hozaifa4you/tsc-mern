import {
   Grid,
   Container,
   Typography,
   Box,
   useTheme,
   Divider,
} from "@mui/material";
import {
   Info,
   ScheduleSend,
   AlternateEmail,
   Verified,
   Home,
   SupportAgent,
   Mail,
   PrivacyTip,
   Policy,
   BuildCircle,
} from "@mui/icons-material";
import { TextField } from "@mui/joy";
import { useLocation, Location } from "react-router-dom";

import { SingleListItem, SocialNavigator, Logo } from "../components";

const Footer = () => {
   const theme = useTheme();
   const location: Location = useLocation();

   const { pathname } = location;

   console.log(pathname === "/login");

   return (
      <Box
         style={{
            width: "100%",
            height: "auto",
            background: "#fff",
            color: theme.palette.grey[600],
         }}
      >
         {/* FIXME start */}
         {pathname !== "/login" ? (
            <>
               <Divider />
               <Container maxWidth="xl" sx={{ py: 6 }}>
                  <Grid container spacing={2}>
                     <Grid item xs={12} sm={6} md={3}>
                        <TextField
                           fullWidth
                           startDecorator={<AlternateEmail />}
                           endDecorator={<ScheduleSend />}
                           placeholder="Enter Email Address"
                           color="primary"
                           size="lg"
                           type="email"
                        />
                     </Grid>
                     {/* TODO grid 2 */}
                     <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                        }}
                     >
                        <Box
                           component="ul"
                           sx={{
                              listStyle: "none",
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                           }}
                        >
                           <li>
                              <SingleListItem
                                 icon={
                                    <Home color="primary" fontSize="small" />
                                 }
                                 title="Home"
                              />
                           </li>
                           <li>
                              <SingleListItem
                                 icon={
                                    <Verified
                                       color="primary"
                                       fontSize="small"
                                    />
                                 }
                                 title="Feature"
                              />
                           </li>
                           <li>
                              <SingleListItem
                                 icon={
                                    <SupportAgent
                                       color="primary"
                                       fontSize="small"
                                    />
                                 }
                                 title="Services"
                              />
                           </li>
                           <li>
                              <SingleListItem
                                 icon={
                                    <Info color="primary" fontSize="small" />
                                 }
                                 title="About Us"
                              />
                           </li>
                        </Box>
                     </Grid>
                     <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                        }}
                     >
                        <SocialNavigator />
                     </Grid>
                  </Grid>
               </Container>
            </>
         ) : null}

         {/* FIXME: end */}
         <Divider />
         <Container maxWidth="xl" sx={{ pt: 3, pb: 6 }}>
            <Grid container spacing={2}>
               <Grid item xs={12} sm={12} md={4}>
                  <Box
                     component="ul"
                     sx={{
                        listStyle: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1.2,
                     }}
                  >
                     <li>
                        <SingleListItem
                           icon={<Policy color="primary" fontSize="small" />}
                           title="Policy"
                        />
                     </li>
                     <li>
                        <SingleListItem
                           icon={
                              <PrivacyTip color="primary" fontSize="small" />
                           }
                           title="Privacy"
                        />
                     </li>
                     <li>
                        <SingleListItem
                           icon={<Mail color="primary" fontSize="small" />}
                           title="Contact"
                        />
                     </li>
                     <li>
                        <SingleListItem
                           icon={
                              <BuildCircle color="primary" fontSize="small" />
                           }
                           title="Dev Contact"
                        />
                     </li>
                  </Box>
               </Grid>
               <Grid item sm={12} md={4}>
                  <Box
                     display="flex"
                     alignItems="center"
                     justifyContent="center"
                  >
                     <Logo />
                  </Box>
               </Grid>
               <Grid
                  item
                  sm={12}
                  md={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
               >
                  <Typography variant="body2" fontFamily="Josefin Sans">
                     ©️{new Date().getFullYear()}, All Right Reserves.
                  </Typography>
               </Grid>
            </Grid>
         </Container>
      </Box>
   );
};

export default Footer;
