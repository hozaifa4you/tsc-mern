import { FC } from "react";
import { Avatar, Box, Paper, useTheme, Fab } from "@mui/material";
import { Button, Chip, Divider, Typography } from "@mui/joy";
import {
   Favorite,
   PersonPin,
   Radar,
   Work,
   WorkspacePremium,
   ManageAccounts,
   Workspaces,
} from "@mui/icons-material";

import { IUsers } from "../../pages/CreateProject";

type TColor =
   | "primary"
   | "neutral"
   | "danger"
   | "info"
   | "success"
   | "warning"
   | undefined;

interface IPropsTypes {
   title: string;
   icon: JSX.Element;
   user: IUsers | null;
   positionColor: TColor;
   profileColor: TColor;
   projectColor: TColor;
}

const SelectedManager: FC<IPropsTypes> = ({
   title,
   icon,
   user,
   positionColor,
   profileColor,
   projectColor,
}) => {
   const theme = useTheme();

   return (
      <Paper
         sx={{
            borderRadius: "1px",
            p: 3,
            mb: 2.5,
         }}
         elevation={1}
      >
         <Typography
            textTransform="uppercase"
            variant="plain"
            level="body2"
            endDecorator={icon}
            mb={1}
            sx={{ color: "gray" }}
         >
            {title}
         </Typography>
         <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Box>
               <Avatar
                  variant="rounded"
                  sx={{
                     width: 56,
                     height: 56,
                     color: !user ? theme.palette.grey[300] : "",
                     bgcolor: !user ? theme.palette.grey[200] : "",
                  }}
                  src={`/${user?.avatar}`}
               />
            </Box>
            <Box>
               <Typography
                  level="h6"
                  justifyContent="center"
                  sx={{ color: !user ? theme.palette.grey[400] : "" }}
               >
                  {user ? user.name : "Not Found!"}
               </Typography>
               <Box display="flex" gap={1}>
                  <Chip
                     startDecorator={<Radar fontSize="small" />}
                     size="sm"
                     variant="soft"
                     color={positionColor}
                     disabled={!user}
                  >
                     {user ? user.userType : "Select"}
                  </Chip>
                  <Chip
                     startDecorator={<ManageAccounts fontSize="small" />}
                     size="sm"
                     variant="soft"
                     color="neutral"
                     disabled={!user}
                  >
                     @{user ? user.username : "Select"}
                  </Chip>
               </Box>
            </Box>
         </Box>
         <Box display="flex" gap={2} justifyContent="center" mt={3}>
            <Button
               sx={{ borderRadius: "30px" }}
               startDecorator={<PersonPin fontSize="small" />}
               size="sm"
               color={profileColor}
               disabled={!user}
            >
               Profile View
            </Button>
            <Button
               sx={{ borderRadius: "30px" }}
               variant="outlined"
               color={projectColor}
               startDecorator={<WorkspacePremium fontSize="small" />}
               size="sm"
               disabled={!user}
            >
               View Projects
            </Button>
         </Box>
         <Box display="flex" justifyContent="center" my={3}>
            <Box width="95%">
               <Divider />
            </Box>
         </Box>
         <Box display="flex" alignItems="center" justifyContent="space-around">
            <Box display="flex" flexDirection="column" alignItems="center">
               <Fab
                  disabled={!user}
                  size="medium"
                  aria-label="add"
                  sx={{
                     background: !user
                        ? theme.palette.grey[400]
                        : "linear-gradient(to bottom right, #5E5AEC, #3F9EFC)",
                  }}
               >
                  <Work sx={{ color: "#fff" }} />
               </Fab>
               <Typography
                  level="h6"
                  justifyContent="center"
                  fontSize="sm"
                  mt={1}
                  component="p"
               >
                  1.25K
               </Typography>
               <Typography
                  level="body2"
                  justifyContent="center"
                  fontSize="14px"
                  component="p"
                  lineHeight={1}
                  sx={{ color: theme.palette.grey[500] }}
               >
                  PROJECTS
               </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
               <Fab
                  disabled={!user}
                  size="medium"
                  aria-label="add"
                  sx={{
                     background: !user
                        ? theme.palette.grey[400]
                        : "linear-gradient(to bottom right, #C90A6D, #FF48A0)",
                  }}
               >
                  <Favorite sx={{ color: "#fff" }} />
               </Fab>
               <Typography
                  level="h6"
                  justifyContent="center"
                  fontSize="sm"
                  mt={1}
                  component="p"
               >
                  43K
               </Typography>
               <Typography
                  level="body2"
                  justifyContent="center"
                  fontSize="14px"
                  component="p"
                  lineHeight={1}
                  sx={{ color: theme.palette.grey[500] }}
               >
                  LOVES
               </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
               <Fab
                  disabled={!user}
                  size="medium"
                  aria-label="add"
                  sx={{
                     background: !user
                        ? theme.palette.grey[400]
                        : "linear-gradient(to bottom right, #6452E9, #639FF9)",
                  }}
               >
                  <Workspaces sx={{ color: "#fff" }} />
               </Fab>
               <Typography
                  level="h6"
                  justifyContent="center"
                  fontSize="sm"
                  mt={1}
                  component="p"
               >
                  42
               </Typography>
               <Typography
                  level="body2"
                  justifyContent="center"
                  fontSize="14px"
                  component="p"
                  lineHeight={1}
                  sx={{ color: theme.palette.grey[500] }}
               >
                  P JOINED
               </Typography>
            </Box>
         </Box>
      </Paper>
   );
};

export default SelectedManager;
