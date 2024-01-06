const pool = require("../../../connection");

const getAppointmentByDateService = async (date, hour) => {
    const { rows,  rowCount } = await pool.query(`
            select ap.id, u.first_name, ap.user_id as user_id, u.last_name, spec.name as specialty,
            ap.status, doc.name as doctor_name, ap.day, ap.hour, ap.created_at,
            ap.reason_for_consultation, ap.special_need
            from doctors_appointments as dc inner join appointments as ap on dc.appointment_id = ap.id
            inner join users as u on dc.user_id = u.id inner join doctors as doc on dc.doctor_id = doc.id
            inner join specialties as spec on ap.specialties_id = spec.id
            where ap.day = $1 and ap.hour = $2 and ap.cancelled = false;
    `, [date, hour]);

    return {
        rows,
        rowCount
    };
};

module.exports = getAppointmentByDateService;