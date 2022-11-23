import { FC } from "react";
import { Box, Paper } from "@mui/material";
import { Chip, Typography } from "@mui/joy";
import {
   AddPhotoAlternate,
   ClassOutlined,
   Diversity1,
   SettingsSuggest,
   TypeSpecimen,
} from "@mui/icons-material";

type SelectOptions = string | undefined | null;

interface IPropTypes {
   category: SelectOptions;
   projectType: SelectOptions;
   joined: number;
   uploadImages: number;
}

const SelectedManager: FC<IPropTypes> = ({
   category,
   projectType,
   joined,
   uploadImages,
}) => {
   return (
      <Paper
         sx={{
            borderRadius: "1px",
            px: 3,
            py: 1.8,
            my: 0.5,
            mb: 2.5,
         }}
         elevation={1}
      >
         <Typography
            textTransform="uppercase"
            variant="plain"
            level="body2"
            endDecorator={<SettingsSuggest fontSize="small" />}
            mb={1}
            sx={{ color: "gray" }}
         >
            Selected Manager
         </Typography>

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
               disabled={!category}
            >
               {category ? category : "Not Found!"}
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
               disabled={!projectType}
            >
               {projectType ? projectType : "Not Found!"}
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
               disabled={joined === 0}
            >
               {joined} Person(s)
            </Chip>
         </Box>
         <Box display="flex" alignItems="center">
            <Typography
               level="body2"
               component="h2"
               startDecorator={<AddPhotoAlternate fontSize="small" />}
            >
               Uploaded Photos
            </Typography>
            <Chip
               variant="outlined"
               color="warning"
               size="sm"
               sx={{ ml: "auto" }}
               disabled={uploadImages === 0}
            >
               {uploadImages} Picture(s)
            </Chip>
         </Box>
      </Paper>
   );
};

export default SelectedManager;
