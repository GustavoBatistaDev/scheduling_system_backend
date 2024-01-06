const pool = require("../../../connection");

const updateStatusAppointmentService = async (id, status) => {
    const { rows,  rowCount } = await pool.query(`
            update appointments 
            set status = $2
            where id = $1
            returning *
            ;

    `, [id, status]);

    return {
        rows,
        rowCount
    };
};

module.exports = updateStatusAppointmentService;