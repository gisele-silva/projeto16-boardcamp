import Joi from "joi";

const clientSchema = Joi.object({
    name: Joi.string().min(2).required(),
    phone: Joi.string().min(10).max(11).required(),
    cpf: Joi.string().length(11).required(),
    birthday: Joi.date().required()
})

export default clientSchema