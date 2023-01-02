import { EUserTypes, EEventStatus, EStatus, ProjectType } from "./urls";

export interface IUserPopulate {
   _id: string;
   name: string;
   username: string;
   userType: EUserTypes;
   avatar: string;
}

export interface IPhotos {
   uid: string | number;
   name: string;
   status: string | "done";
   url: string;
   _id: string;
}

export interface ISuggestions {
   _id: string;
   user?: IUserPopulate;
   date?: Date;
   comment?: string;
}

export interface IEventTypes {
   _id: string;
   createDate: Date;
   creator: IUserPopulate;
   desc: string;
   endDate: Date;
   eventNames: string;
   startingDate: Date;
   status: EEventStatus;
   photo: string;
}

export interface IStatusTypes {
   _id: string;
   creator: IUserPopulate;
   date: Date;
   desc: string;
   photos: string[];
   status: EStatus;
}

interface ITeamResponse {
   bad: string[];
   good: string[];
   nothing: string[];
   positive: string[];
}

export interface IProject {
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

export interface IProjectResponse {
   success: true;
   project: IProject;
}
