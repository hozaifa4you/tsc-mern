import { FunctionComponent } from "react";
import { Box, Chip, Typography } from "@mui/joy";
import {
   // Favorite,
   FavoriteBorder,
   Visibility,
   Loupe,
   VerifiedOutlined,
   Category,
   Timeline,
} from "@mui/icons-material";
import { useTheme, Theme, Avatar, Typography as Typo } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";

import { IProjects } from "../redux/reducer/projectsSlice";

interface IProjectCardProps {
   project: IProjects;
}

const ProjectCard2: FunctionComponent<IProjectCardProps> = ({ project }) => {
   const theme: Theme = useTheme();

   return (
      <Box display="flex" gap={2}>
         {/* TODO Image */}
         <Box>
            <Avatar
               src="/project.jpg"
               variant="rounded"
               sx={{
                  width: 80,
                  height: 80,
                  padding: 0.3,
                  backgroundColor: "#fff",
                  border: "1px solid",
                  borderColor: theme.palette.grey[300],
                  boxShadow: theme.shadows[2],
               }}
            />
            <Typo
               color={theme.palette.grey[500]}
               variant="caption"
               textAlign="center"
               component="p"
               my={1}
            >
               {moment(project.createdAt).fromNow()}
            </Typo>
         </Box>
         {/* TODO Desc */}
         <Box>
            <Typography
               fontSize={20}
               color="primary"
               component={Link}
               to={`/projects/${project.slug}`}
               sx={{
                  textDecoration: "none",
                  transition: "all .3s",
                  "&:hover": {
                     textDecoration: "underline",
                  },
                  fontFamily: "Poppins",
               }}
            >
               {project?.title?.slice(0, 60)}
            </Typography>
            <Box display="flex" gap={1}>
               <Chip
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{
                     "--Chip-gap": "6px",
                     fontFamily: "Josefin Sans",
                  }}
                  endDecorator={
                     <VerifiedOutlined color="primary" fontSize="small" />
                  }
                  onClick={() => {}}
               >
                  {project?.creator?.name}
               </Chip>
               <Chip
                  variant="plain"
                  color="success"
                  size="sm"
                  startDecorator={<Loupe color="success" fontSize="small" />}
                  sx={{
                     "--Chip-gap": "6px",
                     fontFamily: "Josefin Sans",
                  }}
               >
                  {project?.joined && project?.joined.length
                     ? project.joined.length
                     : 0}{" "}
                  Joined
               </Chip>
               <Chip
                  variant="plain"
                  color="danger"
                  size="sm"
                  onClick={() => {}}
                  sx={{
                     "--Chip-gap": "6px",
                     fontFamily: "Josefin Sans",
                  }}
                  startDecorator={
                     <FavoriteBorder color="error" fontSize="small" />
                  }
               >
                  {project?.love && project?.love.length > 0
                     ? project?.love.length
                     : 0}{" "}
                  Favorite
               </Chip>
               <Chip
                  variant="soft"
                  color="neutral"
                  size="sm"
                  onClick={() => {}}
                  sx={{
                     "--Chip-gap": "6px",
                     fontFamily: "Josefin Sans",
                  }}
                  startDecorator={
                     <Visibility color="disabled" fontSize="small" />
                  }
               >
                  {project.readTime} Read
               </Chip>
            </Box>
            <Typo
               fontSize={15}
               color="text.secondary"
               mb={1}
               fontFamily="Roboto"
            >
               {project.desc.slice(0, 225)}
            </Typo>
            <Box display="flex" gap={1}>
               <Chip
                  size="sm"
                  variant="outlined"
                  color="info"
                  startDecorator={<Timeline fontSize="small" color="info" />}
                  onClick={() => {}}
                  sx={{
                     "--Chip-gap": "6px",
                     fontFamily: "Josefin Sans",
                  }}
               >
                  {project.status?.status}
               </Chip>
               <Chip
                  size="sm"
                  variant="outlined"
                  color="warning"
                  startDecorator={<Category fontSize="small" color="warning" />}
                  onClick={() => {}}
                  sx={{
                     "--Chip-gap": "6px",
                     fontFamily: "Josefin Sans",
                  }}
               >
                  {project.category}
               </Chip>
            </Box>
         </Box>
      </Box>
   );
};

export default ProjectCard2;
