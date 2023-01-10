import mongoose from "mongoose";
import { app } from './app';

// DB Connection
const startDB = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined');
	}
	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
		console.log('Connected to Mongodb')
	} catch (err) {
		console.error(err);
	}

	app.listen(3000, () => {
		console.log(`Listening on Port 3000`);
	});

};

startDB();

