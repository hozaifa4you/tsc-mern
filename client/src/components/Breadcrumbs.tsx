import { FC } from "react";
import { Breadcrumbs, Link, Typography } from "@mui/joy";
import { Home, FolderCopy } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface IBreadcrumb {
   secondLink: string;
   secondText: string;
   isThird?: boolean;
   thirdLink?: string;
   thirdText?: string;
   finalText: string;
}

const BreadcrumbsCustom: FC<IBreadcrumb> = ({
   secondLink,
   secondText,
   isThird,
   thirdText,
   thirdLink,
   finalText,
}) => {
   const navigate = useNavigate();

   return (
      <Breadcrumbs
         separator="›"
         aria-label="breadcrumbs"
         sx={{ px: 0, py: 1.8 }}
      >
         <Link
            onClick={(event) => {
               event.preventDefault();
               navigate("/");
            }}
            underline="hover"
            color="primary"
            fontSize="inherit"
            href="/"
         >
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
         </Link>

         <Link
            onClick={(event) => {
               event.preventDefault();
               navigate(secondLink);
            }}
            underline="hover"
            color="primary"
            fontSize="inherit"
            href={secondLink}
         >
            <FolderCopy sx={{ mr: 0.5 }} fontSize="inherit" />
            {secondText}
         </Link>
         {isThird && thirdLink && thirdText ? (
            <Link
               onClick={(event) => {
                  event.preventDefault();
                  navigate(thirdLink);
               }}
               underline="hover"
               color="primary"
               fontSize="inherit"
               href={thirdLink}
            >
               <FolderCopy sx={{ mr: 0.5 }} fontSize="inherit" />
               {thirdText}
            </Link>
         ) : null}

         <Typography fontSize="inherit">{finalText}</Typography>
      </Breadcrumbs>
   );
};

export default BreadcrumbsCustom;
