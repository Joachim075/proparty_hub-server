import Joi from "joi";

const propartySchema= Joi.object({
    location: Joi.string().min(5).max(30).required(),
    contact: Joi.string().min(5).max(30).required(),
    purpose: Joi.string().min(5).max(30).required(),
    rooms: Joi.string().min(1).max(30).required(),
    description: Joi.string().min(2).max(200).required(),
    price: Joi.string().max(6).required()
})

function validate(schema){
    return (req,res,next)=>{
        const result= schema.validate(req.body)

        if (result.error) {
            res.json(result.error)
        } else {
            next()
        }
    }
}

export{
    propartySchema,
    validate
}