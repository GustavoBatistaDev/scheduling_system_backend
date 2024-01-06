const { getSpecialtyService } = require("../services/getSpecialty.service");

const validatorDate= (dateOfBirth) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateOfBirth);
};

const validatorHour= (hour) => {
    const regex = /^([0-2][0-9]|(2[0-3])):[0-5][0-9]:[0-5][0-9]$/;
    return regex.test(hour);
};

const validatorPcd= (pcd) => {
    
    const validOptions = ['s', 'n'];

    if(
        pcd?.toLowerCase() != validOptions[0] &&
        pcd?.toLowerCase() != validOptions[1] 

    )  return false;

    return true;
  
};

const validatorchronicDisease= (chronic_disease) => {
    
    const validOptions = ['s', 'n'];

    if(
        chronic_disease?.toLowerCase() != validOptions[0] &&
        chronic_disease?.toLowerCase() != validOptions[1] 

    )  return false;

    return true;
  
};

const validatorSpecialties = async (specialties_id) => {
    
    const specialtyExists = await getSpecialtyService(specialties_id);

    if(specialtyExists.rowCount < 1){
        return false;
    }

    return true;
};

const validateAppointment = async (
    {
        day,
        hour,
        pcd,
        chronic_disease,
        specialties_id
    }
) => {

    const dateIsValid = validatorDate(day);
    const hourIsValid = validatorHour(hour);
    const pcdIsValid = validatorPcd(pcd);
    const chronicDiseaseIsValid = validatorchronicDisease(chronic_disease);
    const specialtiesIsValid = await validatorSpecialties(specialties_id);

    if(
        !dateIsValid ||
        !hourIsValid ||
        !pcdIsValid ||
        !chronicDiseaseIsValid ||
        !specialtiesIsValid 
    ){
        return false;
    }
    return true;
};

module.exports = validateAppointment;