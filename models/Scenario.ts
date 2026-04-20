import mongoose, { Schema, model, models } from "mongoose";

const ScenarioSchema = new Schema(
  {
    ownerId: {
        type: String,
        required: true,
        index: true,
    },

    projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
        index: true,
    },
    
    endpointId: {
      type: Schema.Types.ObjectId,
      ref: "Endpoint",
      required: [true, "Scenario måste kopplas till ett endpoint"],
      index: true,
    },
    name: {
      type: String,
      required: [true, "Scenario-namn måste anges"],
      trim: true,
    },
    statusCode: {
      type: Number,
      required: [true, "Statuskod måste anges"],
      default: 200,
    },
    responseBody: {
      type: Schema.Types.Mixed,
      required: [true, "Response body måste anges"],
    },
    requestBody: {
      type: Schema.Types.Mixed,
      default: null,
    },
    headers: {
      type: Schema.Types.Mixed,
      default: {},
    },
    delay: {
      type: Number,
      default: 0,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Scenario = models.Scenario || model("Scenario", ScenarioSchema);
export default Scenario;