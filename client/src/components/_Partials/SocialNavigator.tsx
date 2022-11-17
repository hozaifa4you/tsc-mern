import { Box, useTheme, Theme } from "@mui/material";
import { Facebook, Twitter, Instagram, Pinterest } from "@mui/icons-material";

const SocialNavigator = () => {
   const theme: Theme = useTheme();

   const socialColor: string[] = ["#1877f2", "#ee1d52", " #1da1f2", " #bd081c"];
   const style = {
      listStyle: "none",
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      "& > li": {
         background: theme.palette.grey[300],
         padding: 1.1,
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
         borderRadius: "50%",
         cursor: "pointer",
         transition: "all .3s",
      },
      "& > li:nth-of-type(1):hover": {
         color: socialColor[0],
      },
      "& > li:nth-of-type(2):hover": {
         color: socialColor[1],
      },
      "& > li:nth-of-type(3):hover": {
         color: socialColor[2],
      },
      "& > li:nth-of-type(4):hover": {
         color: socialColor[3],
      },
   };

   return (
      <Box component="ul" sx={style}>
         <li>
            <Facebook fontSize="medium" />
         </li>
         <li>
            <Instagram fontSize="medium" />
         </li>
         <li>
            <Twitter fontSize="medium" />
         </li>
         <li>
            <Pinterest fontSize="medium" />
         </li>
      </Box>
   );
};

export default SocialNavigator;
