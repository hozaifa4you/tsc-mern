import { useState, useEffect } from "react";
import { Button, Chip, Container, Typography } from "@mui/joy";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Avatar, Box, Divider, Grid, Paper, useTheme } from "@mui/material";

import { API } from "../app/API";
import { EStatus, ProjectType } from "../utils/urls";
import {
   Breadcrumb,
   ProductDetailsPicChart,
   ProductDetailsImageView,
   ProjectDetailsList,
   TimeLine,
} from "../components";
import {
   AccountCircle,
   AddComment,
   AddTask,
   EventAvailable,
   EventRepeat,
   FavoriteBorder,
   FiberManualRecord,
   Insights,
   MarkChatRead,
   PeopleAlt,
   PermMedia,
   Person3,
   PersonAddAlt,
} from "@mui/icons-material";
import { Form, Image, Input } from "antd";

// ["name", "username", "userType", "avatar"]

interface IUserPopulate {
   _id: string;
   name: string;
   username: string;
   userType: string;
   avatar: string;
}

interface IPhotos {
   uid: string | number;
   name: string;
   status: string | "done";
   url: string;
   _id: string;
}

interface ISuggestions {
   _id: string;
   user?: IUserPopulate;
   date?: Date;
   comment?: string;
}

export interface IProject {
   title: string;
   creator: IUserPopulate;
   projectManager: IUserPopulate;
   desc: string;
   photos: IPhotos[];
   instructor: IUserPopulate;
   joined?: IUserPopulate[];
   status: EStatus;
   category: string;
   love?: string[];
   suggestion?: ISuggestions[];
   projectType: ProjectType;
   slug: string;
   readTime: number;
}

interface IProjectResponse {
   success: true;
   project: IProject;
}

const SingleProjectDisplay = () => {
   const [project, setProject] = useState<IProject | null>(null);
   const { slug } = useParams();
   const theme = useTheme();
   const [timeLIneOpen, setTimeLineOpen] = useState<boolean>(false);

   useEffect(() => {
      const fetchProject = async () => {
         const { data } = await API.get<IProjectResponse>(
            `/api/v1/projects/find-projects/${slug}`
         );

         if (data.success) {
            setProject(data.project);
         }
      };
      fetchProject();
   }, [slug]);

   return (
      <div>
         <Helmet>
            <title>
               {project?.title ? project.title : "Project Details"} - Dev
               Project
            </title>
         </Helmet>
         <Container maxWidth="lg" sx={{ mb: 5 }}>
            <Breadcrumb
               finalText="Project Details"
               secondLink="/projects"
               secondText="Projects"
            />

            <Grid container spacing={3} mt={1}>
               <Grid item xs={12}>
                  <Paper>
                     <Grid container>
                        <Grid item sm={12} md={6}>
                           <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              flexDirection="column"
                              p={4}
                           >
                              <Typography
                                 level="h5"
                                 textAlign="center"
                                 color="neutral"
                                 fontWeight="sm"
                                 lineHeight="sm"
                                 mb={1}
                              >
                                 Lorem ipsum dolor sit amet consectetur
                                 adipisicing elit. Porro, velit modi iure quidem
                                 ipsa distinctio.
                              </Typography>
                              <ProductDetailsPicChart />
                              <Typography level="h5" fontWeight="md">
                                 Team Response
                              </Typography>

                              <Box display="flex" gap={3} mt={2}>
                                 <Typography
                                    color="danger"
                                    startDecorator={
                                       <FavoriteBorder
                                          fontSize="small"
                                          color="error"
                                       />
                                    }
                                    level="body2"
                                 >
                                    4.5K LOVES
                                 </Typography>
                                 <Typography
                                    color="info"
                                    startDecorator={
                                       <MarkChatRead
                                          fontSize="small"
                                          sx={{ color: "#814dde" }}
                                       />
                                    }
                                    level="body2"
                                 >
                                    5.3K Suggestions
                                 </Typography>
                                 <Typography
                                    color="primary"
                                    startDecorator={
                                       <PermMedia
                                          fontSize="small"
                                          color="info"
                                       />
                                    }
                                    level="body2"
                                 >
                                    6 Medias
                                 </Typography>
                              </Box>
                           </Box>
                        </Grid>

                        <Grid
                           item
                           sm={12}
                           md={6}
                           display="flex"
                           alignItems="center"
                           justifyContent="center"
                        >
                           <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                           >
                              <Box
                                 border={`1px solid ${theme.palette.grey[300]}`}
                                 p="0px 40px 40px 40px"
                              >
                                 <Typography
                                    textAlign="center"
                                    fontSize="sm"
                                    mb={0.5}
                                 >
                                    Project Photos
                                 </Typography>
                                 <ProductDetailsImageView />
                                 <Typography textAlign="center" level="body3">
                                    Click to view all images!
                                 </Typography>
                              </Box>
                           </Box>
                        </Grid>
                     </Grid>
                  </Paper>
               </Grid>
               <Grid item xs={12} sm={12}>
                  <Paper>
                     <Box display="flex" gap={1} p={3}>
                        <Avatar
                           sx={{ width: "45px", height: "45px" }}
                           variant="circular"
                        />

                        <Form.Item
                           name={["user", "introduction"]}
                           style={{ width: "100%", marginBottom: 0 }}
                        >
                           <Input.TextArea
                              style={{ width: "100%", height: "130px" }}
                              placeholder="What is your suggestions about the project?"
                           />
                           <Button
                              sx={{ marginLeft: "auto", mt: 1.5 }}
                              variant="outlined"
                              size="sm"
                           >
                              Post a suggestion
                           </Button>
                        </Form.Item>
                     </Box>
                     <Divider />
                     <Box p={3} display="flex" gap={2}>
                        <Avatar
                           sx={{ width: "45px", height: "45px" }}
                           variant="rounded"
                        />
                        <Box>
                           <Box display="flex" gap={1} alignItems="center">
                              <Typography
                                 level="body2"
                                 fontWeight="lg"
                                 component="span"
                                 sx={{ color: "#000" }}
                              >
                                 Yousuf Ahamad
                              </Typography>{" "}
                              <FiberManualRecord sx={{ fontSize: "7px" }} />
                              <Typography
                                 level="body2"
                                 fontWeight="sm"
                                 component="span"
                              >
                                 One month ago
                              </Typography>
                           </Box>
                           <Typography level="body1" fontWeight="sm">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Recusandae vel culpa earum?
                           </Typography>
                        </Box>
                     </Box>
                  </Paper>
               </Grid>
            </Grid>
         </Container>
         <TimeLine open={timeLIneOpen} setOpen={setTimeLineOpen} />
      </div>
   );
};

export default SingleProjectDisplay;
