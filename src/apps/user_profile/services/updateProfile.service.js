const pool = require("../../../connection");
const { getUserByIdService } = require("../../global/services/getUserById.service");
const { encryptorPassword } = require('../../authentication/utils/encryptorPassword.utils');
const { getUserService } = require('../../global/services/getUser.service');
const { getUserByEmail } = require('../../global/services/getUserByEmail.service');
const { validateUpdateProfileService } = require('./validateUpdateProfile.service');
const { cpfFormatter } = require("../../authentication/utils/cpfFormatter.utils");

const updateProfileService = async (dataUser, id) => {
    try {

        const user = await getUserByIdService(id);

        const updatedIsValid = await validateUpdateProfileService(dataUser);
        
        if(updatedIsValid?.message){
            return updatedIsValid;
        }

        const emailExists = await getUserByEmail({
            email: dataUser.email,
            id: user.rows[0].id    
        });

        if(emailExists.rowCount > 0){
            return false;
        }

        

        const dataUpdated = {
            first_name : dataUser.first_name ?? user.rows[0].first_name,
            email : dataUser.email ?? user.rows[0].email,
            password : dataUser.password ? await encryptorPassword(dataUser.password) : user.rows[0].password,
            last_name : dataUser.last_name ?? user.rows[0].last_name,
            cpf : dataUser.cpf ? cpfFormatter(dataUser.cpf) : user.rows[0].cpf,
            rg : dataUser.rg ?? user.rows[0].rg,
            date_of_birth : dataUser.date_of_birth ?? user.rows[0].date_of_birth,
            phone : dataUser.phone ?? user.rows[0].phone 
        };

        await pool.query(`
            UPDATE users SET 
            first_name = $1,
            email = $2,
            password = $3,
            last_name = $4,
            cpf = $5,
            rg = $6,
            date_of_birth = $7,
            phone = $8
            WHERE id = $9
        `, [
            dataUpdated.first_name,
            dataUpdated.email,
            dataUpdated.password,
            dataUpdated.last_name,
            dataUpdated.cpf,
            dataUpdated.rg,
            dataUpdated.date_of_birth,
            dataUpdated.phone,
            id
        ]);

        return true;
    } catch (error) {
        return false;
    }
};

module.exports = updateProfileService;
