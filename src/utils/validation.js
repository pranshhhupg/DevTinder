const validator = require("validator");

const validateSignUpUser = (req) => {
    const {firstName, lastName,emailId, password, age, gender, photoUrl, about, hobbies} = req.body;

    if(!firstName){
        throw new Error("Enter valid name");
    }
    if(!validator.isEmail(emailId)){
        throw new Error("Enter valid emailId");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Enter strong password. Password must have minimum 8 length and should contain 1 Uppercase character,1 lowercase character, 1 numeric value and 1 Special Character (@,#,$,%,^,&,*).");
    }
    if(age<18){
        throw new Error("Less than 18 Year Old are not allowed!");
    }
    if(hobbies.length>10){
        throw new Error("Hobbies exceeded above 10");
    }
};

module.exports = {
    validateSignUpUser,
};