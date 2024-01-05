const pool = require("../../../connection");

const getAppointmentService = async (id) => {
    const { rows,  rowCount } = await pool.query(`
            select ap.id, u.first_name, u.last_name, spec.name as specialty,
            ap.status, doc.name as doctor_name, ap.day, ap.hour, ap.created_at,
            ap.reason_for_consultation, ap.special_need
            from doctors_appointments as dc inner join appointments as ap on dc.appointment_id = ap.id
            inner join users as u on dc.user_id = u.id inner join doctors as doc on dc.doctor_id = doc.id
            inner join specialties as spec on ap.specialties_id = spec.id
            where dc.appointment_id = $1;
    `, [id]);

    return {
        rows,
        rowCount
    };
};

module.exports = getAppointmentService;