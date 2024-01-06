const pool = require("../../../connection");

const cancelAppointmentService = async (id, user_id) => {
    const { rows, rowCount} = await pool.query(
        `
            update appointments set
            cancelled = true
            where
            id = $1 and user_id = $2  
            returning *
        `, [id, user_id]  
    )

    return {
        rows,
        rowCount
    };
};

module.exports = cancelAppointmentService;