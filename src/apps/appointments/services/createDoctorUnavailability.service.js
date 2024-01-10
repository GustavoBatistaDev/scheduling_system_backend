const pool = require("../../../connection");
 
const createDoctorUnavailabilityService = async (data) => {
    const { rows, rowCount} = await pool.query(
        `
            insert into doctor_unavailability
            (doctor_id, unavailable_date, start_time, appointment_id)
            values ($1, $2, $3, $4);
        `, 
        [
            data.doctor_id,
            data.unavailable_date,
            data.start_time,
            data.appointment_id
        ]
    )

    return {
        rows,
        rowCount
    };
};

module.exports = {
    createDoctorUnavailabilityService
};