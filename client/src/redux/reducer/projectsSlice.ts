import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import { RootState } from "../store";
import { STATUS } from "../STATUS";
import { API } from "../../app/API";
import { toastErrorStyle } from "../../utils/toastStyling";
import {
   CommonUsers,
   IEventsData,
   IProjectDoc,
   ITeamResponse,
   ITeamResponseData,
   ProjectType,
} from "../../utils/urls";
import { AxiosRequestConfig } from "axios";
import {
   IEventTypes,
   IStatusTypes,
   ISuggestions,
   IUserPopulate,
} from "../../utils/types";

interface IPhotos {
   uid: string | number;
   name: string;
   status: string | "done";
   url: string;
}

// export interface IProjects {
//    _id: string;
//    createdAt: Date;
//    updatedAt: Date;
//    title: string;
//    creator: CommonUsers;
//    projectManager: CommonUsers;
//    desc: string;
//    photos: IPhotos[];
//    instructor: CommonUsers;
//    joined: CommonUsers[];
//    status: IProjectDoc;
//    category: string;
//    love?: string[];
//    suggestion?: string[];
//    projectType: string;
//    slug: string;
//    readTime: number;
//    teamResponse: ITeamResponseData;
//    events?: IEventsData[];
// }

export interface IProjects {
   category: string;
   createdAt: Date;
   creator: IUserPopulate;
   desc: string;
   events: IEventTypes[];
   instructor: IUserPopulate;
   joined: IUserPopulate[];
   love?: string[];
   photos: IPhotos[];
   projectManager: IUserPopulate;
   projectType: ProjectType;
   readTime: number;
   slug: string;
   status: IStatusTypes[];
   suggestion?: ISuggestions[];
   teamResponse: ITeamResponse;
   title: string;
   updatedAt: Date;
   _id: string;
   _v: number;
}

interface IProjectsState {
   projects: IProjects[] | null;
   singleProject: IProjects | null;
   status?: STATUS;
   error?: null | object;
}

const initialState: IProjectsState = {
   projects: null,
   singleProject: null,
   status: STATUS.IDLE,
   error: null,
};
interface IProjectResponse {
   success: true;
   project: IProjects;
}

export const projectSlice = createSlice({
   name: "projects",
   initialState,
   reducers: {
      // HACK set projects at state
      setProjects(state, action: PayloadAction<IProjects[]>) {
         state.projects = action.payload;
      },
      setSingleProject(state, action: PayloadAction<IProjects>) {
         state.singleProject = action.payload;
      },
      removeProjects(state) {
         state.projects = null;
      },
      // HACK set status
      setStatus(state, action) {
         state.status = action.payload;
      },
      // HACK set error
      setError(state, action) {
         state.error = action.payload;
      },
   },
});

// TODO fetchProjects from database
export const fetchProjects = () => async (dispatch: Dispatch) => {
   dispatch(setStatus(STATUS.LOADING));

   try {
      const { data } = await API.get<IProjects[]>(
         "/api/v1/projects/get-all-projects"
      );
      dispatch(setProjects(data));
      dispatch(setStatus(STATUS.IDLE));
   } catch (err: any) {
      dispatch(setStatus(STATUS.ERROR));
      let err_message: string =
         err.response && err.response.data.message
            ? err.response.data.message
            : err.message;
      dispatch(setError(err_message));
      toast.error(err_message, toastErrorStyle);
   }
};

export const fetSingleProject =
   (slug: string) => async (dispatch: Dispatch) => {
      dispatch(setStatus(STATUS.LOADING));

      try {
         const { data } = await API.get<IProjectResponse>(
            `/api/v1/projects/find-projects/${slug}`
         );
      } catch (err: any) {
         dispatch(setStatus(STATUS.ERROR));
         const errMsg = err.response.data.message || err.message;
         dispatch(setError(errMsg));
         toast.error(errMsg, toastErrorStyle);
      }
   };

export const projectsRemove = () => (dispatch: Dispatch) => {
   dispatch(setStatus(STATUS.LOADING));
   dispatch(removeProjects());
   dispatch(setStatus(STATUS.IDLE));
};

//  TODO useSelector
export const selectProjects = (state: RootState) => state.projects;

const { setError, setStatus, setProjects, removeProjects, setSingleProject } =
   projectSlice.actions;
export default projectSlice.reducer;
