const { 
    validatorFirstName,
    validatorLastName,
    validatorEmail,
    validatorCpf,

    } = require("../../authentication/utils/validateRegister.utils");
const { validatorRg, validatorDateOfBirth, validatorPhone } = require("../utils/validateUpdateUser.utils");

const validateUpdateProfileService = ({
        first_name,
        last_name,
        email,
        cpf,
        rg,
        date_of_birth,
        phone
      
    } ) => {
        if(
            !first_name &&
            !last_name &&
            !email&&
            !cpf &&
            !rg &&
            !phone &&
            !date_of_birth 
         
        ){
            return {
                message: 'Ao menos um campo é necessário para atualizar.'
            };
        }
        
        if(first_name){
            const firstNameIsValid = validatorFirstName(first_name);
            if(!firstNameIsValid){
                return {
                    message: 'Primeiro nome inválido.'
                };
            }
        }
         
        if(last_name){
            const lastNameIsValid = validatorLastName(last_name);
            if(!lastNameIsValid){
                return {
                    message: 'Último nome inválido.'
                };
            }
        }

         
        if(email){
            const emailIsValid = validatorEmail(email);
            if(!emailIsValid){
                  return {
                    message: 'Email inválido.'
                };
            }
        }
         
        if(cpf){
            const cpfIsValid = validatorCpf(cpf);
            if(!cpfIsValid){
                return {
                    message: 'Cpf inválido.'
                };
            }
        }
         


        if(rg){
            const rgIsValid = validatorRg(rg);
            if(!rgIsValid){
       
                return {
                    message: 'RG inválido.'
                };
            }
        }

  
        const dateOfBirthIsValid = validatorDateOfBirth(date_of_birth);
        if(!dateOfBirthIsValid){
    
            return {
                message: 'Data de nascimento inválida.'
            };
        }
     

        if(phone){
            
            const phoneIsValid = validatorPhone(phone);
            if(!phoneIsValid){
        
               return {
                    message: 'Celular inválido.'
            };
        }

        return true;
};
}

 module.exports = {
    validateUpdateProfileService
 };