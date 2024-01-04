const pool = require("../../../connection");
 
const getAvailableHoursService = async ({ id, date }) => {
    const { rows, rowCount} = await pool.query(
        `
            SELECT * FROM doctor_unavailability
            WHERE doctor_id = $1 AND unavailable_date = $2 ;
        `, 
        [
            id,
            date
     
        ]
    )

    return {
        rows,
        rowCount
    };
};

module.exports = {
    getAvailableHoursService
};