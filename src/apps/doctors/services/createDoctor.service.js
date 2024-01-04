const pool = require('../../../connection');
const { validatorFirstName } = require('../../authentication/utils/validateRegister.utils');

const createDoctorsService = async (nameDoctor) => {

    const nameIsValid = validatorFirstName(nameDoctor);

    if(!nameIsValid){
        return false;
    }


     const { rows, rowCount } = await pool.query(
    `
        INSERT INTO doctors (name)
        VALUES ($1) 
        RETURNING *;
        ;
    `, [nameDoctor]
  );

  return {
    rows,
    rowCount,
  };
};

module.exports = {
    createDoctorsService
};