import { Project } from "../models/project.model.js"
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js"

const createProject = asyncHandler(async (req, res) => {
    const { projectname } = req.body;

    if (!projectname) {
        throw new apiError(444 , "Project name is required")
    }
})