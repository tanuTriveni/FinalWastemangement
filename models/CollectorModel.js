const mongoose = require('mongoose')
const collectorSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, "first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
  },
  phone: {
    type: String,
    required: [true, "phone no is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  website: {
    type: String,
  },
  address: {
    type: String,

  },
  location: {
    type: {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },

    },

  },
  specialization: {
    type: String,
    required: [true, "specialization is require"],
  },
  experience: {
    type: String,
    required: [true, "experience is required"],
  },
  feesPerCunsaltation: {
    type: Number,
    required: [true, "fee is required"],
  },
  status: {
    type: String,
    default: "pending",
  },
  timings: {
    type: Object,
    required: [true, "wrok timing is required"],
  },




}, { timestamps: true });


collectorSchema.index({ location: '2dsphere' });
const CollectorModel = mongoose.model("collector", collectorSchema);
module.exports = CollectorModel;