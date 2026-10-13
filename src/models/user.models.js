import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

const userSchama = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
     email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
     fullname:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        index:true
    },
     avtar:{
        type:String,//cloudnary url
        required:true,
        
    },
    coverimage:{
        type:String
    },
    watchHistory:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    refreshTokens:{
        type:String
    }

},
{timestamps:true}
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password=bcrypt.hash(this.password,10)
    next()
})
// pre is middleware function that return a promise used for password encrypt before saving 
//save is event-- jab bhi data save ho before that diya hua function run karo
// hash encrypt change karata hai aur 10  rounds hai iss diye huye round main encrypt karo 

userSchema.methods.isPasswordCorrect=async function(passsord){
    return await bcrypt.compare(password,this.password)
}
userSchama.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.eamil,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expireIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.genereateRefreshToken=function(){
     return jwt.sign({
        _id:this._id,
        
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expireIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}
export const User = mongoose.model("User", userSchama);

