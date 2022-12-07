import { FC } from "react";
import { Circle } from "@mui/icons-material";
import {  IconButton, Typography } from "@mui/joy";
import { Box, useTheme } from "@mui/material";

interface IPropsTypes {
   title: string;
   name: string;
   btnText?: string;
   btnColor?: "primary" | "neutral" | "danger" | "info" | "success" | "warning";
   icon?: JSX.Element;
}

const ProjectDetailsList: FC<IPropsTypes> = ({
   title,
   name,
   btnText,
   btnColor,
   icon,
}) => {
   const theme = useTheme();
   return (
      <>
         <Typography
            color="neutral"
            startDecorator={
               <Circle
                  sx={{ fontSize: "12px", color: theme.palette.success.light }}
               />
            }
            fontSize="sm"
            mt={1}
         >
            {title}
         </Typography>
         <Box
            borderBottom={`1px solid ${theme.palette.grey[300]}`}
            pb={1}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
         >
            <Typography
               fontFamily="Poppins"
               color="primary"
               sx={{ textIndent: "15px" }}
               level="h6"
            >
               {name}
            </Typography>

            <IconButton variant="plain" color={btnColor} size="sm">
               {icon}
            </IconButton>
         </Box>
      </>
   );
};

export default ProjectDetailsList;
