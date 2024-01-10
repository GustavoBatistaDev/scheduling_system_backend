const pool = require("../../../connection");

const updateUnavailableDoctor = async (dataUnavailable) => {
    const { rows, rowCount } = await pool.query(`
            UPDATE doctor_unavailability 
            SET doctor_id = $1,
                unavailable_date = $2,
                start_time = $3
            WHERE appointment_id = $4
            RETURNING *;
    `, [
        dataUnavailable.doctor_id,
        dataUnavailable.unavailable_date,
        dataUnavailable.start_time,
        dataUnavailable.appointment_id,
    ]);

    return {
        rows,
        rowCount
    };
};

module.exports = {
    updateUnavailableDoctor
};
