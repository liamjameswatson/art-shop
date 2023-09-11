import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        trim: true
    },
    email: {
        type:'string',
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type:'string',
        required: true,
        trim: true
    },
    role: {
        type:'string',
        required: true,
        default: 'user',
    }
},
    {
        timestamps: true
    })

    const User = mongoose.model('User', userSchema);

    export default User;