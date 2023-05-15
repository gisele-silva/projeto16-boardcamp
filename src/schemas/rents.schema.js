import Joi from "joi";

const rentsSchema = Joi.object({
    customerId: Joi.number().integer().required(),
    gameId: Joi.number().integer().min(1).required(),
    daysRented: Joi.number().greater(0).required(),
})

export default rentsSchema