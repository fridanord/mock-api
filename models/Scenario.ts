import mongoose, { Schema, model, models } from "mongoose";

const ScenarioSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Scenario name is required"],
            trim: true
        },
        description: {
            type: String
        },
        statusCode: {
            type: Number,
            required: true,
            default: 200
        },
        responseBody: {
            type: Schema.Types.Mixed,
            required: true
        },
        isActive: {
            type: Boolean,
            default: false
        },
        endpointId: { // Felhantering: Ser om det fungerar, ändra tillbaka här sen.
            //type: Schema.Types.ObjectId,
            //ref: "Endpoint",
            //required: true
            type: String,
            required: true
        },
    },
    { timestamps: true}
);

const Scenario = models.Scenario || model("Scenario", ScenarioSchema);
export default Scenario;