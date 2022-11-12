import * as React from "react";
import Box from "@mui/joy/Box";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import ConstructionIcon from "@mui/icons-material/Construction";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const NavMenu = () => {
   const [index, setIndex] = React.useState(0);
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
                  {...(index === 0 && { variant: "soft", color: colors[0] })}
               >
                  <ListItemDecorator>
                     <HomeOutlined />
                  </ListItemDecorator>
                  Home
               </Tab>
               <Tab
                  orientation="vertical"
                  {...(index === 1 && { variant: "soft", color: colors[0] })}
               >
                  <ListItemDecorator>
                     <ConstructionIcon />
                  </ListItemDecorator>
                  Projects
               </Tab>
               <Tab
                  orientation="vertical"
                  {...(index === 2 && { variant: "soft", color: colors[0] })}
               >
                  <ListItemDecorator>
                     <EngineeringIcon />
                  </ListItemDecorator>
                  Peoples
               </Tab>
               <Tab
                  orientation="vertical"
                  {...(index === 3 && { variant: "soft", color: colors[0] })}
               >
                  <ListItemDecorator>
                     <AlternateEmailIcon />
                  </ListItemDecorator>
                  Contact
               </Tab>
            </TabList>
         </Tabs>
      </Box>
   );
};

export default NavMenu;
