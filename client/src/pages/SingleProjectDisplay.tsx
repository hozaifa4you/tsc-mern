import { useState, useEffect } from "react";
import { Button, Container, Textarea, Typography } from "@mui/joy";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
   Avatar,
   Box,
   Divider,
   Grid,
   Paper,
   TextField,
   useTheme,
} from "@mui/material";

import { API } from "../app/API";
import { EStatus, ProjectType } from "../utils/urls";
import {
   Breadcrumb,
   ProjectDisplayRight,
   ProjectTitle,
   ProductDetailsPicChart,
   ProductDetailsImageView,
   ProjectDetailsList,
} from "../components";
import {
   AddComment,
   AddTask,
   Circle,
   EventAvailable,
   EventRepeat,
   FavoriteBorder,
   MarkChatRead,
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
   const [visible, setVisible] = useState(false);

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
         <Container maxWidth="lg">
            <Breadcrumb
               finalText="Project Details"
               secondLink="/projects"
               secondText="Projects"
            />

            <Grid container spacing={3} mt={1}>
               <Grid item md={12} lg={8}>
                  {/* HACK title */}
                  <ProjectTitle />
               </Grid>
               <ProjectDisplayRight />
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
                              <ProductDetailsPicChart />
                              <Typography level="h5" fontWeight="md">
                                 Team Response
                              </Typography>
                              <Typography
                                 level="h6"
                                 textAlign="center"
                                 color="neutral"
                                 fontWeight="sm"
                                 lineHeight="sm"
                              >
                                 Lorem ipsum dolor sit amet consectetur
                                 adipisicing elit. Porro, velit modi iure quidem
                                 ipsa distinctio.
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
                     <Grid container spacing={2}>
                        <Grid item sm={6} md={6}>
                           <Box p={3}>
                              <Typography
                                 textTransform="uppercase"
                                 borderBottom={`1px solid ${theme.palette.grey[300]}`}
                                 pb={1}
                              >
                                 Statistics
                              </Typography>
                              <ProjectDetailsList
                                 title="Project Creator"
                                 name="Yousuf Ahamad"
                              />
                              <ProjectDetailsList
                                 title="Project Instructor"
                                 name="Ismail Habib"
                              />
                              <ProjectDetailsList
                                 title="Last Update"
                                 name="Niloy Jamil"
                              />
                           </Box>
                        </Grid>
                        <Grid item sm={6} md={6}>
                           <Box p={3}>
                              <Typography
                                 textTransform="uppercase"
                                 textAlign="right"
                                 borderBottom={`1px solid ${theme.palette.grey[300]}`}
                                 pb={1}
                              >
                                 Expand Steps
                              </Typography>
                              {/*  */}
                              <ProjectDetailsList
                                 title="Project Manager"
                                 name="Ahamad Khan"
                              />
                              <ProjectDetailsList
                                 title="Total Steps"
                                 name="Total 5 Steps"
                              />
                              <ProjectDetailsList
                                 title="Total Task"
                                 name="Total 5 Task"
                              />
                           </Box>
                        </Grid>
                     </Grid>
                     <Grid container>
                        <Grid item xs={12} sm={12}>
                           <Paper
                              sx={{
                                 p: "10px 15px",
                                 mx: 3,
                                 borderRadius: 1,
                                 boxShadow: 0,
                                 bgcolor: theme.palette.grey[200],
                                 display: "flex",
                                 gap: 1,
                                 justifyContent: "space-around",
                                 mb: 3,
                              }}
                           >
                              <Box>
                                 <Typography
                                    level="body2"
                                    startDecorator={
                                       <EventAvailable
                                          sx={{
                                             fontSize: "20px",
                                          }}
                                          color="error"
                                       />
                                    }
                                 >
                                    23/12/2022 04:32PM Sunday
                                 </Typography>
                                 <Typography
                                    level="body2"
                                    startDecorator={
                                       <EventRepeat
                                          sx={{
                                             fontSize: "20px",
                                          }}
                                          color="info"
                                       />
                                    }
                                 >
                                    23/12/2022 04:32PM Sunday
                                 </Typography>
                              </Box>
                              <Box>
                                 <Typography
                                    level="body2"
                                    startDecorator={
                                       <AddTask
                                          sx={{
                                             fontSize: "20px",
                                          }}
                                          color="success"
                                       />
                                    }
                                 >
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Mollitia, tempora.
                                 </Typography>
                                 <Typography
                                    level="body2"
                                    startDecorator={
                                       <Person3
                                          sx={{
                                             fontSize: "20px",
                                             color: "magenta",
                                          }}
                                       />
                                    }
                                 >
                                    Ismail Habib
                                 </Typography>
                              </Box>
                              <Box>
                                 <Typography
                                    level="body2"
                                    startDecorator={
                                       <PersonAddAlt
                                          sx={{
                                             fontSize: "20px",
                                          }}
                                          color="primary"
                                       />
                                    }
                                 >
                                    Eva Bhabi
                                 </Typography>
                                 <Typography
                                    level="body2"
                                    startDecorator={
                                       <AddComment
                                          color="warning"
                                          sx={{
                                             fontSize: "20px",
                                          }}
                                       />
                                    }
                                 >
                                    Upoma Habiba
                                 </Typography>
                              </Box>
                           </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                           <Box sx={{ mx: 3, my: 1 }}>
                              <Button
                                 startDecorator={<PermMedia fontSize="small" />}
                                 variant="outlined"
                                 size="sm"
                              >
                                 View Medias & Documents
                              </Button>
                              <Box my={2}>
                                 <Image.PreviewGroup>
                                    <Image
                                       width={80}
                                       src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                    />
                                    <Image
                                       width={80}
                                       src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                                    />
                                 </Image.PreviewGroup>
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
                     <Box p={3}>this is sdkljsdfk</Box>
                  </Paper>
               </Grid>
            </Grid>
         </Container>
      </div>
   );
};

export default SingleProjectDisplay;
