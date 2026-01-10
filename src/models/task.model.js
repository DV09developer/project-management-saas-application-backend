import mongoose , { Schema } from "mongoose";

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
    },
    subTask: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task"
        }
    ],
    CreatedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    estimatedTime: {
        type: String,
    },
    taskAssignedTo: [
        {
            type : Schema.Types.ObjectId,
            ref: "User",
        }
    ]
})

export const Task = mongoose.model("Task" , TaskSchema);