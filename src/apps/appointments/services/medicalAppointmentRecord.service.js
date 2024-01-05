const pool = require("../../../connection");


const medicalAppointmentRecordService = async ({ doctor_id, appointment_id, user_id }) => {
    await pool.query(`
        INSERT INTO doctors_appointments (doctor_id, appointment_id, user_id)
        VALUES
        ($1, $2, $3)


    `,[doctor_id, appointment_id, user_id]);


};

module.exports = medicalAppointmentRecordService;