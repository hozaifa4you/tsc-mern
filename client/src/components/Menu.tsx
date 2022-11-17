import { useState } from "react";
import {
   ListItemDecorator,
   Tabs,
   TabList,
   Tab,
   tabClasses,
   Box,
} from "@mui/joy";
import {
   HomeOutlined,
   Construction,
   Engineering,
   AlternateEmail,
} from "@mui/icons-material";
import {
   useLocation,
   useNavigate,
   Location,
   NavigateFunction,
} from "react-router-dom";

import { MenuUrls } from "../utils/urls";

const NavMenu = () => {
   const [index, setIndex] = useState<number>(0);
   const { pathname }: Location = useLocation();
   const navigate: NavigateFunction = useNavigate();

   // console.log(pathname);

   const colors = ["primary", "info", "danger", "success"] as const;

   return (
      <Box
         sx={{
            flexGrow: 1,
         }}
      >
         <Tabs
            size="sm"
            aria-label="Bottom Navigation"
            value={index}
            onChange={(event, value) => setIndex(value as number)}
            sx={(theme) => ({
               maxWidth: 400,
               mx: "auto",
               "--Tabs-gap": "8px",
               "--joy-shadowChannel":
                  theme.vars.palette[colors[index]].darkChannel,
               [`& .${tabClasses.root}`]: {
                  boxShadow: "none",
                  borderRadius: "sm",
                  whiteSpace: "nowrap",
                  transition: "0.3s",
                  fontWeight: "sm",
                  flex: 1,
                  [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                     opacity: 0.72,
                  },
               },
            })}
         >
            <TabList variant="plain" sx={{ "--List-decorator-size": "28px" }}>
               <Tab
                  orientation="vertical"
                  {...(pathname === MenuUrls.Home && {
                     variant: "soft",
                     color: "primary",
                  })}
                  onClick={() => navigate(MenuUrls.Home)}
               >
                  <ListItemDecorator>
                     <HomeOutlined
                        color={
                           pathname === MenuUrls.Home ? "primary" : "action"
                        }
                     />
                  </ListItemDecorator>
                  Home
               </Tab>
               <Tab
                  orientation="vertical"
                  {...(pathname === MenuUrls.Projects && {
                     variant: "soft",
                     color: "primary",
                  })}
                  onClick={() => navigate(MenuUrls.Projects)}
               >
                  <ListItemDecorator>
                     <Construction
                        color={
                           pathname === MenuUrls.Projects ? "primary" : "action"
                        }
                     />
                  </ListItemDecorator>
                  Projects
               </Tab>
               <Tab
                  orientation="vertical"
                  {...(pathname === MenuUrls.Peoples && {
                     variant: "soft",
                     color: "primary",
                  })}
                  onClick={() => navigate(MenuUrls.Peoples)}
               >
                  <ListItemDecorator>
                     <Engineering
                        color={
                           pathname === MenuUrls.Peoples ? "primary" : "action"
                        }
                     />
                  </ListItemDecorator>
                  Peoples
               </Tab>
               <Tab
                  orientation="vertical"
                  {...(pathname === MenuUrls.Contact && {
                     variant: "soft",
                     color: "primary",
                  })}
                  onClick={() => navigate(MenuUrls.Contact)}
               >
                  <ListItemDecorator>
                     <AlternateEmail
                        color={
                           pathname === MenuUrls.Contact ? "primary" : "action"
                        }
                     />
                  </ListItemDecorator>
                  Contact
               </Tab>
            </TabList>
         </Tabs>
      </Box>
   );
};

export default NavMenu;
