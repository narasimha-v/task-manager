import { Document, model, Schema } from 'mongoose';

export interface User {
	firstName: string;
	lastName: string;
	email: string;
	passwordHash: string;
	createdAt: Date;
	updatedAt: Date;
}

export type UserDoc = User & Document;

const UserSchema = new Schema<UserDoc>(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
			minlength: 1,
			maxlength: 50
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
			minlength: 1,
			maxlength: 50
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			validate: {
				validator: function (email: string) {
					return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
				},
				message: (props) => {
					return `${props.value} is not a valid email!`;
				}
			}
		},
		passwordHash: {
			type: String,
			required: true
		}
	},
	{
		toJSON: {
			transform: (_, ret: Partial<UserDoc>) => {
				delete ret.__v;
				delete ret.createdAt;
				delete ret.updatedAt;
				delete ret.passwordHash;
			}
		},
		timestamps: true
	}
);

export const User = model<UserDoc>('User', UserSchema);
