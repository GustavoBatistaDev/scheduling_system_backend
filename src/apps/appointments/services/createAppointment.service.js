const pool = require('../../../connection');

const validateAppointment = require("../utils/validateappointment.utils");

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

    console.log(pcd);

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

    return {
    rows,
    rowCount,

    };
}







module.exports = createAppointmentService;







