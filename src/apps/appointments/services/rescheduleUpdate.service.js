const pool = require("../../../connection");
const validateAppointment = require("../utils/validateappointment.utils");

const rescheduleUpdateService = async (appointmentObject, appointment_id) => {

    const rescheduleIsValid = await validateAppointment({
        day: appointmentObject.day,
        hour: appointmentObject.hour,
        pcd: appointmentObject.pcd,
        chronic_disease: appointmentObject.chronic_disease,
        specialties_id: appointmentObject.specialties_id,
    });

    if(!rescheduleIsValid){
        return false;
    }

    try {
        const {rows, rowCount } = await pool.query(`
            UPDATE appointments
            SET
                day = $1,
                hour = $2,
                reason_for_consultation = $3,
                special_need = $4,
                specialties_id = $5,
                pcd = $6,
                chronic_disease = $7
            WHERE id = $8
            RETURNING *; 
        `, [
            appointmentObject.day,
            appointmentObject.hour,
            appointmentObject.reason_for_consultation,
            appointmentObject.special_need,
            appointmentObject.specialties_id,
            appointmentObject.pcd,
            appointmentObject.chronic_disease,
            appointment_id // Adicione a variável que representa o ID da consulta
        ]);

        return {
            rows,
            rowCount
        };
    } catch (error) {

        console.log(error)

        return false;
    }
};

module.exports = rescheduleUpdateService;
