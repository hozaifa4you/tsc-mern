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
import { toast } from "react-hot-toast";

import { API } from "../app/API";
import { EStatus, ProjectType, EUserTypes, EEventStatus } from "../utils/urls";
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
   Loader,
} from "../components";
import { toastErrorStyle } from "../utils/toastStyling";
import moment from "moment";

// ["name", "username", "userType", "avatar"]

export interface IUserPopulate {
   _id: string;
   name: string;
   username: string;
   userType: EUserTypes;
   avatar: string;
}

export interface IPhotos {
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

export interface IEventTypes {
   _id: string;
   createDate: Date;
   creator: IUserPopulate;
   desc: string;
   endDate: Date;
   eventNames: string;
   startingDate: Date;
   status: EEventStatus;
   photo: string;
}

export interface IStatusTypes {
   _id: string;
   creator: IUserPopulate;
   date: Date;
   desc: string;
   photos: string[];
   status: EStatus;
}

interface ITeamResponse {
   bad: string[];
   good: string[];
   nothing: string[];
   positive: string[];
}

export interface IProject {
   category: string;
   createdAt: Date;
   creator: IUserPopulate;
   desc: string;
   events: IEventTypes[];
   instructor: IUserPopulate;
   joined: IUserPopulate[];
   love: string[];
   photos: IPhotos[];
   projectManager: IUserPopulate;
   projectType: ProjectType;
   readTime: number;
   slug: string;
   status: IStatusTypes[];
   suggestion: ISuggestions[];
   teamResponse: ITeamResponse;
   title: string;
   updatedAt: Date;
   _id: string;
   _v: number;
}

interface IProjectResponse {
   success: true;
   project: IProject;
}

const SingleProjectDisplay = () => {
   const [project, setProject] = useState<IProject | null>(null);
   const { slug } = useParams();
   const theme = useTheme();
   const [loading, setLoading] = useState<boolean>(false);

   useEffect(() => {
      const fetchProject = async () => {
         try {
            setLoading(true);
            const { data } = await API.get<IProjectResponse>(
               `/api/v1/projects/find-projects/${slug}`
            );
            setLoading(false);

            // console.log(data.project.status);

            if (data.success) {
               setProject(data.project);
            }
         } catch (err: any) {
            setLoading(false);
            const err_msg = err.response.data.message || err.message;
            toast.error(err_msg, toastErrorStyle);
         }
      };

      fetchProject();
   }, [slug]);

   if (loading) return <Loader />;

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
                                 {project?.title}
                              </Typography>
                              {/* HACK Team response chart */}
                              <TeamResponse data={project?.teamResponse} />
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
                                    {project?.love.length} Love(s)
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
                                    {project?.suggestion.length} Suggestion(s)
                                 </Typography>
                                 <Chip
                                    size="sm"
                                    variant="outlined"
                                    color="primary"
                                    sx={{ textTransform: "capitalize" }}
                                    startDecorator={
                                       <HourglassTopOutlined
                                          fontSize="small"
                                          color="info"
                                       />
                                    }
                                 >
                                    {
                                       project?.status[
                                          project.status.length - 1
                                       ].status
                                    }
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
                                    {moment(project?.createdAt).format("llll")}
                                 </Typography>
                                 <Typography
                                    fontSize="sm"
                                    startDecorator={
                                       <ManageHistory
                                          fontSize="small"
                                          color="action"
                                       />
                                    }
                                    level="body2"
                                 >
                                    {/* FIXME there is something went wrong. Is updatedAt current time?*/}
                                    {moment(project?.updatedAt).format("llll")}
                                 </Typography>

                                 <Button
                                    size="sm"
                                    variant="plain"
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
                                 <ProductDetailsImageView
                                    photos={project?.photos}
                                 />
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
                              <Typography
                                 fontWeight="xl2"
                                 fontSize="md"
                                 endDecorator={
                                    <Typography
                                       color="neutral"
                                       fontSize="sm"
                                       fontWeight="sm"
                                       ml={1}
                                    >
                                       {project?.joined.length} Joined
                                    </Typography>
                                 }
                              >
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

                           {project?.joined.slice(0, 6).map((person, i) => (
                              <Box key={person._id}>
                                 <MemberListItem user={person} />
                              </Box>
                           ))}

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

                     {/* HACK Events */}
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
                           {project?.events.slice(0, 2).map((event) => (
                              <ComingEvents key={event._id} event={event} />
                           ))}
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
                           {project && <SingleUtils data={project} />}
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
                     {project?.status && (
                        <TimeLine timelines={project?.status} />
                     )}
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
