import { useEffect } from "react";
import {
   TextField,
   Button as ButtonJoy,
   Alert,
   Button,
   IconButton,
} from "@mui/joy";
import {
   Container,
   Grid,
   Typography,
   useTheme,
   Theme,
   styled,
   Divider,
   Paper,
   Box,
} from "@mui/material";
import { AddTask, Close, Info, Search } from "@mui/icons-material";
import { Helmet } from "react-helmet";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { ProjectTop, ProjectCard2, Loader } from "../components";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
   selectProjects,
   IProjects,
   fetchProjects,
} from "../redux/reducer/projectsSlice";
import { STATUS } from "../redux/STATUS";

const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: "#fff",
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: "center",
   color: theme.palette.text.secondary,
}));

const Projects = () => {
   const theme: Theme = useTheme();
   const dispatch = useAppDispatch();
   const navigate: NavigateFunction = useNavigate();
   const { projects, status } = useAppSelector(selectProjects);

   console.log(projects);

   useEffect(() => {
      console.log("useEffect checked -> Home");

      if (projects === null) {
         dispatch(fetchProjects());
      }
   }, [projects, dispatch]);

   if (status === STATUS.LOADING) return <Loader />;

   return (
      <div>
         <Helmet>
            <title>Projects - Dev Projects</title>
         </Helmet>
         {/* TODO project top */}
         <ProjectTop />

         <Divider />
         <Container
            maxWidth="xl"
            sx={{ marginTop: "40px", flexGrow: 1 }} // FIXME should be remove
         >
            <Grid container spacing={2}>
               <Grid
                  item
                  sx={{
                     [theme.breakpoints.down("md")]: {
                        display: "none",
                     },
                  }}
                  md={3}
               >
                  <Item>xs=Side Bar</Item>
               </Grid>
               <Grid item xs={12} sm={12} md={9}>
                  <Box mb={3}>
                     <Grid container spacing={1} justifyContent="center">
                        <Grid item xs={12} sm={8}>
                           <TextField
                              size="md"
                              fullWidth
                              placeholder="Search for a perfect project..."
                              startDecorator={<Search color="primary" />}
                              endDecorator={
                                 <ButtonJoy
                                    size="sm"
                                    variant="outlined"
                                    color="info"
                                    startDecorator={
                                       <AddTask fontSize="small" />
                                    }
                                    onClick={() => navigate("/projects/create")}
                                 >
                                    Create One
                                 </ButtonJoy>
                              }
                           />
                        </Grid>
                     </Grid>
                  </Box>
                  <Typography variant="h6" my={1}>
                     Projects
                  </Typography>

                  <Grid container spacing={5} mb={5}>
                     {projects && projects?.length > 0 ? (
                        projects?.map((project: IProjects, index: number) => (
                           <Grid item xs={12} sm={6} key={index}>
                              <ProjectCard2 project={project} />
                           </Grid>
                        ))
                     ) : (
                        <Grid
                           item
                           xs={12}
                           display="flex"
                           justifyContent="center"
                        >
                           <Box sx={{ width: "73%" }}>
                              <Alert
                                 startDecorator={<Info sx={{ mx: 0.5 }} />}
                                 variant="soft"
                                 color="info"
                                 endDecorator={
                                    <>
                                       <Button
                                          variant="soft"
                                          color="info"
                                          sx={{ mr: 1 }}
                                       >
                                          Undo
                                       </Button>
                                       <IconButton
                                          variant="soft"
                                          size="sm"
                                          color="info"
                                       >
                                          <Close />
                                       </IconButton>
                                    </>
                                 }
                              >
                                 <Typography color="danger" fontWeight="md">
                                    Project Not found!, Please create some
                                    project first!
                                 </Typography>
                              </Alert>
                           </Box>
                        </Grid>
                     )}
                  </Grid>
               </Grid>
            </Grid>
         </Container>
      </div>
   );
};

export default Projects;
