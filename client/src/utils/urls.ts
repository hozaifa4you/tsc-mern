export enum MenuUrls {
	Home = "/",
	Projects = "/projects",
	Peoples = "/peoples",
	Contact = "/contact",
	Test = "/test",
	Login = "/login",
}

export enum EStatus {
	UpComing = "up coming",
	Progressing = "progressing",
	End = "end",
	Cancel = "cancel",
	Rejected = "rejected",
}

export enum ProjectType {
	Public = "Public",
	Closed = "Closed",
	Secret = "Secret",
	Private = "Private",
}

export enum EUserTypes {
	CEO = "ceo", // TODO can create new user {All user}
	Manager = "manager", // TODO can create new user not ECO
	DepartmentHead = "department-head", // TODO can create new user not above
	Admin = "admin", // TODO can create new user {All not CEO and  above}
	Dev = "developer", // TODO can create new user {but restricted}
	Supervisor = "supervisor", // TODO can create only new user
	Instructor = "instructor", // TODO can't create new user
	Stuff = "stuff", // TODO can't create new user
	User = "user", // TODO can't create new user
}

export enum EEventStatus {
	UpComing = "up coming",
	Progressing = "progressing",
	End = "end",
	Cancel = "cancel",
}

export const tagColorVerify = (status: EStatus): string => {
	if (status === EStatus.UpComing) {
		return "magenta";
	} else if (status === EStatus.Progressing) {
		return "blue";
	} else if (status === EStatus.End) {
		return "gold";
	} else if (status === EStatus.Cancel) {
		return "red";
	} else {
		return "geekblue";
	}
};

export const tagColorVerifyForList = (userType: EUserTypes): string => {
	if (userType === EUserTypes.CEO) {
		return "magenta";
	} else if (userType === EUserTypes.Admin) {
		return "red";
	} else if (userType === EUserTypes.DepartmentHead) {
		return "volcano";
	} else if (userType === EUserTypes.Dev) {
		return "gold";
	} else if (userType === EUserTypes.Instructor) {
		return "green";
	} else if (userType === EUserTypes.Manager) {
		return "cyan";
	} else if (userType === EUserTypes.Stuff) {
		return "geekblue";
	} else if (userType === EUserTypes.Supervisor) {
		return "purple";
	} else {
		return "lime";
	}
};

export interface CommonUsers {
	name: string
	username: string
}

export interface IProjectDoc {
	creator: CommonUsers;
	date: Date;
	status: EStatus;
	desc: string;
	photos: string[];
}


export interface IEventsData {
	creator: CommonUsers;
	eventName: string;
	createDate: Date;
	startingDate: Date;
	endDate: Date;
	desc: string;
	status: EEventStatus;
	photo: string;
}

export interface ITeamResponseData {
	good: string[]
	positive: string[]
	nothing: string[]
	bad: string[]
}