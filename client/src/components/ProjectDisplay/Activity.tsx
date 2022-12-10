import { ArrowRightAlt } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/joy";
import { Grid, Paper, useTheme, Theme, Avatar } from "@mui/material";
import { Tag } from "antd";

const Activity = () => {
   const theme: Theme = useTheme();

   return (
      <Grid item xs={12} sm={12} md={12}>
         <Paper sx={{ p: 3 }}>
            <Box
               display="flex"
               alignItems="center"
               justifyContent="space-between"
               mb={1}
            >
               <Box display="flex" gap={1} alignItems="center">
                  <Avatar
                     sx={{ width: "35px", height: "35px" }}
                     variant="rounded"
                  />
                  <Box>
                     <Typography color="info" fontWeight="sm">
                        Yousuf Ahamad
                     </Typography>
                     <Typography
                        color="neutral"
                        fontWeight="sm"
                        level="body2"
                        mt={-0.4}
                        textTransform="uppercase"
                     >
                        Admin
                     </Typography>
                  </Box>
               </Box>

               <Typography
                  fontWeight="sm"
                  sx={{ color: theme.palette.grey[600] }}
               >
                  20 Jun 2022 04:34PM
               </Typography>
            </Box>
            <Typography
               fontWeight="lg"
               level="h6"
               sx={{ color: "#43303B", mb: 1 }}
            >
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
               quibusdam. <Tag color="green">Timeline</Tag>
            </Typography>
            <Typography
               fontWeight="sm"
               level="body1"
               sx={{ color: "#6D7483", mb: 2 }}
            >
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
               expedita officiis sint sequi iste quo unde, accusantium ut
               doloribus provident!
            </Typography>
            <Button
               size="sm"
               variant="outlined"
               color="neutral"
               endDecorator={<ArrowRightAlt fontSize="small" />}
            >
               Full Report
            </Button>
         </Paper>
      </Grid>
   );
};

export default Activity;
