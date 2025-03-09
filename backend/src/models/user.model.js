import mongoose from 'mongoose';
// import validator from 'validator';
const UserSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
       
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    grade:{
        type:Number,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true
    }
     
})
const User=mongoose.model('User',UserSchema);
export default User;











// const User= mongoose


// User.pre('save',async funtion(next){
//     if(this.isModified(password)) next();
//     else{
//         this.password = await bcrypt.hash(this.password,8);
//     }
// })



 // validate : {
        //     validator:function(email){
        //         return validator.isEmail(email) && email.length < 100 && email.length > 15 && email.endsWith('@gmail.com'); 
        //     },
        //     message:"Invalid Email"
        // }


    // validate:{
        //     validator:function(password){
        //         return password.length > 6 && password.length < 100 && password[0].isCapitalCase() && password.containsSpecialCharacter();
        //     },
        //     message:"Please Ensure Password is atleast 6 length,starts with a capital letter and contains a special character"
        // }
    // },    
    // validate:{
        //     validator:function(phoneNumber){
        //         return phoneNumber.length == 10;
        //     },
        //     message:"Invalid Phone Number"
        // }