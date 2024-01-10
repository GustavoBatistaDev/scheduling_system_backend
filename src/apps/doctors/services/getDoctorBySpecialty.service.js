const pool = require("../../../connection");

const getDoctorBySpecialty = async (id) => {
    const { rows, rowCount } = await pool.query(
    `
        select * from doctors_specialties where doctors_specialties.doctor_id = $1;
    `, [id]
  );

  return {
    rows,
    rowCount,
  };
};

module.exports = getDoctorBySpecialty;