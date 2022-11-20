import { useEffect } from "react";
import { Helmet } from "react-helmet";
import {
   Container,
   Grid,
   Typography,
   useTheme,
   Theme,
   Box,
   Divider,
} from "@mui/material";
import { Button, Typography as TypographyJoy } from "@mui/joy";
import { MoreVert } from "@mui/icons-material";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { ProjectCard, Loader } from "../components";
import {
   selectProjects,
   fetchProjects,
   IProjects,
} from "../redux/reducer/projectsSlice";
import { STATUS } from "../redux/STATUS";
// import { Divider } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
   const theme: Theme = useTheme();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

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
            <Box
               display="flex"
               alignItems="center"
               justifyContent="space-between"
            >
               <Box>
                  <TypographyJoy level="h5"> Resent Projects</TypographyJoy>
                  <Typography
                     color={theme.palette.grey[500]}
                     fontFamily="Roboto"
                     fontSize={14}
                     mt={1}
                     mb={1}
                     fontWeight="400"
                  >
                     Only you can see there public close & private projects but
                     you can't see there the secret projects.
                  </Typography>
               </Box>
               <Box ml="auto">
                  <Button
                     variant="soft"
                     endDecorator={<MoreVert fontSize="small" />}
                     onClick={() => navigate("/projects")}
                  >
                     Show More
                  </Button>
               </Box>
            </Box>
            <Divider />
            <Grid container spacing={3} mb={5}>
               {projects &&
                  projects?.length > 0 &&
                  projects
                     ?.slice(0, 8)
                     ?.map((project: IProjects, index: number) => (
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
