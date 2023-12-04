import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema({
  place: { type: String, required: true },
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
