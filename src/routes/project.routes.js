import { Project } from "../models/project.model.js"
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js"

const createProject = asyncHandler(async (req, res) => {
    const { projectname } = req.body;

    if (!projectname) {
        throw new apiError(444 , "Project name is required")
    }

    const ownerId = req.user.id;
    if (!ownerId) {
        throw new apiError(401 , "Unauthorized");
    }

    const addProject = await Project.create({
        projectname,
        createdByUser : ownerId
    })

    if (!addProject) {
        throw apiError(500 , "Project creation failed")
    }

    return res.status(201).json(
        new apiResponse(201 , video , "Project created successfully")
    );
})

const addTaskStatus = asyncHandler(async (req, res) => {
    // const {}
})

export { createProject }