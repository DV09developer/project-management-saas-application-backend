import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema(
    {
        projectname: {
            type: String,
            required: true,
            trim: true,
        },
        projectestimateddeadline: {
            type: Date,
        },
        // estimatedTime: {
        //     value: {
        //         type: Number,
        //         required: true,
        //     },
        //     unit: {
        //         type: String,
        //         enum: ["minutes", "hours", "days", "weeks", "months"],
        //         required: true,
        //     },
        // },
        createdByUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            index: true,
        },
        projectMember: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            {
                type: String,
                enum: ["Owner", "Manager", "Employee"],
            },
        ],
        taskStatuses: [
            {
                key: {
                    type: String, // "planned", "development", "review", "completed"
                    required: true,
                },
                label: {
                    type: String, // "Planned", "In Development"
                    required: true,
                },
                order: {
                    type: Number, // for workflow order
                    required: true,
                },
                isFinal: {
                    type: Boolean,
                    default: false,
                },
            },
        ],

        // projectestimatedtimeline: {
        //     type: String,        // for time only
        //     required: true,
        //     match: /^([01]\d|2[0-3]):([0-5]\d)$/ // HH:mm validation
        // }
    },
    { timestamps: true }
);

// Indexes
ProjectSchema.index({ "projectMembers.user": 1 });
ProjectSchema.index({ createdAt: -1 });
ProjectSchema.index({ projectname: "text" });
ProjectSchema.index({ taskStatus: 1 });

const Project = mongoose.model("Project", ProjectSchema);

export { Project };
