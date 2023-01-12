import { NextFunction, Request, Response } from "express";
import fs, { Stats } from "fs";

import Project, { ISuggestions } from "../models/Project";

class ProjectsControllers {
   /**
    * @desc Get all projects
    * @method GET
    */
   async getAllProjects(req: Request, res: Response): Promise<void> {
      const projects = await Project.find({})
         .populate("creator", ["name", "username"])
         .populate("projectManager", ["name", "username"])
         .populate("joined", ["name", "username"])
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

   /**
    * @desc add a suggestion
    * @method POST
    * @route /api/v1/projects/suggestions/add/:project_id
    */
   async addSuggestions(req: Request, res: Response) {
      const projectId = req.params.project_id;
      const comment = req.body.comment;

      const project = await Project.findById(projectId).populate(
         "suggestion.user",
         ["username", "name", "_id", "avatar"]
      );

      if (!project) {
         res.status(404);
         throw new Error("Project not found with the id " + projectId);
      }

      const suggestionsUserId = project.suggestion.map((x) => x.user._id);
      if (!suggestionsUserId.length) {
         if (!comment) {
            res.status(400);
            throw new Error("Comment must not be empty! 🥵😡");
         }
         const commentPayload: ISuggestions = {
            user: req.user?.id,
            date: new Date(),
            comment,
         };
         project.suggestion.push(commentPayload);
         await project.save();
         res.status(200).json({
            success: true,
            message: "You commented the project!  🤪😍",
         });
      } else {
         if (
            suggestionsUserId.filter(
               (x) => x.toString() === req.user?.id.toString()
            ).length
         ) {
            res.status(400);
            throw new Error("You already commented the project! 😡🥵");
         } else {
            if (!comment) {
               res.status(400);
               throw new Error("Comment must not be empty! 🥵😡");
            }
            const commentPayload: ISuggestions = {
               user: req.user?.id,
               date: new Date(),
               comment,
            };
            project.suggestion.push(commentPayload);
            await project.save();
            res.status(200).json({
               success: true,
               message: "You commented the project!  🤪😍",
            });
         }
      }
   }
}

export default new ProjectsControllers();
