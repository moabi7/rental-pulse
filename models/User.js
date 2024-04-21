import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Email already exists']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists']
    },
    image: {
        type: String
    },
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Property'
        }
    ]
}, {timestamps: true});

const User = models.User || model('User', UserSchema);

export default User;