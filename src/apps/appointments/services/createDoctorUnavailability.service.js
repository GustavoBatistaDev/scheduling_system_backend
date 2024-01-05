const pool = require("../../../connection");
 
const createDoctorUnavailabilityService = async (data) => {
    const { rows, rowCount} = await pool.query(
        `
            insert into doctor_unavailability
            (doctor_id, unavailable_date, start_time)
            values ($1, $2, $3);
        `, 
        [
            data.doctor_id,
            data.unavailable_date,
            data.start_time
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