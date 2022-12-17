import { FC } from "react";
import { MoreVert } from "@mui/icons-material";
import { Box, List, ListItem, Typography } from "@mui/joy";
import { Avatar, useTheme } from "@mui/material";
import { Tag } from "antd";

import { IUserPopulate } from "../../pages/SingleProjectDisplay";
import { tagColorVerifyForList } from "../../utils/urls";

interface IPropTypes {
   user: IUserPopulate;
}

const MemberListItem: FC<IPropTypes> = ({ user }) => {
   const theme = useTheme();

   return (
      <Box>
         <List>
            <ListItem
               sx={{ mb: 1 }}
               endAction={
                  <Box
                     display="flex"
                     alignItems="center"
                     justifyContent="center"
                     gap={1}
                  >
                     {/* FIXME project role is not setup */}
                     <Tag
                        color={tagColorVerifyForList(user.userType)}
                        style={{
                           textTransform:
                              user.userType === "ceo"
                                 ? "uppercase"
                                 : "capitalize",
                        }}
                     >
                        {user.userType}
                     </Tag>
                     <MoreVert
                        fontSize="small"
                        sx={{
                           color: theme.palette.grey[600],
                        }}
                     />
                  </Box>
               }
            >
               <Box display="flex" alignItems={"center"} gap={1.5}>
                  <Avatar
                     variant="rounded"
                     sx={{ width: "50px", height: "50px" }}
                     src={
                        user.avatar === "avatar.png"
                           ? "/avatar.png"
                           : user.avatar
                     }
                  />
                  <Box>
                     <Typography fontWeight={"md"} fontSize="sm" level="h6">
                        {user.name}
                     </Typography>
                     <div
                        style={{
                           display: "flex",
                           gap: "20px",
                           alignItems: "center",
                        }}
                     >
                        <Typography
                           sx={{
                              color: theme.palette.grey[400],
                           }}
                           fontWeight="sm"
                           fontSize="12px"
                           textTransform="uppercase"
                        >
                           {user.userType}
                        </Typography>
                        <Typography
                           level="body2"
                           sx={{
                              color: theme.palette.grey[600],
                           }}
                           fontWeight="sm"
                           fontStyle="italic"
                           fontSize="12px"
                        >
                           {/* FIXME join date is not specified  in database schema */}
                           12 Dec 2022
                        </Typography>
                     </div>
                  </Box>
               </Box>
            </ListItem>
         </List>
      </Box>
   );
};

export default MemberListItem;
