import { FC } from "react";
import { Box, useTheme, Typography, Paper } from "@mui/material";

import { SemiCircleGauge } from "..";

interface ITitleProps {
   user?: { name: string };
   status?: string;
   percentage?: number;
}

const Title: FC<ITitleProps> = ({ user, status, percentage }) => {
   const theme = useTheme();

   return (
      <Paper
         sx={{
            width: "100%",
            py: 4,
            px: 3,
            display: "flex",
            alignItems: "center",
         }}
      >
         <Box>
            <Typography variant="h5" fontWeight="bold" fontFamily="Poppins">
               Welcome Mr./Mrs {user?.name} Yousuf Ahamad
            </Typography>
            <Typography
               variant="body2"
               fontFamily="Poppins"
               color={theme.palette.grey[600]}
               mt={1}
            >
               The project has been {percentage}76% completed till today.
            </Typography>
            <Typography
               variant="body2"
               fontFamily="Poppins"
               color={theme.palette.grey[600]}
            >
               The project needs to update, edit or customize, you should
               checkout.
            </Typography>
         </Box>
         <Box ml="auto">
            <SemiCircleGauge percentage={50} />
         </Box>
      </Paper>
   );
};

export default Title;
