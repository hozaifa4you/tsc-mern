import { FunctionComponent } from "react";
import {
   Avatar,
   Box,
   Divider,
   ListItemIcon,
   Menu,
   MenuItem,
   Typography,
} from "@mui/material";
import { Logout, Settings, Edit, PermDataSetting } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, selectLogin } from "../redux/reducer/authenticationSlice";

interface IAcSettingsProps {
   anchorEl: HTMLElement | null;
   open: boolean;
   handleClose: () => void;
}

const AccountSettings: FunctionComponent<IAcSettingsProps> = ({
   anchorEl,
   open,
   handleClose,
}) => {
   const dispatch = useAppDispatch();
   const { user } = useAppSelector(selectLogin);

   return (
      <Menu
         anchorEl={anchorEl}
         id="account-menu"
         open={open}
         onClose={handleClose}
         onClick={handleClose}
         PaperProps={{
            elevation: 0,
            sx: {
               overflow: "visible",
               filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
               mt: 1.5,
               "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
               },
               "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
               },
            },
         }}
         transformOrigin={{ horizontal: "right", vertical: "top" }}
         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
         <MenuItem>
            <Avatar sizes="small" />
            <Box>
               <Typography>{user?.name}</Typography>
               <Typography variant="caption" color="primary" component="p">
                  View Profile
               </Typography>
            </Box>
         </MenuItem>
         <Divider />
         <MenuItem>
            <ListItemIcon>
               <PermDataSetting fontSize="small" color="info" />
            </ListItemIcon>
            Projects
         </MenuItem>
         <MenuItem>
            <ListItemIcon>
               <Edit fontSize="small" color="info" />
            </ListItemIcon>
            Edit Profile
         </MenuItem>
         <MenuItem>
            <ListItemIcon>
               <Settings fontSize="small" color="info" />
            </ListItemIcon>
            Settings
         </MenuItem>
         <MenuItem onClick={() => dispatch(logout())}>
            <ListItemIcon>
               <Logout fontSize="small" color="error" />
            </ListItemIcon>
            Logout
         </MenuItem>
      </Menu>
   );
};

export default AccountSettings;
