import mongoose from "mongoose";
import { Password } from "../services/password"; //importing the Password class for hashing passwords

// an Interface that describes the properties that are required to create a new user
// purpose of this interface is to provide type checking for the object
interface UserAttrs {   
    email: string;
    password: string;
}   
//an Interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc; //this is a static method that we can use to create a new user instance   
}

// an Interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}


// Configuring schema and it's build method...
const userSchema = new mongoose.Schema({
  email: {  type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function(done) { //this is a middleware that runs before saving the user document to the database

  if(this.isModified('password')) { //if the password is modified, then hash it
    const hashed = await Password.toHash(this.get('password')); //hash the password using the Password class
    this.set('password', hashed); //set the password to the hashed password
  }
  done(); //call the done function to indicate that the middleware is done 
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs); //this is a static method that we can use to create a new user instance   
}


//creating a new user instance using the build method
const User = mongoose.model<UserDoc,UserModel>("User", userSchema);

const user = User.build({
    email: 'test@test.com',
    password: 'password',
});

export { User}; //exporting the User model and the buildUser function so that we can use it in other files