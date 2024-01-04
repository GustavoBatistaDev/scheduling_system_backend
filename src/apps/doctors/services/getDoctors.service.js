const pool = require('../../../connection');

const getDoctorsService = async () => {
     const { rows, rowCount } = await pool.query(
    `
        SELECT * FROM doctors 
        ;
        `
  );

  return {
    rows,
    rowCount,
  };
};

module.exports = {
    getDoctorsService
};