import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectedDB = await mongoose.connect(
      `${process.env.MONGOOSE_URI}/${process.env.MONGOOSE_DB_NAME}`
    );
    console.log(`connceted To mongoDB host :${connectedDB.connection.host}`);
  } catch (error) {
    console.error(`DB connect faild:${error.message}\n`);
    process.exit(1);
  }
};
