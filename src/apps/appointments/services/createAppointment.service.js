const pool = require('../../../connection');

const validateAppointment = require("../utils/validateappointment.utils");
const { createDoctorUnavailabilityService } = require('./createDoctorUnavailability.service');
const { getAvailableDates } = require('./getAvailableDates.service');
const medicalAppointmentRecordService = require('./medicalAppointmentRecord.service');
// const sendMessageWhatsApp = require('./sendMessageWhatsApp.service');

const createAppointmentService = async (
    {
        day,
        hour,
        reason_for_consultation,
        pcd,
        chronic_disease,
        special_need,
        user_id,
        specialties_id
    }
) => {

    const appointmentIsValid = await validateAppointment(
       {
        day,
        hour,
        pcd,
        chronic_disease,
        specialties_id
       }
    );

    if(!appointmentIsValid){
        return false;
    }

    const doctor = await pool.query(
    `
        select doctors.id, doctors.name, specialties.name as specialty_name from doctors_specialties 
        inner join doctors on doctors_specialties.doctor_id = doctors.id
        inner join specialties on doctors_specialties.specialty_id = specialties.id
        where doctors_specialties.specialty_id = $1;
        ;

    `, [specialties_id]
    );

    const availableHours = await getAvailableDates(doctor.rows[0].id, day, hour);

    if(availableHours.rowCount > 0){
        return {
            message: 'Data e hora indisponíveis. Selecione uma outra data e hora.'
        }
    }

    pcd = pcd.toLowerCase() === 'n' ? false : true;
    chronic_disease = chronic_disease.toLowerCase() === 'n' ? false : true;

    const { rows, rowCount } = await pool.query(
    `
        INSERT INTO appointments (
            day,
            hour,
            reason_for_consultation,
            pcd,
            chronic_disease,
            special_need,
            user_id,
            specialties_id
        )
        VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7, 
            $8
                )
            RETURNING *
        ;
        `,
    [
        day,
        hour,
        reason_for_consultation,
        pcd,
        chronic_disease,
        special_need,
        user_id,
        specialties_id
    ],
    );

    // const data = await sendMessageWhatsApp(day, hour); whatsMsg

    await createDoctorUnavailabilityService({
        doctor_id: doctor.rows[0].id,
        unavailable_date: day,
        start_time: hour,
        appointment_id: rows[0].id
        

    });

    await medicalAppointmentRecordService({
        doctor_id: doctor.rows[0].id,
        appointment_id: rows[0].id,
        user_id: user_id
    });

    return {
    rows,
    rowCount,

    };
}

module.exports = createAppointmentService;







