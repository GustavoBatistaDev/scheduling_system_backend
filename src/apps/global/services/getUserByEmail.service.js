const pool = require('../../../connection');

const getUserByEmail = async data => {
  const { rows, rowCount } = await pool.query(
    `
        SELECT * FROM users 
        WHERE email = $1 AND id != $2
        `,
    [data.email, data.id],
  );

  return {
    rows,
    rowCount
  };
};

module.exports = {
  getUserByEmail,
};
