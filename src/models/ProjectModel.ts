import mongoose, { Schema, Document } from "mongoose";

export interface ICard extends Document {
  name: string;
  priority: string;
  columnIndex: number;
}

export interface IProject extends Document {
  name: string;
  userId: string;
  cards: ICard[];
}

const cardSchema = new Schema({
  name: { type: String, required: true },
  priority: { type: String, required: true },
  columnIndex: { type: Number, required: true },
});

const projectSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  cards: { type: [cardSchema], default: [] },
});

export const ProjectModel = mongoose.model<IProject>("Project", projectSchema);
