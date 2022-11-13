import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { Alert as AlertJoy, IconButton } from "@mui/joy";
import { CheckCircle, CloseRounded } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import { Typography } from "@mui/material";
import { ColorPaletteProp } from "@mui/joy/styles";

export enum AlertVariant {
   PRIMARY = "primary",
   WARNING = "warning",
   DANGER = "danger",
   INFO = "info",
}

interface ICustomAlert {
   variant?: ColorPaletteProp;
}

interface IAlertType {
   color: string;
   icon: JSX.Element;
}

const CustomAlert: React.FunctionComponent<ICustomAlert> = ({ variant }) => {
   const [open, setOpen] = React.useState(false);

   let alert: IAlertType = { color: "primary", icon: <CheckCircle /> };

   if (variant === AlertVariant.PRIMARY) {
      alert = {
         color: variant,
         icon: <CheckCircle />,
      };
   } else if (variant === AlertVariant.WARNING) {
      alert = {
         color: variant,
         icon: <WarningIcon />,
      };
   } else if (variant === AlertVariant.DANGER) {
      alert = {
         color: variant,
         icon: <ReportIcon />,
      };
   } else if (variant === AlertVariant.INFO) {
      alert = {
         color: variant,
         icon: <InfoIcon />,
      };
   }

   const handleClick = () => {
      setOpen(true);
   };

   const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
   ) => {
      if (reason === "clickaway") {
         return;
      }

      setOpen(false);
   };

   return (
      <Stack spacing={2} sx={{ width: "100%" }}>
         <Button variant="outlined" onClick={handleClick}>
            Open success snackbar
         </Button>
         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <AlertJoy
               startDecorator={alert.icon}
               endDecorator={
                  <IconButton onClick={handleClose}>
                     <CloseRounded />
                  </IconButton>
               }
               color={variant}
               size="sm"
               variant="outlined"
            >
               <div style={{ width: "300px" }}>
                  <Typography fontWeight="lg" mt={0.25}>
                     This is Title
                  </Typography>
                  <Typography fontSize="sm" sx={{ opacity: 0.8 }}>
                     This is a time-sensitive Alert.
                  </Typography>
               </div>
            </AlertJoy>
         </Snackbar>
      </Stack>
   );
};

export default CustomAlert;
