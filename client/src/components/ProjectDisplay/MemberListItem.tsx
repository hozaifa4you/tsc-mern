import { FC } from "react";
import { MoreVert } from "@mui/icons-material";
import { Box, List, ListItem, Typography } from "@mui/joy";
import { Avatar, useTheme } from "@mui/material";
import { Tag } from "antd";

interface IPrpsTypes {}

const MemberListItem: FC<IPrpsTypes> = () => {
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
                     <Tag color="magenta">Manager</Tag>
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
                  />
                  <Box>
                     <Typography fontWeight={"sm"} level="h6">
                        Yousuf Ahmad
                     </Typography>
                     <div
                        style={{
                           display: "flex",
                           gap: "20px",
                           alignItems: "center",
                        }}
                     >
                        <Typography
                           level="body2"
                           sx={{
                              color: theme.palette.grey[600],
                           }}
                           fontWeight="sm"
                           fontStyle="italic"
                        >
                           12 Dec 2022
                        </Typography>
                        <Typography
                           sx={{
                              color: theme.palette.grey[400],
                           }}
                           fontWeight="sm"
                           fontSize="sm"
                           textTransform="uppercase"
                        >
                           Team Leader
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
