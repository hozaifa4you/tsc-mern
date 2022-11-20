import React from "react";
import {
   Container,
   Grid,
   Typography,
   useTheme,
   Theme,
   styled,
   Button,
} from "@mui/material";

const TopImage = styled("img")(({ theme }) => ({
   width: "350px",
   [theme.breakpoints.down("sm")]: {
      width: "220px",
   },
}));

const GridStyled = styled(Grid)(({ theme }) => ({
   [theme.breakpoints.down("lg")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      paddingTop: "60px",
      paddingBottom: "60px",
   },
   [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
   },
}));

const TypoStyled = styled(Typography)(({ theme }) => ({
   [theme.breakpoints.down("md")]: {
      fontSize: "25px",
   },
}));

const TextStyled = styled(Typography)(({ theme }) => ({
   [theme.breakpoints.down("md")]: {
      fontSize: "16px",
   },
}));

const ProjectTop = () => {
   const theme: Theme = useTheme();

   return (
      <div
         style={{
            width: "100%",
            paddingTop: "30px",
            overflow: "hidden",
         }}
      >
         <Container maxWidth="lg">
            <Grid container spacing={1}>
               <GridStyled item xs={12} sm={12} md={6}>
                  <TypoStyled
                     fontFamily="Poppins"
                     variant="h4"
                     fontWeight="600"
                     color={theme.palette.grey[900]}
                     sx={{
                        textAlign: {
                           xs: "center",
                           sm: "center",
                           md: "start",
                        },
                     }}
                  >
                     Private Projects Manager
                  </TypoStyled>
                  <TextStyled
                     sx={{
                        textAlign: {
                           xs: "center",
                           sm: "center",
                           md: "start",
                        },
                     }}
                     variant="h6"
                     color={theme.palette.grey[600]}
                     fontFamily="Josefin Sans"
                  >
                     Manage your project authentically
                  </TextStyled>
                  <Button
                     variant="outlined"
                     color="primary"
                     size="large"
                     sx={{ marginTop: 2 }}
                  >
                     Explore Projects
                  </Button>
               </GridStyled>
               <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  sx={{
                     width: "100%",
                     display: {
                        xs: "none",
                        sm: "none",
                        md: "flex",
                     },
                     flexDirection: "column",
                     alignItems: "center",
                     justifyContent: "center",
                  }}
               >
                  <TopImage
                     src="/project-top.svg"
                     alt="dev-project"
                     loading="lazy"
                  />
               </Grid>
            </Grid>
         </Container>
      </div>
   );
};

export default ProjectTop;
