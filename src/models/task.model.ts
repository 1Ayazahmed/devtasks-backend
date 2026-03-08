import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  completed: boolean;
  userId: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

taskSchema.index({ userId: 1 });

export const Task = mongoose.model<ITask>("Task", taskSchema);