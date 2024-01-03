const pool = require("../../../connection");

const updateUserPhotoService = async (id, photoUrl) => {
    const { rows } = await pool.query(
        `
        UPDATE users 
        SET photo = $1
        WHERE id = $2
        RETURNING *
        `,
        [photoUrl, id]
    );

    return rows[0];
};

module.exports = {
    updateUserPhotoService
};