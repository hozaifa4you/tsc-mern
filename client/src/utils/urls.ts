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
