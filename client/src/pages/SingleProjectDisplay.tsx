import { useState, useEffect } from "react";
import { Container } from "@mui/joy";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { API } from "../app/API";
import { EStatus, ProjectType } from "../utils/urls";
import { Breadcrumb, ProjectDisplayRight, ProjectTitle } from "../components";
import { Grid, Paper } from "@mui/material";

// ["name", "username", "userType", "avatar"]

interface IUserPopulate {
   _id: string;
   name: string;
   username: string;
   userType: string;
   avatar: string;
}

interface IPhotos {
   uid: string | number;
   name: string;
   status: string | "done";
   url: string;
   _id: string;
}

interface ISuggestions {
   _id: string;
   user?: IUserPopulate;
   date?: Date;
   comment?: string;
}

export interface IProject {
   title: string;
   creator: IUserPopulate;
   projectManager: IUserPopulate;
   desc: string;
   photos: IPhotos[];
   instructor: IUserPopulate;
   joined?: IUserPopulate[];
   status: EStatus;
   category: string;
   love?: string[];
   suggestion?: ISuggestions[];
   projectType: ProjectType;
   slug: string;
   readTime: number;
}

interface IProjectResponse {
   success: true;
   project: IProject;
}

const SingleProjectDisplay = () => {
   const [project, setProject] = useState<IProject | null>(null);

   const { slug } = useParams();

   useEffect(() => {
      const fetchProject = async () => {
         const { data } = await API.get<IProjectResponse>(
            `/api/v1/projects/find-projects/${slug}`
         );

         if (data.success) {
            setProject(data.project);
         }
      };
      fetchProject();
   }, [slug]);

   return (
      <div>
         <Container maxWidth="lg">
            <Breadcrumb
               finalText="Project Details"
               secondLink="/projects"
               secondText="Projects"
            />

            <Grid container spacing={3} mt={1}>
               <Grid item md={12} lg={8}>
                  {/* HACK title */}
                  <ProjectTitle />
               </Grid>
               <ProjectDisplayRight />
               <Grid item xs={12}>
                  <Paper>This is title</Paper>
               </Grid>
            </Grid>
         </Container>
      </div>
   );
};

export default SingleProjectDisplay;
