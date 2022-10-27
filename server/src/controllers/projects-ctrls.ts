/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

import Project from "../models/Project";

class ProjectsControllers {
   /**
    * @desc Get all projects
    * @method GET
    */
   async getAllProjects(req: Request, res: Response): Promise<Response> {
      const projects = await Project.find({});
      return res.status(200).json(projects);
   }

   /**
    * @desc create a project
    * @method POST
    */
   async createANewProject(req: Request, res: Response): Promise<Response> {
      if (!req.body.title) {
         res.status(400);
         throw new Error("Title is required!");
      }
      await Project.create(req.body);
      return res
         .status(201)
         .json({ success: true, message: "new project created!" });
   }

   /**
    * @desc get a project by id
    * @method GET
    */
   async getAProjectById(req: Request, res: Response): Promise<Response> {
      const project = await Project.findById(req.params.id);

      if (!project) {
         res.status(404);
         throw new Error("Project not found!");
      }

      return res.status(200).json({ success: true, project: project });
   }

   /**
    * @desc update a project by id
    * @method PUT
    */
   async updateProjectById(req: Request, res: Response): Promise<Response> {
      if (!req.body.title) {
         res.status(400);
         throw new Error("Title is required!");
      }

      const project = await Project.findById(req.params.id);
      if (!project) {
         res.status(404);
         throw new Error("Project not found!");
      }

      const pro = await Project.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
      });

      return res.status(200).json({ success: true, project: pro });
   }

   /**
    * @desc delete a project by id
    * @method DELETE
    */
   async deleteProjectsById(req: Request, res: Response): Promise<Response> {
      const project = await Project.findById(req.params.id);

      if (!project) {
         res.status(404);
         throw new Error("Project not found!");
      }

      await Project.findByIdAndDelete(req.params.id);

      return res
         .status(200)
         .json({ success: true, message: "Project was deleted" });
   }
}

export default new ProjectsControllers();
