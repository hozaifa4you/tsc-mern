import { FC } from "react";
import { Grid, Paper, styled, useTheme } from "@mui/material";
import { Chip, Link, Typography } from "@mui/joy";
import {
   AddModerator,
   Attachment,
   Cancel,
   CheckCircle,
   ClassOutlined,
   Diversity1,
   EventRepeat,
   Fingerprint,
   Flaky,
   Gamepad,
   HourglassBottom,
   Http,
   ManageAccounts,
   MoreTime,
   PersonAdd,
   Title,
   TypeSpecimen,
   Visibility,
   WorkOutlined,
} from "@mui/icons-material";

import { EStatus } from "../../utils/urls";

const CustomUl = styled("ul")(() => ({
   listStyle: "none",
   display: "flex",
   marginBottom: "8px",
   alignItems: "center",
   "& > li > p": {
      fontSize: "14px",
   },
   "& > li:nth-of-type(1)": {
      width: "40%",
   },
   "& > li:nth-of-type(2)": {
      width: "60%",
   },
}));

interface ICusComPropsTypes {
   text: string;
   isLink?: boolean;
   link?: string;
   name: string;
   icon?: JSX.Element;
}

const iconFixForStatus = (status: EStatus): JSX.Element => {
   console.log(status === EStatus.Progressing);

   switch (status) {
      case EStatus.UpComing:
         return <HourglassBottom fontSize="small" />;

      case EStatus.Progressing:
         return <WorkOutlined fontSize="small" />;

      case EStatus.Rejected:
         return <Flaky fontSize="small" />;

      case EStatus.End:
         return <CheckCircle fontSize="small" />;

      default:
         return <Cancel fontSize="small" />;
   }
};

const CustomComponent: FC<ICusComPropsTypes> = ({
   text,
   isLink,
   link,
   name,
   icon,
}) => {
   const theme = useTheme();

   return (
      <CustomUl>
         <li>
            <Typography
               sx={{ color: theme.palette.grey[800] }}
               startDecorator={icon}
               fontWeight="md"
            >
               {name}
            </Typography>
         </li>
         <li>
            {name === "Category" ? (
               <Chip size="sm" variant="soft" color="success">
                  {text}
               </Chip>
            ) : name === "Type" ? (
               <Chip size="sm" variant="soft" color="info">
                  {text}
               </Chip>
            ) : name === "Status" ? (
               <Chip
                  size="sm"
                  variant="outlined"
                  color="danger"
                  startDecorator={iconFixForStatus(text as EStatus)}
                  sx={{ textTransform: "capitalize" }}
               >
                  {text}
               </Chip>
            ) : (
               <Typography
                  fontWeight="sm"
                  component={isLink ? Link : "p"}
                  href={link && isLink ? link : ""}
                  color={isLink ? "primary" : "neutral"}
               >
                  {text}
               </Typography>
            )}
         </li>
      </CustomUl>
   );
};

const SingleUtils = () => {
   return (
      <Grid item xs={12} sm={12}>
         <Paper variant="outlined" sx={{ p: 1.5, width: "368px" }}>
            <CustomComponent
               icon={<Fingerprint fontSize="small" />}
               text="#626781"
               name="Project ID"
            />
            <CustomComponent
               icon={<MoreTime fontSize="small" />}
               text="10 Apr 1995 12:00 AM"
               name="Created"
            />
            <CustomComponent
               icon={<EventRepeat fontSize="small" />}
               text="10 Apr 1996 12:00 AM"
               name="Last Update"
            />
            <CustomComponent
               text="Yousuf Ahamad"
               icon={<PersonAdd fontSize="small" />}
               name="Created"
               isLink
               link="/users/profile/id"
            />
            <CustomComponent
               icon={<ManageAccounts fontSize="small" />}
               text="Ismail Habib Khan"
               name="Director"
               isLink
               link="/users/profile/id"
            />
            <CustomComponent
               icon={<Gamepad fontSize="small" />}
               text="Eva Bhabi"
               name="Instructor"
               isLink
               link="/users/profile/id"
            />
            <CustomComponent
               icon={<Diversity1 fontSize="small" />}
               text="10 Person"
               name="Joined"
               isLink
               link="/users/profile/id"
            />
            <CustomComponent
               icon={<ClassOutlined fontSize="small" />}
               text="Programming"
               name="Category"
            />
            <CustomComponent
               icon={<AddModerator fontSize="small" />}
               text={EStatus.Progressing}
               name="Status"
            />
            <CustomComponent
               icon={<TypeSpecimen fontSize="small" />}
               text="Closed"
               name="Type"
            />
            <CustomComponent
               icon={<Visibility fontSize="small" />}
               text="710 Times"
               name="Read"
            />
            <CustomComponent
               icon={<Attachment fontSize="small" />}
               text="10 Documents"
               name="Media"
            />
            <CustomComponent
               icon={<Http fontSize="small" />}
               text="why-do-we-use-it"
               name="Slug"
            />
            <CustomComponent
               icon={<Title fontSize="small" />}
               text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, velit modi iure quidem ipsa distinctio."
               name="Title"
            />
         </Paper>
      </Grid>
   );
};

export default SingleUtils;
