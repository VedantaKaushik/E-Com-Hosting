import mongoose from "mongoose";

export const ConnectToDb = async () => {
  await mongoose.connect(process.env.URI);
  console.log(`Connected To DB`);
};
