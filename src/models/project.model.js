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
        estimatedTime: {
            value: {
                type: Number,
                required: true,
            },
            unit: {
                type: String,
                enum: ["minutes", "hours", "days", "weeks", "months"],
                required: true,
            },
        },
        createdByUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        // projectMember: {

        // }



        // projectestimatedtimeline: {
        //     type: String,        // for time only
        //     required: true,
        //     match: /^([01]\d|2[0-3]):([0-5]\d)$/ // HH:mm validation
        // }
    },
    { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);

export { Project };
