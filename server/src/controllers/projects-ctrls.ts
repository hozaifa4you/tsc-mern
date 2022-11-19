/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

import Project from "../models/Project";

class ProjectsControllers {
   /**
    * @desc Get all projects
    * @method GET
    */
   async getAllProjects(req: Request, res: Response): Promise<void> {
      const projects = await Project.find({})
         .populate("creator", ["name", "username"])
         .populate("projectManager", ["name", "username"])
         .populate("joined", ["name"])
         .select("-password");

      res.status(200).json(projects);
   }

   /**
    * @desc create a project
    * @method POST
    */
   async createANewProject(req: Request, res: Response): Promise<void> {
      if (!req.body.title) {
         res.status(400);
         throw new Error("Title is required!");
      }
      await Project.create(req.body);
      res.status(201).json({ success: true, message: "new project created!" });
   }

   /**
    * @desc get a project by id
    * @method GET
    */
   async getAProjectById(req: Request, res: Response): Promise<void> {
      const project = await Project.findById(req.params.id);

      if (!project) {
         res.status(404);
         throw new Error("Project not found!");
      }

      res.status(200).json({ success: true, project: project });
   }

   /**
    * @desc update a project by id
    * @method PUT
    */
   async updateProjectById(req: Request, res: Response): Promise<void> {
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

      res.status(200).json({ success: true, project: pro });
   }

   /**
    * @desc delete a project by id
    * @method DELETE
    */
   async deleteProjectsById(req: Request, res: Response): Promise<void> {
      const project = await Project.findById(req.params.id);

      if (!project) {
         res.status(404);
         throw new Error("Project not found!");
      }

      await Project.findByIdAndDelete(req.params.id);

      res.status(200).json({ success: true, message: "Project was deleted" });
   }
}

export default new ProjectsControllers();
