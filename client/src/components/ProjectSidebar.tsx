import { useEffect } from "react";
import {
   ClassOutlined,
   KeyboardArrowRight,
   Storm,
   TypeSpecimen,
} from "@mui/icons-material";
import {
   List,
   ListItem,
   ListItemButton,
   ListItemDecorator,
   Typography,
   useTheme,
} from "@mui/joy";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { fetchCategories, selectUtils } from "../redux/reducer/utilsSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { EStatus, ProjectType } from "../utils/urls";
import { Paper } from "@mui/material";

const status = Object.values(EStatus);
const types = Object.values(ProjectType);

const ProjectSidebar = () => {
   const { categories } = useAppSelector(selectUtils);
   const dispatch = useAppDispatch();
   const theme = useTheme();

   const { search } = useLocation();
   console.log(search);

   const styleObj = {
      transition: "all .3s",
      fontFamily: "Poppins",
      textDecoration: "none",
      color: theme.palette.text.tertiary,
      "&:hover": {
         color: "#1976d2",
      },
   };

   useEffect(() => {
      if (!categories) {
         dispatch(fetchCategories());
      }
   }, [categories, dispatch]);

   return (
      <Paper style={{ margin: "0px 40px 30px 0px", background: "#fff" }}>
         <List
            sx={{
               maxWidth: 320,
               "--List-gap": "-8px",
            }}
         >
            {/* HACK project status */}
            <ListItem endAction={<KeyboardArrowRight />}>
               <ListItemButton
                  color="primary"
                  sx={{ fontWeight: 500, mb: 0.2 }}
               >
                  <ListItemDecorator>
                     <Storm />
                  </ListItemDecorator>
                  Project Status
               </ListItemButton>
            </ListItem>
            {status
               ? status.map((status, index) => (
                    <ListItem key={index}>
                       <>
                          <ListItemDecorator />
                          <Typography
                             fontSize="sm"
                             textTransform="capitalize"
                             component={Link}
                             to={{
                                pathname: "/projects",
                                search: `status=${status}`,
                             }}
                             //   onClick={(event) => event.preventDefault()}
                             sx={styleObj}
                          >
                             {status}
                          </Typography>
                       </>
                    </ListItem>
                 ))
               : null}

            {/* HACK end status */}
            {/* HACK project types */}
            <ListItem endAction={<KeyboardArrowRight />}>
               <ListItemButton color="info" sx={{ fontWeight: 500, mb: 0.2 }}>
                  <ListItemDecorator>
                     <TypeSpecimen />
                  </ListItemDecorator>
                  Project Types
               </ListItemButton>
            </ListItem>
            {types
               ? types.map((type, index) => (
                    <ListItem key={index}>
                       <>
                          <ListItemDecorator />
                          <Typography
                             fontSize="sm"
                             textTransform="capitalize"
                             component={Link}
                             to={{
                                pathname: "/projects",
                                search: `type=${type}`,
                             }}
                             sx={styleObj}
                          >
                             {type}
                          </Typography>
                       </>
                    </ListItem>
                 ))
               : null}

            {/* HACK end project types */}
            {/* HACK categories */}
            <ListItem endAction={<KeyboardArrowRight />}>
               <ListItemButton color="danger" sx={{ fontWeight: 500, mb: 0.2 }}>
                  <ListItemDecorator>
                     <ClassOutlined />
                  </ListItemDecorator>
                  Categories
               </ListItemButton>
            </ListItem>
            {categories
               ? categories.map((category) => (
                    <ListItem key={category}>
                       <>
                          <ListItemDecorator />
                          <Typography
                             fontSize="sm"
                             textTransform="capitalize"
                             component={Link}
                             to={{
                                pathname: "/projects",
                                search: `category=${category}`,
                             }}
                             sx={styleObj}
                          >
                             {category}
                          </Typography>
                       </>
                    </ListItem>
                 ))
               : null}

            {/* HACK end categories */}
         </List>
      </Paper>
   );
};

export default ProjectSidebar;
