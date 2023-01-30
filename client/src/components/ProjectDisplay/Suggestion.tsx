import { FC, useState } from "react";
import { Delete, Edit, FiberManualRecord, PostAdd } from "@mui/icons-material";
import { Button, Divider, IconButton, Typography } from "@mui/joy";
import { Avatar, Box, Grid, Paper } from "@mui/material";
import { Input } from "antd";
import { AxiosRequestConfig } from "axios";
import moment from "moment";
import { toast } from "react-hot-toast";

import { ISuggestions } from "../../utils/types";
import { useAppSelector } from "../../app/hooks";
import { selectLogin } from "../../redux/reducer/authenticationSlice";
import { API } from "../../app/API";
import { Loader } from "../../components";
import { toastSuccessStyle, toastWarningStyle } from "../../utils/toastStyling";

interface IPropTypes {
   suggestions: ISuggestions[] | undefined;
   projectId: string;
}

interface SuggestionResponse {
   success: true;
   message: string;
}

const Suggestion: FC<IPropTypes> = ({ suggestions, projectId }) => {
   const [comment, setComment] = useState<string>("");
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const { user, isAuth, token } = useAppSelector(selectLogin);

   const submitSuggestion = async () => {
      try {
         setIsLoading(true);

         const config: AxiosRequestConfig = {
            headers: { authorization: `Bearer ${token}` },
         };
         const { data } = await API.post<SuggestionResponse>(
            `/api/v1/projects/suggestions/add/${projectId}`,
            { comment },
            config
         );
         setIsLoading(false);
         if (data.success) {
            toast.success(data.message, toastSuccessStyle);
         }
      } catch (err: any) {
         setIsLoading(false);
         const errMsg = err.response.data.message || err.message;
         toast.error(errMsg, toastWarningStyle);
      }
   };

   if (isLoading) return <Loader />;

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
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                     />
                  </Box>
                  <Button
                     sx={{ marginLeft: "auto", mt: 1.5 }}
                     variant="soft"
                     size="sm"
                     startDecorator={<PostAdd />}
                     disabled={!comment}
                     onClick={submitSuggestion}
                  >
                     Post a suggestion
                  </Button>
               </Box>
            )}
            <Divider />

            {suggestions?.map((suggestion) => (
               <Box
                  px={3}
                  py={1}
                  display="flex"
                  gap={2}
                  key={suggestion._id}
                  alignItems="center"
               >
                  <Avatar
                     sx={{ width: "35px", height: "35px" }}
                     variant="rounded"
                     src={`/${suggestion.user?.avatar}`}
                  />
                  <Box sx={{ my: 1 }}>
                     <Box display="flex" alignItems="center" gap={3}>
                        <Box display="flex" gap={1} alignItems="center">
                           <Typography
                              level="body2"
                              fontWeight="lg"
                              component="span"
                              sx={{ color: "#000" }}
                           >
                              {suggestion?.user?.name}
                           </Typography>
                           <FiberManualRecord sx={{ fontSize: "7px" }} />
                           <Typography
                              level="body2"
                              fontWeight="sm"
                              component="span"
                           >
                              {moment(suggestion.date).fromNow()}
                           </Typography>
                        </Box>
                        {suggestion.user?._id.toString() ===
                           user?._id.toString() && (
                           <Box>
                              <IconButton
                                 size="sm"
                                 variant="plain"
                                 color="info"
                              >
                                 <Edit sx={{ fontSize: "15px" }} />
                              </IconButton>
                              <IconButton
                                 size="sm"
                                 variant="plain"
                                 color="danger"
                              >
                                 <Delete sx={{ fontSize: "15px" }} />
                              </IconButton>
                           </Box>
                        )}
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
