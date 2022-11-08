import { IJwtPayload } from "./loginOptions";
import { EUsers } from "./../models/User";

// XXX Manager
export const createCeoACPermission = (userType: EUsers): boolean => {
   if (userType === EUsers.CEO) return true;
   else return false;
};
// XXX Manager
export const createManagerACPermission = (userType: EUsers): boolean => {
   if (userType === EUsers.Manager) return true;
   else return false;
};
// XXX Manager
export const createDepartmentHeadACPermission = (userType: EUsers): boolean => {
   if (userType === EUsers.Manager) return true;
   else return false;
};
// XXX Admin
export const createAdminACPermission = (userType: EUsers): boolean => {
   if (userType === EUsers.Admin) return true;
   else return false;
};
// XXX Developer
export const createDevACPermission = (userType: EUsers): boolean => {
   if (userType === EUsers.Dev) return true;
   else return false;
};
// XXX Supervisor
export const createSupervisorACPermission = (userType: EUsers): boolean => {
   if (userType === EUsers.Supervisor) return true;
   else return false;
};
// XXX Instructor
export const createInstructorACPermission = (userType: EUsers): boolean => {
   if (userType === EUsers.Instructor) return true;
   else return false;
};
// XXX Stuff
export const createStuffACPermission = (userType: EUsers): boolean => {
   if (userType === EUsers.Stuff) return true;
   else return false;
};
// XXX User
export const createUserACPermission = (userType: EUsers): boolean => {
   if (userType === EUsers.User) return true;
   else return false;
};

export const userTypeChecker = (
   user: IJwtPayload,
   setType: string
): boolean => {
   return true;
};
