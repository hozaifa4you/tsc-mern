import { FC } from "react";
import { Box, Typography } from "@mui/joy";
import { Tag, Timeline } from "antd";
import { Circle } from "@mui/icons-material";
import { Avatar, styled } from "@mui/material";
import moment from "moment";

import { IStatusTypes } from "../../utils/types";
import { tagColorVerify } from "../../utils/urls";

interface IPropTypes {
   timelines: IStatusTypes[];
}

const CustomBox = styled(Box)(({ theme }) => ({
   "& img": {
      width: "60px",
      margin: "5px",
      borderRadius: "3px",
      padding: "2px",
      border: "1px solid #bcc1ca",
   },
}));

const TimeLine: FC<IPropTypes> = ({ timelines }) => {
   console.log(timelines);

   return (
      <>
         <Box>
            <Timeline style={{ marginTop: 10 }}>
               {timelines.map((timeline) => (
                  <Timeline.Item
                     key={timeline._id}
                     color="green"
                     dot={
                        <Avatar
                           src={
                              timeline.creator.avatar === "avatar.png"
                                 ? "/avatar.png"
                                 : timeline.creator.avatar
                           }
                           sx={{ width: "25px", height: "25px" }}
                        />
                     }
                  >
                     <Box>
                        <Typography
                           color="primary"
                           fontSize="sm"
                           fontWeight="xl2"
                           component="span"
                        >
                           {timeline.creator.name}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                           <Tag
                              color={tagColorVerify(timeline.status)}
                              style={{ margin: 0, textTransform: "capitalize" }}
                           >
                              {timeline.status}
                           </Tag>
                           <Typography
                              fontWeight="sm"
                              sx={{
                                 color: "#A6A9B0",
                              }}
                           >
                              Created
                           </Typography>
                           <Circle sx={{ fontSize: "5px" }} />
                           <Typography
                              fontWeight="sm"
                              fontSize="sm"
                              sx={{
                                 color: "#A6A9B0",
                              }}
                              fontStyle="italic"
                           >
                              {moment(timeline.date).fromNow()}
                           </Typography>
                        </Box>
                        <Typography
                           fontSize="sm"
                           fontWeight="sm"
                           bgcolor="#f7f7f7"
                           p={1}
                           my={0.8}
                           borderRadius={0.5}
                        >
                           {timeline.desc}
                        </Typography>

                        <CustomBox my={1}>
                           {timeline.photos.map((photo, i) => (
                              <img key={i} src={photo} alt={timeline.desc} />
                           ))}
                        </CustomBox>
                     </Box>
                  </Timeline.Item>
               ))}

               {/* <Timeline.Item
                  color="green"
                  dot={
                     <Avatar
                        src="/avatar.png"
                        sx={{ width: "25px", height: "25px" }}
                     />
                  }
               >
                  <Box>
                     <Typography
                        color="primary"
                        fontSize="sm"
                        fontWeight="xl2"
                        component="span"
                     >
                        Yousuf Ahamad
                     </Typography>
                     <Box display="flex" alignItems="center" gap={1}>
                        <Tag color="magenta" style={{ margin: 0 }}>
                           Upcoming
                        </Tag>
                        <Typography
                           fontWeight="sm"
                           sx={{
                              color: "#A6A9B0",
                           }}
                        >
                           Created
                        </Typography>
                        <Circle sx={{ fontSize: "5px" }} />
                        <Typography
                           fontWeight="sm"
                           fontSize="sm"
                           sx={{
                              color: "#A6A9B0",
                           }}
                           fontStyle="italic"
                        >
                           6 day ago
                        </Typography>
                     </Box>
                     <Typography
                        fontSize="sm"
                        fontWeight="sm"
                        bgcolor="#f7f7f7"
                        p={1}
                        my={0.8}
                        borderRadius={0.5}
                     >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eveniet, facilis. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit.
                     </Typography>

                     <CustomBox my={1}>
                        <img src="/sample.jpg" alt="project" />
                        <img src="/sample.jpg" alt="project" />
                        <img src="/sample.jpg" alt="project" />
                        <img src="/sample.jpg" alt="project" />
                        <img src="/sample.jpg" alt="project" />
                     </CustomBox>
                  </Box>
               </Timeline.Item> */}
               {/* <Timeline.Item
                  color="green"
                  dot={
                     <Avatar
                        src="/avatar.png"
                        sx={{ width: "25px", height: "25px" }}
                     />
                  }
               >
                  <Box>
                     <Typography
                        color="primary"
                        fontSize="sm"
                        fontWeight="xl2"
                        component="span"
                     >
                        Yousuf Ahamad
                     </Typography>
                     <Box display="flex" alignItems="center" gap={1}>
                        <Tag color="geekblue" style={{ margin: 0 }}>
                           Progressing
                        </Tag>
                        <Typography
                           fontWeight="sm"
                           sx={{
                              color: "#A6A9B0",
                           }}
                        >
                           Updated
                        </Typography>
                        <Circle sx={{ fontSize: "5px" }} />
                        <Typography
                           fontWeight="sm"
                           fontSize="sm"
                           sx={{
                              color: "#A6A9B0",
                           }}
                           fontStyle="italic"
                        >
                           2 day ago
                        </Typography>
                     </Box>
                     <Typography
                        fontSize="sm"
                        fontWeight="sm"
                        bgcolor="#f7f7f7"
                        p={1}
                        my={0.8}
                        borderRadius={0.5}
                     >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Exercitationem quos repudiandae impedit vel quisquam
                        voluptatem reprehenderit veritatis ea nam soluta quod,
                        voluptates aut asperiores adipisci ratione enim iste
                        itaque. Quos.
                     </Typography>

                     <CustomBox my={1}>
                        <img src="/sample.jpg" alt="project" />
                        <img src="/sample.jpg" alt="project" />
                     </CustomBox>
                  </Box>
               </Timeline.Item>
               <Timeline.Item
                  dot={
                     <Paper
                        elevation={0}
                        sx={{
                           bgcolor: "#e7e4e4",
                           width: "28px",
                           height: "28px",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           borderRadius: "50%",
                        }}
                     >
                        <CheckCircle
                           sx={{
                              fontSize: "20px",
                              color: theme.palette.success.light,
                           }}
                           color="action"
                        />
                     </Paper>
                  }
               >
                  <Box>
                     <Typography
                        color="primary"
                        fontSize="sm"
                        fontWeight="xl2"
                        component="span"
                     >
                        Yousuf Ahamad
                     </Typography>
                     <Box display="flex" alignItems="center" gap={1}>
                        <Tag color="green" style={{ margin: 0 }}>
                           Progressing
                        </Tag>
                        <Typography
                           fontWeight="sm"
                           sx={{
                              color: "#A6A9B0",
                           }}
                        >
                           1st Step Updated
                        </Typography>
                        <Circle sx={{ fontSize: "5px" }} />
                        <Typography
                           fontWeight="sm"
                           fontSize="sm"
                           sx={{
                              color: "#A6A9B0",
                           }}
                           fontStyle="italic"
                        >
                           1 day ago
                        </Typography>
                     </Box>
                     <Typography
                        fontSize="sm"
                        fontWeight="sm"
                        bgcolor="#f7f7f7"
                        p={1}
                        my={0.8}
                        borderRadius={0.5}
                     >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Exercitationem quos repudiandae impedit vel quisquam
                        voluptatem reprehenderit veritatis ea nam soluta quod,
                        voluptates aut asperiores adipisci ratione enim iste
                        itaque. Quos.
                     </Typography>

                     <CustomBox my={1}>
                        <img src="/sample.jpg" alt="project" />
                        <img src="/sample.jpg" alt="project" />
                     </CustomBox>
                  </Box>
               </Timeline.Item>
               <Timeline.Item
                  dot={
                     <Paper
                        elevation={0}
                        sx={{
                           bgcolor: "#e7e4e4",
                           width: "28px",
                           height: "28px",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           borderRadius: "50%",
                        }}
                     >
                        <CheckCircle
                           sx={{
                              fontSize: "20px",
                              color: theme.palette.success.light,
                           }}
                        />
                     </Paper>
                  }
               >
                  <Box>
                     <Typography
                        color="primary"
                        fontSize="sm"
                        fontWeight="xl2"
                        component="span"
                     >
                        Yousuf Ahamad
                     </Typography>
                     <Box display="flex" alignItems="center" gap={1}>
                        <Tag color="green" style={{ margin: 0 }}>
                           Progressing
                        </Tag>
                        <Typography
                           fontWeight="sm"
                           sx={{
                              color: "#A6A9B0",
                           }}
                        >
                           2nd Step Updated
                        </Typography>
                        <Circle sx={{ fontSize: "5px" }} />
                        <Typography
                           fontWeight="sm"
                           fontSize="sm"
                           sx={{
                              color: "#A6A9B0",
                           }}
                           fontStyle="italic"
                        >
                           12 Hours ago
                        </Typography>
                     </Box>
                     <Typography
                        fontSize="sm"
                        fontWeight="sm"
                        bgcolor="#f7f7f7"
                        p={1}
                        my={0.8}
                        borderRadius={0.5}
                     >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Exercitationem quos repudiandae impedit vel quisquam
                        voluptatem reprehenderit veritatis ea nam soluta quod,
                        voluptates aut asperiores adipisci ratione enim iste
                        itaque. Quos.
                     </Typography>

                     <CustomBox my={1}>
                        <img src="/sample.jpg" alt="project" />
                        <img src="/sample.jpg" alt="project" />
                     </CustomBox>
                  </Box>
               </Timeline.Item>
               <Timeline.Item
                  color="green"
                  dot={
                     <Avatar
                        src="/avatar.png"
                        sx={{ width: "25px", height: "25px" }}
                     />
                  }
               >
                  <Box>
                     <Typography
                        color="primary"
                        fontSize="sm"
                        fontWeight="xl2"
                        component="span"
                     >
                        Yousuf Ahamad
                     </Typography>
                     <Box display="flex" alignItems="center" gap={1}>
                        <Tag color="purple" style={{ margin: 0 }}>
                           End
                        </Tag>
                        <Typography
                           fontWeight="sm"
                           sx={{
                              color: "#A6A9B0",
                           }}
                        >
                           Created
                        </Typography>
                        <Circle sx={{ fontSize: "5px" }} />
                        <Typography
                           fontWeight="sm"
                           fontSize="sm"
                           sx={{
                              color: "#A6A9B0",
                           }}
                           fontStyle="italic"
                        >
                           6 day ago
                        </Typography>
                     </Box>
                     <Typography
                        fontSize="sm"
                        fontWeight="sm"
                        bgcolor="#f7f7f7"
                        p={1}
                        my={0.8}
                        borderRadius={0.5}
                     >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eveniet, facilis. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit.
                     </Typography>

                     <CustomBox my={1}>
                        <img src="/sample.jpg" alt="project" />
                     </CustomBox>
                  </Box>
               </Timeline.Item> */}
            </Timeline>
         </Box>
      </>
   );
};

export default TimeLine;
