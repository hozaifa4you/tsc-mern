import { Request, Response, NextFunction } from "express";

class ProjectsControllers {
   /**
    * @desc Get all projects
    * @method GET
    */
   async getAllProjects(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (err) {}
   }

   /**
    * @desc create a project
    * @method POST
    */
   async createANewProject(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (err: any) {}
   }

   /**
    * @desc get a project by id
    * @method GET
    */
   async getAProjectById(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (err: any) {}
   }

   /**
    * @desc update a project by id
    * @method PUT
    */
   async updateProjectById(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (err: any) {}
   }

   /**
    * @desc delete a project by id
    * @method DELETE
    */
   async deleteProjectsById(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (err: any) {}
   }
}

export default new ProjectsControllers();
