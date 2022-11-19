import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Container, Grid, Typography, useTheme, Theme } from "@mui/material";
import { Typography as TypographyJoy } from "@mui/joy";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { ProjectCard, Loader } from "../components";
import {
   selectProjects,
   fetchProjects,
   IProjects,
} from "../redux/reducer/projectsSlice";
import { STATUS } from "../redux/STATUS";

const Home = () => {
   const theme: Theme = useTheme();
   const dispatch = useAppDispatch();
   const { projects, status } = useAppSelector(selectProjects);

   useEffect(() => {
      console.log("useEffect checked -> Home");
      if (!projects || !projects.length) {
         dispatch(fetchProjects());
      }
   }, [projects, dispatch]);

   if (status === STATUS.LOADING) return <Loader />;

   return (
      <>
         <Helmet>
            <title>Home - Dev Projects</title>
         </Helmet>
         <Container maxWidth="xl" sx={{ mt: 2.5 }}>
            <TypographyJoy level="h4"> All Projects</TypographyJoy>
            <Typography
               color={theme.palette.grey[500]}
               fontFamily="Josefin Slab"
               fontSize={18}
               marginY={2}
            >
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi,
               ullam.
            </Typography>
            <Grid container spacing={3}>
               {projects &&
                  projects.length > 0 &&
                  projects?.map((project: IProjects, index: number) => (
                     <Grid item sm={12} md={4} xl={3} key={index}>
                        <ProjectCard project={project} />
                     </Grid>
                  ))}
            </Grid>
         </Container>
      </>
   );
};

export default Home;
