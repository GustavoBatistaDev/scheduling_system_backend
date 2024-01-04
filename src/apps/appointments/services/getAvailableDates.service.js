const pool = require("../../../connection");
 
const getAvailableDates = async (id, date, hour) => {
    const { rows, rowCount} = await pool.query(
        `
            SELECT * FROM doctor_unavailability
            WHERE doctor_id = $1 AND unavailable_date = $2 AND start_time = $3;
        `, 
        [
            id,
            date,
            hour
        ]
    )

    return {
        rows,
        rowCount
    };
};

module.exports = {
    getAvailableDates
};