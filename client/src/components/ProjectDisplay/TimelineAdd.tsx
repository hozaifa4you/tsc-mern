import React from "react";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import Autocomplete from "@mui/joy/Autocomplete";

import { TimelineImageUpload } from "../../components";

import { EStatus } from "../../utils/urls";
import { Upload } from "@mui/icons-material";

const status = Object.values(EStatus);

const TimelineAdd = () => {
   return (
      <Grid item xs={12} sm={12} md={12}>
         <Paper sx={{ p: 3 }}>
            <form>
               <TextField
                  type="text"
                  name="title"
                  multiline
                  rows={4}
                  variant="outlined"
                  size="small"
                  fullWidth
                  label="Status Description"
               />

               <Autocomplete
                  placeholder="Select Status"
                  options={status}
                  sx={{ my: 2 }}
               />
               <TimelineImageUpload />

               <Box display="flex">
                  <Button
                     startIcon={<Upload />}
                     variant="outlined"
                     sx={{ my: 1, ml: "auto" }}
                  >
                     Submit
                  </Button>
               </Box>
            </form>
         </Paper>
      </Grid>
   );
};

export default TimelineAdd;
