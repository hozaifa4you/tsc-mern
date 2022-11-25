import { Box, Grid, Paper } from "@mui/material";
import { Typography, Box as BoxJoy, Chip } from "@mui/joy";
import {
   AddTask,
   ClassOutlined,
   CreditScore,
   Diversity1,
   EventAvailableRounded,
   TypeSpecimen,
} from "@mui/icons-material";

const ActivitySummery = () => {
   return (
      <Grid item md={12} lg={4}>
         <Paper>
            <Typography level="h6" pt="6px" pb="5px" textAlign="center">
               Project Summery
            </Typography>

            <BoxJoy display="flex" flexDirection="column" padding={2}>
               <Box display="flex" alignItems="center" mb={0.7}>
                  <Typography
                     level="body2"
                     component="h2"
                     startDecorator={<EventAvailableRounded fontSize="small" />}
                  >
                     Create Date
                  </Typography>
                  <Chip
                     variant="outlined"
                     color="info"
                     size="sm"
                     sx={{ ml: "auto" }}
                  >
                     21-12-2022 4:43PM
                  </Chip>
               </Box>
               <Box display="flex" alignItems="center" mb={0.7}>
                  <Typography
                     level="body2"
                     component="h2"
                     startDecorator={<CreditScore fontSize="small" />}
                  >
                     Last Update
                  </Typography>
                  <Chip
                     variant="outlined"
                     color="neutral"
                     size="sm"
                     sx={{ ml: "auto" }}
                  >
                     21-12-2022 4:43PM
                  </Chip>
               </Box>
               <Box display="flex" alignItems="center" mb={0.7}>
                  <Typography
                     level="body2"
                     component="h2"
                     startDecorator={<ClassOutlined fontSize="small" />}
                  >
                     Category
                  </Typography>
                  <Chip
                     variant="outlined"
                     color="primary"
                     size="sm"
                     sx={{ ml: "auto" }}
                  >
                     Web Development
                  </Chip>
               </Box>
               <Box display="flex" alignItems="center" mb={0.8}>
                  <Typography
                     level="body2"
                     component="h2"
                     startDecorator={<TypeSpecimen fontSize="small" />}
                  >
                     Project Type
                  </Typography>
                  <Chip
                     variant="outlined"
                     color="danger"
                     size="sm"
                     sx={{ ml: "auto" }}
                  >
                     Project Type
                  </Chip>
               </Box>
               <Box display="flex" alignItems="center" mb={0.8}>
                  <Typography
                     level="body2"
                     component="h2"
                     startDecorator={<Diversity1 fontSize="small" />}
                  >
                     Joined Person
                  </Typography>
                  <Chip
                     variant="outlined"
                     color="success"
                     size="sm"
                     sx={{ ml: "auto" }}
                  >
                     10 Person(s)
                  </Chip>
               </Box>
               <Box display="flex" alignItems="center">
                  <Typography
                     level="body2"
                     component="h2"
                     startDecorator={<AddTask fontSize="small" />}
                  >
                     Task Completed
                  </Typography>
                  <Chip
                     variant="outlined"
                     color="warning"
                     size="sm"
                     sx={{ ml: "auto" }}
                  >
                     11 Picture(s)
                  </Chip>
               </Box>
            </BoxJoy>
         </Paper>
      </Grid>
   );
};

export default ActivitySummery;
