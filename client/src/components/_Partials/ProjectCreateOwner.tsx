import { Avatar, Box, Paper, useTheme } from "@mui/material";
import { Button, Typography } from "@mui/joy";
import {
   AutoFixHigh,
   Engineering,
   Face2,
   LocationOnSharp,
} from "@mui/icons-material";

import { useAppSelector } from "../../app/hooks";
import { selectLogin } from "../../redux/reducer/authenticationSlice";

const ProjectCreateOwner = () => {
   const theme = useTheme();
   const { user } = useAppSelector(selectLogin);

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
            endDecorator={<Engineering fontSize="small" />}
            mb={1}
            sx={{ color: "gray" }}
         >
            Creator
         </Typography>
         <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Box>
               <Avatar
                  variant="rounded"
                  sx={{ width: 56, height: 56 }}
                  src={`/${user?.avatar}`}
               />
            </Box>
            <Box>
               <Typography level="h6" justifyContent="center">
                  {user?.name}
               </Typography>
               <Typography
                  startDecorator={<LocationOnSharp fontSize="small" />}
                  sx={{ color: theme.palette.grey[500] }}
                  fontSize="sm"
               >
                  {user?.address
                     ? `${user.address.city}, ${user.address.country}.`
                     : "Address not found"}
               </Typography>
            </Box>
         </Box>
         <Box display="flex" flexDirection="column" gap={2}>
            <Button
               sx={{ borderRadius: "30px" }}
               fullWidth
               startDecorator={<Face2 />}
            >
               Profile View
            </Button>
            <Button
               sx={{ borderRadius: "30px" }}
               fullWidth
               variant="outlined"
               startDecorator={<AutoFixHigh />}
            >
               Edit Profile
            </Button>
         </Box>
      </Paper>
   );
};

export default ProjectCreateOwner;
