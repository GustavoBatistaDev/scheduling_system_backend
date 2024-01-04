const { createDoctorsService } = require("../services/createDoctor.service");
const { getDoctorsService } = require("../services/getDoctors.service");

const getDoctorsController = async (req, res) => {
    const allDoctors = await getDoctorsService();

    return res.json(allDoctors.rows);
};

const createDoctorController = async (req, res) => {

    const { name } = req.body;

    const newDoctor = await createDoctorsService(name);

    if(!newDoctor){
        return res.status(400).json({
            message: 'Nome inválido.'
        });
    }

    return res.json(newDoctor.rows[0]);
};


module.exports = {
    getDoctorsController,
    createDoctorController
};