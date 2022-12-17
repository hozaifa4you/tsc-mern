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
import moment from "moment";

import { EStatus } from "../../utils/urls";
import { IProject, IStatusTypes } from "../../pages/SingleProjectDisplay";

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

interface IPropType {
   data: IProject;
}

const iconFixForStatus = (status: EStatus): JSX.Element => {
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

const getDocumentLength = (status: IStatusTypes[]): number => {
   let num: number = 0;

   for (let i = 0; i < status.length; i++) {
      num = num + status[i].photos.length;
   }

   return num;
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

const SingleUtils: FC<IPropType> = ({ data }) => {
   return (
      <Grid item xs={12} sm={12}>
         <Paper variant="outlined" sx={{ p: 1.5, width: "368px" }}>
            <CustomComponent
               icon={<Fingerprint fontSize="small" />}
               text={`#${data._id}`}
               name="Project ID"
            />
            <CustomComponent
               icon={<MoreTime fontSize="small" />}
               text={moment(data.createdAt).format("llll")}
               name="Created"
            />
            <CustomComponent
               icon={<EventRepeat fontSize="small" />}
               text={moment(data.updatedAt).fromNow()}
               name="Last Update"
            />
            <CustomComponent
               text={data.creator.name}
               icon={<PersonAdd fontSize="small" />}
               name="Created"
               isLink
               link={`/users/${data.creator.username}`}
            />
            <CustomComponent
               icon={<ManageAccounts fontSize="small" />}
               text={data.projectManager.name}
               name="Director"
               isLink
               link={`/users/${data.projectManager.username}`}
            />
            <CustomComponent
               icon={<Gamepad fontSize="small" />}
               text={data.instructor.name}
               name="Instructor"
               isLink
               link={`/users/${data.instructor.username}`}
            />
            <CustomComponent
               icon={<Diversity1 fontSize="small" />}
               text={`${data.joined.length} Person`}
               name="Joined"
            />
            <CustomComponent
               icon={<ClassOutlined fontSize="small" />}
               text={data.category}
               name="Category"
            />
            <CustomComponent
               icon={<AddModerator fontSize="small" />}
               text={data.status[data.status.length - 1].status}
               name="Status"
            />
            <CustomComponent
               icon={<TypeSpecimen fontSize="small" />}
               text={data.projectType}
               name="Type"
            />
            <CustomComponent
               icon={<Visibility fontSize="small" />}
               text={`${data.readTime} Times Read`}
               name="Read"
            />
            <CustomComponent
               icon={<Attachment fontSize="small" />}
               text={`${
                  data.photos.length + getDocumentLength(data.status)
               } Documents`}
               name="Media"
            />
            <CustomComponent
               icon={<Http fontSize="small" />}
               text={data.slug}
               name="Slug"
            />
            <CustomComponent
               icon={<Title fontSize="small" />}
               text={data.title}
               name="Title"
            />
         </Paper>
      </Grid>
   );
};

export default SingleUtils;
