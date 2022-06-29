import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  fullname: string;
  email: string;
  emailVerified: boolean;
  passwordHash: string;
  verifyToken: string;
  isDeleted: boolean;
}

const userSchema: Schema = new Schema({
  fullName: { type: String },
  email: { type: String, unique: true },
  emailVerified: { type: Boolean, default: false },
  passwordHash: { type: String },
  verifyToken: { type: String },
  isDeleted: { type: Boolean, default: false },
}, {
  timestamps: true,
  versionKey: false
});

userSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.passwordHash;
    delete ret.verifyToken;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.isDeleted;
  }
});


userSchema.index({ email: 1 });

const User = mongoose.model<IUser>('User', userSchema);

export default User
