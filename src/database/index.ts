import mongoose from "mongoose";

export default mongoose.connect(
	"mongodb+srv://admin:admin@cluster0.1gr99.mongodb.net/database?retryWrites=true&w=majority",
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

