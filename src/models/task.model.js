import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
        subTask: [
            {
                type: Schema.Types.ObjectId,
                ref: "Task",
            },
        ],
        CreatedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        projectId: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        estimatedTime: {
            value: {
                type: Number,
            },
            unit: {
                type: String,
                enum: ["minutes", "hours", "days"],
            },
        },
        taskAssignedTo: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        status: {
            type: String,
            required: true,
            validate: {
                validator: async function (value) {
                    const project = await mongoose.model("Project").exists({
                        _id: this.projectId,
                        taskStatus: value,
                    });

                    return !!project;
                },
                message: "Invalid task status for this project",
            },
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
    },
    { timestamps: true }
);

// const project = await Project.findById(projectId);

// if (!project.taskStatus.includes(status)) {
//   throw new Error("Invalid task status");
// }

TaskSchema.index({ projectId: 1, startDate: 1, endDate: 1 });
TaskSchema.index({ projectId: 1, status: 1 });
TaskSchema.index({ taskAssignedTo: 1 });

// This is for the default status of task. 
// this find project by projectId then take a taskstatus
TaskSchema.pre("validate", async function () {
  if (!this.status) {
    const project = await mongoose
      .model("Project")
      .findById(this.projectId)
      .select("taskStatus");

    this.status = project.taskStatus[0];
  }
});

export const Task = mongoose.model("Task", TaskSchema);