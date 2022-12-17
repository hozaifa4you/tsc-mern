import { NextFunction, Request, Response } from "express";
import fs, { Stats } from "fs";

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
      const body = req.body;

      if (!body.title) {
         res.status(400);
         throw new Error("Title is required!");
      }

      if (body?.love?.length || body?.suggestion?.length || body?.readTime) {
         res.status(500);
         throw new Error("Some unwanted value added! please remove! 😒🤪");
      }

      await Project.create({ ...req.body, creator: req.user?.id });
      res.status(201).json({ success: true, message: "new project created!" });
   }

   /**
    * @desc get a project by id
    * @method GET
    */
   async getAProjectById(req: Request, res: Response): Promise<void> {
      const project = await Project.findOne({
         slug: req.params.slug.toString(),
      })
         .populate("projectManager", ["name", "username", "userType", "avatar"])
         .populate("instructor", ["name", "username", "userType", "avatar"])
         .populate("joined", ["name", "username", "userType", "avatar"])
         .populate("suggestion", ["name", "username", "userType", "avatar"])
         .populate("creator", ["name", "username", "userType", "avatar"])
         .populate("status.creator", ["name", "username", "userType", "avatar"])
         .populate("suggestion.user", [
            "name",
            "username",
            "userType",
            "avatar",
         ])
         .populate("events.creator", ["name", "username", "userType", "avatar"])
         .select("-password");

      if (!project) {
         res.status(404);
         throw new Error("Project not found!");
      }

      project.readTime = project.readTime + 1;
      const savedProject = await project.save();
      res.status(200).json({ success: true, project: savedProject });
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

   async uploadProjectImage(req: Request, res: Response) {
      const file = req.files;
      res.status(200).send(file);
   }

   /**
    * @desc slug unique test
    * @method POST
    */
   async slugTest(req: Request, res: Response) {
      const slug = req.body.slug;

      const project = await Project.findOne({ slug });

      if (project) {
         res.status(200).json({ success: false });
      }

      if (!project) {
         res.status(200).json({ success: true });
      }
   }

   /**
    * @desc delete project photos
    * @method POST
    */
   async deletePhotos(req: Request, res: Response, next: NextFunction) {
      const photo = req.body.photo;
      if (!photo) {
         res.status(404);
         throw new Error("You din't provide photo name!");
      }

      // const state = fs.stat(`./public/project-images/${photo}`);

      fs.stat(
         `./public/project-images/${photo}`,
         function (err: NodeJS.ErrnoException | null, stats: Stats) {
            if (err) return next(err);
            else {
               fs.unlink(
                  `./public/project-images/${photo}`,
                  function (err: NodeJS.ErrnoException | null) {
                     if (err) return next(err);
                     else {
                        res.status(200).json({
                           success: true,
                           message: "Your image successfully deleted!",
                        });
                     }
                  }
               );
            }
         }
      );
   }
}

export default new ProjectsControllers();
