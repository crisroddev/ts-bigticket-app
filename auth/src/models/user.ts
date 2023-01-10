import mongoose from 'mongoose';
import { Password } from '../services/password';

// Interface --> describes properties required to create new User
interface UserAttrs {
	email: string;
	password: string;
}

// Interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

// Interface describes properties User Document has
interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
	// createdAt: string;
}

//Schema mongoose properties of model
const userSchema = new mongoose.Schema({
	email: {
		type: String, required: true
	},
	password: {
		type: String, required: true
	}
}, {
	// DOC to JSON
	toJSON: {
		transform(doc, ret) {
			ret.id = ret._id;
			delete ret._id;
			delete ret.password;
			delete ret.__v;
		}
	}
});

userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// User.build({
// 	email: "hola@gmail.com",
// 	password: "1t22566262"
// });

export { User };