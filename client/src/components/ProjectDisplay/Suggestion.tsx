import { FC } from "react";
import { FiberManualRecord, PostAdd } from "@mui/icons-material";
import { Button, Divider, Typography } from "@mui/joy";
import { Avatar, Box, Grid, Paper } from "@mui/material";
import { Input } from "antd";
import moment from "moment";

import { ISuggestions } from "../../utils/types";
import { useAppSelector } from "../../app/hooks";
import { selectLogin } from "../../redux/reducer/authenticationSlice";

interface IPropTypes {
   suggestions: ISuggestions[] | undefined;
}

const Suggestion: FC<IPropTypes> = ({ suggestions }) => {
   console.log(suggestions);

   const { user, isAuth, token } = useAppSelector(selectLogin);

   return (
      <Grid item xs={12} sm={12}>
         <Paper>
            <Typography p={2} level="h6">
               Suggestions
            </Typography>
            {isAuth && token && (
               <Box p={2} display="flex" flexDirection="column">
                  <Box display="flex" gap={1}>
                     <Avatar
                        sx={{ width: "45px", height: "45px" }}
                        variant="circular"
                        src={`/${user?.avatar}`}
                     />
                     <Input.TextArea
                        style={{ width: "100%", height: "130px" }}
                        placeholder="What is your suggestions about the project?"
                     />
                  </Box>
                  <Button
                     sx={{ marginLeft: "auto", mt: 1.5 }}
                     variant="soft"
                     size="sm"
                     startDecorator={<PostAdd />}
                  >
                     Post a suggestion
                  </Button>
               </Box>
            )}
            <Divider />

            {suggestions?.map((suggestion) => (
               <Box px={3} py={1} display="flex" gap={2} key={suggestion._id}>
                  <Avatar
                     sx={{ width: "45px", height: "45px" }}
                     variant="rounded"
                     src={`/${suggestion.user?.avatar}`}
                  />
                  <Box sx={{ my: 1 }}>
                     <Box display="flex" gap={1} alignItems="center">
                        <Typography
                           level="body2"
                           fontWeight="lg"
                           component="span"
                           sx={{ color: "#000" }}
                        >
                           {suggestion?.user?.name}
                        </Typography>{" "}
                        <FiberManualRecord sx={{ fontSize: "7px" }} />
                        <Typography
                           level="body2"
                           fontWeight="sm"
                           component="span"
                        >
                           {moment(suggestion.date).fromNow()}
                        </Typography>
                     </Box>
                     <Typography level="body1" fontWeight="sm" color="neutral">
                        {suggestion.comment}
                     </Typography>
                  </Box>
               </Box>
            ))}
         </Paper>
      </Grid>
   );
};

export default Suggestion;
