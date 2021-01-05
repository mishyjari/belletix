import mongoose from 'mongoose';
import { PasswordManager } from '../services/passwordManager';

// Interface for new user attributes
interface UserAttrs {
    email: string;
    password: string 
};

// Interface for User model statics
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}; 

// Interface for properties on a user document
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
};

// Define mongoose schema for user
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true 
    }
},
{
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password
        },
        versionKey: false
    }
}    
);

// Middleware to hash the password prior to save
userSchema.pre('save', async function(done) {
    if ( this.isModified('password') ) {
        const hashed = await PasswordManager.toHash( this.get('password') );
        this.set( 'password', hashed );
    }
})

// Gives access to typing user creations by the build() method
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };