const { 
    validatorFirstName,
    validatorLastName,
    validatorEmail,
    validatorCpf,
    validatorPassword 
    } = require("../../authentication/utils/validateRegister.utils");
const { validatorRg, validatorDateOfBirth, validatorPhone } = require("../utils/validateUpdateUser.utils");

const validateUpdateProfileService = ({
        first_name,
        last_name,
        email,
        cpf,
        rg,
        date_of_birth,
        phone,
        password
    } ) => {
        if(
            !first_name &&
            !last_name &&
            !email&&
            !cpf &&
            !rg &&
            !phone &&
            !date_of_birth &&
            !password
        ){
            return false
        }
        
        if(first_name){
            const firstNameIsValid = validatorFirstName(first_name);
            if(!firstNameIsValid){
                return false
            }
        }
         
        if(last_name){
            const lastNameIsValid = validatorLastName(last_name);
            if(!lastNameIsValid){
                return false
            }
        }

         
        if(email){
            const emailIsValid = validatorEmail(email);
            if(!emailIsValid){
                return false
            }
        }
         
        if(cpf){
            const cpfIsValid = validatorCpf(cpf);
            if(!cpfIsValid){
                return false
            }
        }
         
        if(password){
            const passwordIsValid = validatorPassword(password);
            if(!passwordIsValid){
                return false
            }
        }

        if(rg){
            const rgIsValid = validatorRg(rg);
            if(!rgIsValid){
       
                return false
            }
        }

        if(date_of_birth){
            const dateOfBirthIsValid = validatorDateOfBirth(date_of_birth);
            if(!dateOfBirthIsValid){
      
            return false
            }
        }

        if(phone){
            
            const phoneIsValid = validatorPhone(phone);
            if(!phoneIsValid){
        
            return false
            }
        }

        return true;
};

 module.exports = {
    validateUpdateProfileService
 };