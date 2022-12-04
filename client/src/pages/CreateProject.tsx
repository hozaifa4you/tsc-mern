import {
   ChangeEvent,
   useState,
   SyntheticEvent,
   useEffect,
   FocusEvent,
} from "react";
import {
   Title,
   ManageAccounts,
   Check,
   CancelPresentation,
   KeyboardReturn,
   PublishedWithChanges,
   ClassOutlined,
   Gamepad,
   Diversity1,
   Http,
   Description,
   TypeSpecimen,
} from "@mui/icons-material";
import {
   Textarea,
   Typography,
   TextField,
   FormLabel,
   FormHelperText,
   Chip,
   useTheme,
   Button,
   Theme,
   Avatar,
} from "@mui/joy";
import { Box, Grid, Paper } from "@mui/material";
import { Container } from "@mui/material";
import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import type { UploadFile } from "antd/es/upload/interface";
import { toast } from "react-hot-toast";
import slugify from "react-slugify";
import { AxiosRequestConfig } from "axios";
import { customAlphabet } from "nanoid";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import { EStatus, ProjectType } from "../utils/urls";
import {
   Uploader,
   Breadcrumb,
   ProjectCreateOwner,
   SelectCreateOptions,
   SelectedUtils,
} from "../components";
import {
   toastErrorStyle,
   toastSuccessStyle,
   toastWarningStyle,
} from "../utils/toastStyling";
import { API } from "../app/API";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectLogin } from "../redux/reducer/authenticationSlice";
import { fetchProjects } from "../redux/reducer/projectsSlice";
import { selectUtils, fetchCategories } from "../redux/reducer/utilsSlice";

const backend_origin = process.env.REACT_APP_BACKEND_URL!;
const statusArray = Object.values(EStatus);
const projectTypes = Object.values(ProjectType);

type SelectOptions = string | undefined | null;

export interface IUsers {
   _id: string;
   name: string;
   username: string;
   avatar: string;
   userType: string;
}

interface IUserSelect {
   success: boolean;
   users: IUsers[];
}

interface ISlugResponse {
   success: boolean;
}

interface IProCreResponse {
   success: boolean;
   message: string;
}

const CreateProject = () => {
   const [status, setStatus] = useState<string>("");
   const [title, setTitle] = useState<string>("");
   const [slug, setSlug] = useState<string>("");
   const [proMan, setProMan] = useState<SelectOptions>("");
   const [desc, setDesc] = useState<string>("");
   const [instructor, setInstructor] = useState<SelectOptions>("");
   const [joined, setJoined] = useState<IUsers[]>([]);
   const [category, setCategory] = useState<SelectOptions>(null);
   const [proType, setProType] = useState<SelectOptions>("");
   const [fileList, setFileList] = useState<UploadFile[]>([]);

   const [categoryRes, setCategoryRes] = useState<string[]>([]); // TODO readonly don't save at database
   const [usersRes, setUsersRes] = useState<IUsers[]>([]); // TODO readonly don't save at database
   const theme: Theme = useTheme();
   const { token } = useAppSelector(selectLogin);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { categories } = useAppSelector(selectUtils);

   const [selectedMan, setSelectedMan] = useState<IUsers | null>(null);
   const [selectedInst, setSelectedInst] = useState<IUsers | null>(null);

   // console.log(fileList); // FIXME: should be remove

   // TODO generate slug
   const generateSlug = async (
      event: FocusEvent<HTMLInputElement, Element>
   ) => {
      const value = event.target.value;
      const initialSlug = slugify(value);

      try {
         const config: AxiosRequestConfig = {
            headers: { authorization: `Bearer ${token}` },
         };

         let payload: { slug: string } = { slug: initialSlug };

         const { data } = await API.post<ISlugResponse>(
            "/api/v1/projects/slug-test",
            payload,
            config
         );

         if (data.success) {
            setSlug(initialSlug);
         } else {
            toast.error(
               "Your generated slug is not unique, generating new slug 🥵🫥...",
               toastWarningStyle
            );
            const nanoid = customAlphabet(
               "abcdefghijklmnopqrest1234567890",
               10
            )();
            const secondSlug: string = initialSlug + "-" + nanoid;
            setSlug(secondSlug);
         }
      } catch (err: any) {
         let errMeg = err.response.data.message || err.message;
         toast.error(errMeg, toastErrorStyle);
      }
   };

   // HACK submit handler
   const submitHandler = async (event: SyntheticEvent) => {
      event.preventDefault();

      const photosArray = fileList.map((x) => {
         if (x.error) {
            return toast.error(
               "Some photo(s) are invalid, please remove",
               toastWarningStyle
            );
         } else {
            return {
               uid: x.uid,
               name: x.name,
               status: "done",
               url: `${backend_origin}/public/project-images/${x.response[0].filename}`,
            };
         }
      });

      const payload = {
         title,
         projectManager: proMan,
         desc,
         instructor,
         joined: joined.map((x) => x._id),
         status: status,
         category,
         projectType: proType,
         slug,
         photos: photosArray,
      };

      if (payload.photos.length === 0) {
         return toast.error(
            "Please add at least one photo! 🥵😡",
            toastWarningStyle
         );
      }
      if (!payload.status) {
         return toast.error(
            "Please add your project running status! 🥵😡",
            toastErrorStyle
         );
      }

      try {
         const config: AxiosRequestConfig = {
            headers: { authorization: `Bearer ${token}` },
         };

         const { data } = await API.post<IProCreResponse>(
            "/api/v1/projects/create-new-projects",
            payload,
            config
         );

         if (data.success) {
            toast.success(data.message, toastSuccessStyle);
         }
         dispatch(fetchProjects());
         navigate("/projects");
      } catch (err: any) {
         let errMsg = err.response.data.message || err.message;
         toast.error(errMsg, toastErrorStyle);
      }
   };

   // HACK user Effect
   useEffect(() => {
      console.log("useEffect check -> create project"); // FIXME: should be remove

      // HACK fetch category
      if (categories === null) {
         dispatch(fetchCategories());
      }
      if (categories?.length) {
         setCategoryRes(categories);
      }

      // HACK fetch users for select
      const fetchUsersSelect = async (): Promise<void> => {
         try {
            const config = {
               headers: {
                  authorization: `Bearer ${token}`,
               },
            };
            const { data } = await API.get<IUserSelect>(
               "/api/v1/users/select-users",
               config
            );

            setUsersRes(data.users);
         } catch (err: any) {
            toast.error(
               err.response.data.message || err.message,
               toastErrorStyle
            );
            throw err;
         }
      };

      if (!usersRes.length) {
         fetchUsersSelect();
      }
   }, [token, usersRes, categories, dispatch]);

   return (
      <>
         <Helmet>
            <title>Create New Project - Project Manager</title>
         </Helmet>
         <Container sx={{ my: 3 }} maxWidth="lg">
            <Breadcrumb
               secondLink="/projects"
               secondText="Projects"
               finalText="Create New Project"
            />
            <Typography
               fontFamily="Poppins"
               variant="plain"
               color="neutral"
               level="h4"
            >
               Create New Project
            </Typography>
            <form onSubmit={submitHandler}>
               <Grid container spacing={2.5}>
                  <Grid item sm={12} md={8}>
                     <Paper
                        sx={{ borderRadius: "1px", padding: 3 }}
                        elevation={1}
                     >
                        <TextField
                           color="primary"
                           label="Project Title"
                           placeholder="Enter a Title"
                           size="lg"
                           startDecorator={<Title fontSize="small" />}
                           sx={{ my: 1 }}
                           name="title"
                           value={title}
                           onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              setTitle(event.target.value)
                           }
                           onBlur={generateSlug}
                           required
                        />

                        <TextField
                           color="primary"
                           label="Project Slug"
                           placeholder="Enter a Slug"
                           size="lg"
                           startDecorator={<Http fontSize="small" />}
                           sx={{ my: 1 }}
                           name="slug"
                           value={slug}
                           onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              setSlug(event.target.value)
                           }
                           required
                        />
                        <FormHelperText>
                           Unique slug will generate there automatically
                        </FormHelperText>
                        <Grid container spacing={2}>
                           <Grid item xs={12} sm={6}>
                              <FormLabel sx={{ my: 0.8 }}>
                                 Select a Category
                              </FormLabel>

                              <Autocomplete
                                 placeholder="Categories"
                                 options={categoryRes}
                                 color="primary"
                                 size="lg"
                                 onChange={(event, newValue) => {
                                    setCategory(newValue);
                                 }}
                                 startDecorator={
                                    <ClassOutlined fontSize="small" />
                                 }
                                 required
                              />
                           </Grid>
                           <Grid item xs={12} sm={6}>
                              <FormLabel sx={{ my: 0.8 }}>
                                 Select Project Type
                              </FormLabel>
                              <Autocomplete
                                 required
                                 placeholder="Project Type"
                                 options={projectTypes}
                                 color="primary"
                                 size="lg"
                                 onChange={(event, newValue) => {
                                    setProType(newValue);
                                 }}
                                 startDecorator={
                                    <TypeSpecimen fontSize="small" />
                                 }
                              />
                           </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                           <Grid item xs={12} sm={6}>
                              <FormLabel sx={{ my: 0.8 }}>
                                 Select a Project Manager
                              </FormLabel>

                              <Autocomplete
                                 required
                                 placeholder="Manager"
                                 options={usersRes}
                                 getOptionLabel={(option) => {
                                    setSelectedMan(option);
                                    return option.name;
                                 }}
                                 renderOption={(props, option) => (
                                    <AutocompleteOption {...props}>
                                       <ListItemDecorator>
                                          <Avatar
                                             size="sm"
                                             variant="outlined"
                                             color="primary"
                                             src={`/${option.avatar}`}
                                          />
                                       </ListItemDecorator>
                                       <ListItemContent sx={{ fontSize: "sm" }}>
                                          {option.name}
                                          <Typography level="body3">
                                             @{option.username} /{" "}
                                             {option.userType}
                                          </Typography>
                                       </ListItemContent>
                                    </AutocompleteOption>
                                 )}
                                 color="primary"
                                 size="lg"
                                 onChange={(event, newValue) => {
                                    setProMan(newValue?._id);
                                 }}
                                 startDecorator={
                                    <ManageAccounts fontSize="small" />
                                 }
                              />
                           </Grid>
                           <Grid item xs={12} sm={6}>
                              <FormLabel sx={{ my: 0.8 }}>
                                 Select a Instructor
                              </FormLabel>
                              <Autocomplete
                                 required
                                 placeholder="Instructor"
                                 options={usersRes}
                                 getOptionLabel={(option) => {
                                    setSelectedInst(option);
                                    return option.name;
                                 }}
                                 renderOption={(props, option) => (
                                    <AutocompleteOption {...props}>
                                       <ListItemDecorator>
                                          <Avatar
                                             size="sm"
                                             variant="outlined"
                                             color="primary"
                                             src={
                                                option.avatar === "avatar.png"
                                                   ? "/avatar.png"
                                                   : option.avatar
                                             }
                                          />
                                       </ListItemDecorator>
                                       <ListItemContent sx={{ fontSize: "sm" }}>
                                          {option.name}
                                          <Typography level="body3">
                                             @{option.username} /{" "}
                                             {option.userType}
                                          </Typography>
                                       </ListItemContent>
                                    </AutocompleteOption>
                                 )}
                                 color="primary"
                                 size="lg"
                                 onChange={(event, newValue) => {
                                    setInstructor(newValue?._id);
                                 }}
                                 startDecorator={<Gamepad fontSize="small" />}
                              />
                           </Grid>
                        </Grid>

                        <FormLabel sx={{ my: 0.8 }}>
                           Select some initial join peoples
                        </FormLabel>

                        <Autocomplete
                           multiple
                           placeholder="Who Can Join"
                           options={usersRes}
                           getOptionLabel={(option) => option.name}
                           renderOption={(props, option) => (
                              <AutocompleteOption {...props}>
                                 <ListItemDecorator>
                                    {/* FIXME: fix the correct url */}
                                    <Avatar
                                       size="sm"
                                       variant="outlined"
                                       color="primary"
                                       src={
                                          option.avatar === "avatar.png"
                                             ? "/avatar.png"
                                             : option.avatar
                                       }
                                    />
                                 </ListItemDecorator>
                                 <ListItemContent sx={{ fontSize: "sm" }}>
                                    {option.name}
                                    <Typography level="body3">
                                       @{option.username} / {option.userType}
                                    </Typography>
                                 </ListItemContent>
                              </AutocompleteOption>
                           )}
                           color="primary"
                           size="lg"
                           onChange={(event, newValue) => {
                              setJoined(newValue);
                           }}
                           startDecorator={<Diversity1 fontSize="small" />}
                        />

                        <Box
                           sx={{
                              display: "flex",
                              gap: 1,
                              alignItems: "center",
                              border: "1px solid",
                              borderRadius: theme.radius.sm,
                              borderColor: theme.palette.primary[200],
                              padding: 2,
                              mt: 3,
                              mb: 2,
                           }}
                        >
                           <Box>
                              <Typography
                                 fontWeight="md"
                                 fontSize="lg"
                                 id="fav-movie"
                                 mb={2}
                              >
                                 Select Status Steps
                              </Typography>
                              <RadioGroup
                                 name="best-movie"
                                 aria-labelledby="best-movie"
                                 row
                                 sx={{ flexWrap: "wrap", gap: 1 }}
                              >
                                 {[...statusArray].map((name) => {
                                    const checked = status === name;
                                    return (
                                       <Chip
                                          sx={{ textTransform: "capitalize" }}
                                          key={name}
                                          variant={checked ? "soft" : "plain"}
                                          color={
                                             checked ? "primary" : "neutral"
                                          }
                                          startDecorator={
                                             checked && (
                                                <Check
                                                   sx={{
                                                      zIndex: 1,
                                                      pointerEvents: "none",
                                                   }}
                                                />
                                             )
                                          }
                                       >
                                          <Radio
                                             variant="outlined"
                                             color={
                                                checked ? "primary" : "neutral"
                                             }
                                             disableIcon
                                             overlay
                                             label={name}
                                             value={name}
                                             checked={checked}
                                             onChange={(event) => {
                                                if (event.target.checked) {
                                                   setStatus(name);
                                                }
                                             }}
                                          />
                                       </Chip>
                                    );
                                 })}
                              </RadioGroup>
                           </Box>
                        </Box>

                        <FormLabel sx={{ my: 0.8 }}>
                           Project Description
                        </FormLabel>
                        <Textarea
                           required
                           color="primary"
                           minRows={8}
                           size="lg"
                           variant="outlined"
                           sx={{ mb: 3 }}
                           name="desc"
                           value={desc}
                           onChange={(
                              event: ChangeEvent<HTMLTextAreaElement>
                           ) => setDesc(event.target.value)}
                           placeholder="Write some description about the project"
                           startDecorator={
                              <Chip
                                 variant="plain"
                                 color="primary"
                                 startDecorator={
                                    <Description fontSize="small" />
                                 }
                              >
                                 Description
                              </Chip>
                           }
                        />

                        {/* HACK uploader */}
                        <FormLabel sx={{ my: 0.8 }}>
                           Upload some photos fot the project.
                        </FormLabel>
                        <Uploader
                           fileList={fileList}
                           setFileList={setFileList}
                        />

                        <Box
                           sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginY: 2,
                           }}
                        >
                           <Button
                              variant="outlined"
                              color="warning"
                              startDecorator={
                                 <KeyboardReturn color="warning" />
                              }
                           >
                              Back
                           </Button>
                           <Box display="flex" gap={2}>
                              <Button
                                 variant="solid"
                                 color="danger"
                                 startDecorator={<CancelPresentation />}
                              >
                                 Cancel
                              </Button>
                              <Button
                                 variant="solid"
                                 color="primary"
                                 startDecorator={<PublishedWithChanges />}
                                 type="submit"
                              >
                                 Publish
                              </Button>
                           </Box>
                        </Box>
                     </Paper>
                  </Grid>
                  <Grid item sm={12} md={4}>
                     <ProjectCreateOwner />
                     <SelectCreateOptions
                        title="SELECTED MANAGER"
                        icon={<ManageAccounts fontSize="small" />}
                        positionColor="danger"
                        profileColor="primary"
                        projectColor="warning"
                        user={selectedMan}
                     />
                     <SelectCreateOptions
                        title="SELECTED Instructor"
                        icon={<Gamepad fontSize="small" />}
                        positionColor="primary"
                        profileColor="info"
                        projectColor="danger"
                        user={selectedInst}
                     />

                     <SelectedUtils
                        category={category}
                        projectType={proType}
                        joined={joined.length}
                        uploadImages={fileList.length}
                     />
                  </Grid>
               </Grid>
            </form>
         </Container>
      </>
   );
};

export default CreateProject;
