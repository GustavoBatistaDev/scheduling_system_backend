const pool = require('../../../connection');

const deleteSpecialtyService = async (id) => {
     const { rows, rowCount } = await pool.query(
    `
        DELETE FROM specialties
        WHERE id = $1
        RETURNING *
        ;
        `,
    [id],
  );
  
  return {
    rows,
    rowCount,
};
}
module.exports = {
    deleteSpecialtyService
};