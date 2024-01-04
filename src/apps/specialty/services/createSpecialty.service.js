const pool = require('../../../connection');

const createSpecialtyService = async (specialty) => {
     const { rows, rowCount } = await pool.query(
    `
        INSERT INTO specialties (name)
        VALUES ($1)
         RETURNING *
        ;
        `,
    [specialty],
  );



  return {
    rows,
    rowCount,
    
};
}
module.exports = {
    createSpecialtyService
};