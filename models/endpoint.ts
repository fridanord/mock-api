import { Schema, model, models } from "mongoose";

const EndpointSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Endpoint-namn måste anges"],
      trim: true,
    },

    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Endpoint måste tillhöra ett projekt"],
      index: true,
    },

    method: {
      type: String,
      required: [true, "HTTP method måste anges"],
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    },

    path: {
      type: String,
      required: [true, "Path måste anges"],
      trim: true,
    },

    requestBody: {
      type: Schema.Types.Mixed,
      default: null,
    },

    responseBody: {
      type: Schema.Types.Mixed,
      required: [true, "Response body måste anges"],
    },

    generateList: {
      type: Boolean,
      default: false,
    },

    listCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Endpoint = models.Endpoint || model("Endpoint", EndpointSchema);

export default Endpoint;