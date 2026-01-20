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

    const {key , label , order , isFinal} = req.body;
    const project_id = req.params.id; 

    if (!key || !label || order === undefined) {
        throw new apiError(400, "Key, label and order are required");
    }

    // Check if project exists
    const project = await Project.findById(project_id);

    if (!project) {
        throw new apiError(404 , "Project is not exist please give proper the project id")
    }

    // Prevent duplicate status key
    const isDuplicate = project.taskStatuses.some(
        (status) => status.key === key
    );

    if (isDuplicate) {
        throw new apiError(409, "Task status key already exists");
    }

    if (isFinal) {
        project.taskStatuses.forEach(status => {
            status.isFinal = false;
        });
    }

     // Add new task status
    project.taskStatuses.push({
        key,
        label,
        order,
        isFinal: isFinal ?? false,
    });

    // Sort by order
    project.taskStatuses.sort((a, b) => a.order - b.order);

    await project.save();

    return res.status(201).json(
        new apiResponse(201 , updatedProject , "Task status is added")
    )
})

const updateProject = asyncHandler(async (req, res) => {})

export { createProject , updateProject , addTaskStatus }