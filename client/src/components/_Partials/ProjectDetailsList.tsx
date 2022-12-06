import { FC } from "react";
import { Circle } from "@mui/icons-material";
import { Typography } from "@mui/joy";
import { Box, useTheme } from "@mui/material";

interface IPropsTypes {
   title: string;
   name: string;
}

const ProjectDetailsList: FC<IPropsTypes> = ({ title, name }) => {
   const theme = useTheme();
   return (
      <>
         <Typography
            color="neutral"
            startDecorator={
               <Circle
                  sx={{ fontSize: "12px", color: theme.palette.warning.light }}
               />
            }
            fontSize="sm"
            mt={1}
         >
            {title}
         </Typography>
         <Box borderBottom={`1px solid ${theme.palette.grey[300]}`} pb={1}>
            <Typography
               fontFamily="Poppins"
               color="primary"
               sx={{ textIndent: "15px" }}
               level="h6"
            >
               {name}
            </Typography>
         </Box>
      </>
   );
};

export default ProjectDetailsList;
