import { FunctionComponent } from "react";
import {
   Avatar,
   Alert,
   Chip,
   Box,
   Card,
   CardOverflow,
   IconButton,
   Typography,
   AspectRatio,
} from "@mui/joy";
import {
   BookmarkBorderRounded,
   Loupe,
   FavoriteBorder,
   ModeCommentOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import moment from "moment";

import { IProjects } from "../redux/reducer/projectsSlice";
import { MenuUrls } from "../utils/urls";

interface IProjectCardProps {
   project?: IProjects;
}

const ProjectCard: FunctionComponent<IProjectCardProps> = ({ project }) => {
   return (
      <Card
         variant="outlined"
         sx={{
            minWidth: 300,
            "--Card-radius": (theme) => theme.vars.radius.xs,
         }}
      >
         <Box sx={{ display: "flex", alignItems: "center", pb: 1.5, gap: 1 }}>
            <Box
               sx={{
                  position: "relative",
                  "&:before": {
                     content: '""',
                     position: "absolute",
                     top: 0,
                     left: 0,
                     bottom: 0,
                     right: 0,
                     m: "-2px",
                     borderRadius: "50%",
                     background:
                        "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                  },
               }}
            >
               <Avatar
                  size="sm"
                  src="avatar.png"
                  sx={{
                     // p: 0.5,
                     border: "2px solid",
                     borderColor: "background.body",
                  }}
               />
            </Box>
            <Box>
               <Typography fontWeight="lg">{project?.creator?.name}</Typography>
               <Typography
                  level="body2"
                  color="primary"
                  lineHeight={1}
                  sx={{ textIndent: 2 }}
               >
                  Creator
               </Typography>
            </Box>

            <Alert variant="soft" color="info" size="sm" sx={{ ml: "auto" }}>
               {project?.projectType}
            </Alert>
         </Box>
         <CardOverflow>
            <AspectRatio>
               <img
                  src={project?.photos[0].url}
                  alt={project?.title}
                  loading="lazy"
               />
            </AspectRatio>
         </CardOverflow>
         <Box sx={{ display: "flex", alignItems: "center", mx: -1, my: 1 }}>
            <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
               <IconButton variant="plain" color="neutral" size="sm">
                  <FavoriteBorder color="success" />
               </IconButton>
               <IconButton variant="plain" color="neutral" size="sm">
                  <ModeCommentOutlined color="secondary" />
               </IconButton>
               <IconButton variant="plain" color="neutral" size="sm">
                  <Loupe color="error" />
               </IconButton>
            </Box>
            <Box
               sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mx: "auto",
               }}
            >
               {[...Array(5)].map((_, index) => (
                  <Box
                     key={index}
                     sx={{
                        borderRadius: "50%",
                        width: `max(${6 - index}px, 3px)`,
                        height: `max(${6 - index}px, 3px)`,
                        bgcolor:
                           index === 0
                              ? "primary.solidBg"
                              : "background.level3",
                     }}
                  />
               ))}
            </Box>
            <Box
               sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}
            >
               <IconButton variant="plain" color="neutral" size="sm">
                  <BookmarkBorderRounded color="primary" />
               </IconButton>
            </Box>
         </Box>

         <Typography
            fontSize="18px"
            component={Link}
            to={`${MenuUrls.Projects}/${project?._id}`} // FIXME: this is should be replace by slug here
            sx={{
               textDecoration: "none",
               transition: "all .3s",
               lineHeight: "18px",
               mb: 1.7,
               "&:hover": {
                  textDecoration: "underline",
               },
            }}
         >
            {project?.title}
         </Typography>

         <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
               fontSize="10px"
               sx={{ color: "text.tertiary", my: 0.5 }}
               textTransform="uppercase"
            >
               {moment(project?.createdAt).format("MMMM Do YYYY, h:mm a")}
            </Typography>
            <Chip color="success" size="sm" variant="plain">
               {project?.category}
            </Chip>
         </Box>

         <CardOverflow
            sx={{
               py: "var(--Card-padding)",
               display: "flex",
               justifyContent: "space-between",
            }}
         >
            <Chip
               size="sm"
               variant="plain"
               color="primary"
               startDecorator={<Loupe />}
            >
               {project?.joined && project.joined.length > 0
                  ? project?.joined?.length
                  : "0 Joined"}
            </Chip>

            <Chip color="info" size="sm" variant="outlined">
               Progressing
            </Chip>
         </CardOverflow>
      </Card>
   );
};

export default ProjectCard;
