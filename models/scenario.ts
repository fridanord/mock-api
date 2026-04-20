import { Schema, model, models } from "mongoose";

const ScenarioSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const Scenario =
  models.Scenario || model("Scenario", ScenarioSchema);

export default Scenario;