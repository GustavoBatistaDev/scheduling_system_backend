const { createSpecialtyService } = require("../services/createSpecialty.service");
const { deleteSpecialtyService } = require("../services/deleteSpecialty.service");

const createSpecialtyController =  async (req, res) => {
    const { specialty } = req.body;
    
    const newSpecialty = await createSpecialtyService(specialty);

    return res.status(201).json(newSpecialty.rows);
};

const deleteSpecialtyController =  async (req, res) => {
    const { id } = req.params;
    
    await deleteSpecialtyService(id);

    return res.status(204).send();
};


module.exports = {
    createSpecialtyController,
    deleteSpecialtyController
};