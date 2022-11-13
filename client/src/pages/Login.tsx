import { useState, SyntheticEvent } from "react";
import { Link, useNavigate, NavigateFunction } from "react-router-dom";
import { Facebook, Lock, Mail, PermPhoneMsg } from "@mui/icons-material";
import {
   Box,
   Button,
   CssBaseline,
   Grid,
   TextField,
   Typography,
   styled,
   FormControlLabel,
   Checkbox,
} from "@mui/material";

import { Svg } from "../components";
import { useAppDispatch } from "../app/hooks";
import { login } from "../redux/reducer/authenticationSlice";

const LoginContainer = styled(Grid)(({ theme }) => ({
   background: "#fff",
   zIndex: 2,
   margin: "15px",
   padding: "28px",
   [theme.breakpoints.up("lg")]: {
      width: "475px",
   },
   [theme.breakpoints.down("lg")]: {
      width: "400px",
   },
}));

const Login = () => {
   const [username, setUsername] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [usernameError, setUsernameError] = useState<string>("");
   const [passError, setPassError] = useState<string>("");
   const navigate: NavigateFunction = useNavigate();
   const dispatch = useAppDispatch();

   // TODO submit handler
   const submitHandler = (event: SyntheticEvent): void => {
      event.preventDefault();
      if (!username) {
         setUsernameError("username is required");
      }
      if (!password) {
         setPassError("Password is required");
      }
      if (usernameError || passError) {
         return;
      }

      const postData = { username, password };
      dispatch(login(postData));
   };

   return (
      <Grid
         container
         component="main"
         sx={{ height: "calc(100vh - 100px)" }}
         justifyContent="center"
         alignItems="center"
         position="relative"
         overflow="hidden"
      >
         <CssBaseline />

         <div
            style={{
               position: "absolute",
               left: 0,
               top: 175,
               filter: "blur(10px)",
               zIndex: 1,
            }}
         >
            <Svg />
         </div>

         {/* {error && enqueueSnackbar("This is error")} */}

         <LoginContainer item boxShadow="rgb(0 0 0 / 8%) 0px 1px 4px">
            <Box
               display="flex"
               justifyContent="space-between"
               alignItems="center"
               mb={2}
            >
               <Typography component="h2" variant="h6">
                  Login
               </Typography>
               <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
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
                  <img src="logo.png" alt="dev-project-logo" width={50} />
               </Box>
            </Box>

            <Box component="form" onSubmit={submitHandler}>
               <TextField
                  margin="normal"
                  fullWidth
                  id="username"
                  label="Username*"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => {
                     setUsername(e.target.value);
                     if (username) {
                        setUsernameError("");
                     }
                  }}
                  type="text"
                  error={usernameError ? true : false}
                  helperText={usernameError && usernameError}
               />
               <Typography variant="caption" color="text.secondary">
                  Username as username, phone number or email address
               </Typography>

               <TextField
                  margin="normal"
                  fullWidth
                  id="password"
                  label="Password*"
                  name="password"
                  autoComplete="password"
                  autoFocus
                  value={password}
                  onChange={(e) => {
                     setPassword(e.target.value);
                     if (password) {
                        setPassError("");
                     }
                  }}
                  type="password"
                  error={passError ? true : false}
                  helperText={passError && passError}
               />
               <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  my={2}
               >
                  <FormControlLabel
                     value="end"
                     control={<Checkbox sx={{ fontSize: 12 }} />}
                     label="Keep me sign in"
                     labelPlacement="end"
                  />
                  <Link
                     to="/forgot-password"
                     style={{ textDecoration: "none", fontSize: "14px" }}
                  >
                     Forgot password?
                  </Link>
               </Box>
               <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  type="submit"
                  size="large"
                  startIcon={<Lock />}
               >
                  Login
               </Button>
            </Box>

            <Box>
               {/* NOTE header */}

               <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  my={3}
               >
                  <div
                     style={{ flexGrow: 1, height: "1px", background: "gray" }}
                  />
                  <Typography
                     variant="caption"
                     flexGrow={0.1}
                     textAlign="center"
                     color="GrayText"
                     fontSize={13}
                     component="h4"
                  >
                     Contact Us
                  </Typography>
                  <div
                     style={{ flexGrow: 1, height: "1px", background: "gray" }}
                  />
               </Box>
               {/* NOTE body */}
               <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={3}
               >
                  <Button
                     type="button"
                     variant="outlined"
                     startIcon={<PermPhoneMsg />}
                     color="secondary"
                  >
                     Phone
                  </Button>
                  <Button
                     type="button"
                     variant="outlined"
                     startIcon={<Mail />}
                     color="error"
                  >
                     Email
                  </Button>
                  <Button
                     type="button"
                     variant="outlined"
                     startIcon={<Facebook />}
                     color="success"
                  >
                     Facebook
                  </Button>
               </Box>
            </Box>
         </LoginContainer>
      </Grid>
   );
};

export default Login;
