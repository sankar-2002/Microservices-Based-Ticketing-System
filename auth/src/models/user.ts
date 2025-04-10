import mongoose from "mongoose";

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