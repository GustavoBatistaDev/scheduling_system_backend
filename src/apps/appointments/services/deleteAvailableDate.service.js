const pool = require("../../../connection");
 
const deleteAvailableDates = async (appointment_id) => {
    const { rows, rowCount} = await pool.query(
        `
            DELETE FROM doctor_unavailability
            WHERE appointment_id = $1;
        `, 
        [
           appointment_id
        ]
    )

    return {
        rows,
        rowCount
    };
};

module.exports = {
    deleteAvailableDates
};