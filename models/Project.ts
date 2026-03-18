import mongoose, { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Ett projektnamn måste anges"],
            trim: true
        },

        ownerId: {
            type: String,
            required: true,
            index: true
        },
        apiKey: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true // createdAt och updated at?
    }
);

const Project = models.Project || model("Project", ProjectSchema);

export default Project;