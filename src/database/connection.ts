import mongoose from "mongoose";

export default mongoose.connect(
	process.env.MONGODB_URI as string,
	{
		useNewUrlParser: true,
		useFindAndModify: true,
		useUnifiedTopology: true,
	}
);

export const database = mongoose.connection;

database.once("open", () => {
	console.log("Connected with MongoDB");
});

database.on("error", (error) => {
	console.error(error);
});

