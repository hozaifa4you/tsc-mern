import { useState, useEffect } from "react";
import { Button, Chip, Container, Typography } from "@mui/joy";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Avatar, Box, Divider, Grid, Paper, useTheme } from "@mui/material";
import {
   AccessTime,
   AddTask,
   ArrowRightAlt,
   Celebration,
   FavoriteBorder,
   FiberManualRecord,
   History,
   HourglassTopOutlined,
   Loupe,
   ManageHistory,
   MarkChatRead,
   MoreTime,
   PostAdd,
   Settings,
   Signpost,
} from "@mui/icons-material";
import { Input } from "antd";

import { API } from "../app/API";
import { EStatus, ProjectType } from "../utils/urls";
import {
   Breadcrumb,
   TeamResponse,
   ProductDetailsImageView,
   MemberListItem,
   TimeLine,
   ComingEvents,
   ActivitySingle,
   SingleUtils,
   TimelineAdd,
   DocumentDisplay,
} from "../components";

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
                                 fontWeight="md"
                                 lineHeight="sm"
                                 mb={1}
                                 color="primary"
                                 fontFamily="Josefin Sans"
                              >
                                 Lorem ipsum dolor sit amet consectetur
                                 adipisicing elit. Porro, velit modi iure quidem
                                 ipsa distinctio.
                              </Typography>
                              <TeamResponse />
                              <Typography level="h5" fontWeight="md">
                                 Team Response
                              </Typography>

                              <Box display="flex" gap={3} mt={2}>
                                 <Typography
                                    fontSize="sm"
                                    color="danger"
                                    startDecorator={
                                       <FavoriteBorder
                                          fontSize="small"
                                          color="error"
                                       />
                                    }
                                    level="body2"
                                 >
                                    4.5K Love
                                 </Typography>
                                 <Typography
                                    fontSize="sm"
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
                                 <Chip
                                    size="sm"
                                    variant="outlined"
                                    color="primary"
                                    startDecorator={
                                       <HourglassTopOutlined
                                          fontSize="small"
                                          color="info"
                                       />
                                    }
                                 >
                                    Progressing
                                 </Chip>
                              </Box>
                              <Box display="flex" gap={1} mt={2}>
                                 <Typography
                                    fontSize="sm"
                                    color="neutral"
                                    startDecorator={
                                       <AccessTime
                                          fontSize="small"
                                          color="action"
                                       />
                                    }
                                    level="body2"
                                 >
                                    25 Jun 2022 03:40 PM
                                 </Typography>
                                 <Typography
                                    fontSize="sm"
                                    startDecorator={
                                       <ManageHistory
                                          fontSize="small"
                                          sx={{ color: "WindowFrame" }}
                                       />
                                    }
                                    level="body2"
                                 >
                                    25 Jun 2022 03:40 PM
                                 </Typography>

                                 <Button
                                    size="sm"
                                    variant="soft"
                                    startDecorator={<Signpost />}
                                 >
                                    Details
                                 </Button>
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
                  <Grid container spacing={3}>
                     <Grid item xs={12} sm={12} md={5}>
                        <Paper sx={{ p: 3 }}>
                           <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                              mb={2}
                           >
                              <Typography fontWeight="lg" fontSize="lg">
                                 JOINED MEMBERS
                              </Typography>
                              <Button
                                 size="sm"
                                 variant="plain"
                                 startDecorator={<Loupe />}
                              >
                                 Add Member
                              </Button>
                           </Box>
                           <Divider />

                           <MemberListItem />
                           <Divider />
                           <MemberListItem />
                           <Divider />
                           <MemberListItem />
                           <Divider />
                           <MemberListItem />
                           <Divider />
                           <MemberListItem />
                           <Divider />
                           <MemberListItem />

                           <Divider />
                           <Box
                              mt={2}
                              display="flex"
                              alignItems="center"
                              justifyContent={"space-between"}
                           >
                              <div></div>
                              <Typography
                                 endDecorator={
                                    <ArrowRightAlt fontSize="small" />
                                 }
                                 color="info"
                              >
                                 See Members
                              </Typography>
                           </Box>
                        </Paper>
                     </Grid>
                     <Grid item xs={12} sm={12} md={3}>
                        <Grid container spacing={2}>
                           <Grid
                              item
                              xs={12}
                              sm={12}
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                           >
                              <Typography
                                 fontWeight="sm"
                                 startDecorator={
                                    <Celebration fontSize="small" />
                                 }
                              >
                                 Upcoming Events
                              </Typography>
                              <Button
                                 size="sm"
                                 variant="outlined"
                                 color="info"
                                 startDecorator={<AddTask fontSize="small" />}
                              >
                                 Create One
                              </Button>
                           </Grid>

                           <ComingEvents />

                           <ComingEvents />
                        </Grid>
                     </Grid>
                     <Grid item xs={12} sm={12} md={4}>
                        <Grid container spacing={2}>
                           <Grid
                              item
                              xs={12}
                              sm={12}
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                           >
                              <Typography
                                 fontWeight="sm"
                                 startDecorator={<Settings fontSize="small" />}
                              >
                                 Utilities
                              </Typography>
                           </Grid>
                           {/* HACK UTILS */}
                           <SingleUtils />
                        </Grid>
                     </Grid>
                  </Grid>
               </Grid>

               {/* HACK timeline */}
               <Grid item xs={12} sm={12} md={7}>
                  <Box
                     display="flex"
                     alignItems="center"
                     justifyContent="space-between"
                     mb={1}
                  >
                     <Typography
                        level="h6"
                        startDecorator={<ManageHistory fontSize="small" />}
                     >
                        Project Timeline
                     </Typography>
                  </Box>
                  <Paper sx={{ p: 3 }}>
                     <TimeLine />
                  </Paper>
               </Grid>

               {/* HACK Activity */}
               <Grid item xs={12} sm={12} md={5}>
                  <Box
                     display="flex"
                     alignItems="center"
                     justifyContent="space-between"
                     mb={1}
                  >
                     <Typography
                        level="h6"
                        startDecorator={<MoreTime fontSize="small" />}
                     >
                        Add New Timeline
                     </Typography>
                  </Box>
                  <Box>
                     <Grid container spacing={2}>
                        {/* input here */}
                        <TimelineAdd />
                        {/* input */}
                        <Grid item xs={12} sm={12} md={12}>
                           <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                              mb={1}
                           >
                              <Typography
                                 level="h6"
                                 startDecorator={<History fontSize="small" />}
                              >
                                 Activity History
                              </Typography>
                              <Typography
                                 fontWeight="sm"
                                 fontSize="sm"
                                 color="info"
                                 endDecorator={
                                    <ArrowRightAlt fontSize="small" />
                                 }
                              >
                                 More Activity
                              </Typography>
                           </Box>
                        </Grid>

                        <ActivitySingle />
                        <ActivitySingle />
                     </Grid>
                  </Box>
               </Grid>

               <Grid item xs={12} sm={12}>
                  <Paper sx={{ p: 2 }}>
                     <Typography level="h6" mb={2}>
                        All Documents
                     </Typography>

                     <DocumentDisplay />
                  </Paper>
               </Grid>

               <Grid item xs={12} sm={12}>
                  <Paper>
                     <Box p={2} display="flex" flexDirection="column">
                        <Box display="flex" gap={1}>
                           <Avatar
                              sx={{ width: "45px", height: "45px" }}
                              variant="circular"
                           />
                           <Input.TextArea
                              style={{ width: "100%", height: "130px" }}
                              placeholder="What is your suggestions about the project?"
                           />
                        </Box>
                        <Button
                           sx={{ marginLeft: "auto", mt: 1.5 }}
                           variant="soft"
                           size="sm"
                           startDecorator={<PostAdd />}
                        >
                           Post a suggestion
                        </Button>
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
                           <Typography
                              level="body1"
                              fontWeight="sm"
                              color="neutral"
                           >
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Recusandae vel culpa earum?
                           </Typography>
                        </Box>
                     </Box>
                  </Paper>
               </Grid>
            </Grid>
         </Container>
      </div>
   );
};

export default SingleProjectDisplay;
