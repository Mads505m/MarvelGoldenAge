const Joi = require('joi');

// Schema to validate the request body
const heroSchema = Joi.object({
    name: Joi.string().required(),
    alias: Joi.string().required(),
    powers: Joi.array().items(Joi.string()).required()
});

// Middleware to validate the request body
module.exports = {
    validateHero(req, res, next) {
        const { error } = heroSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });
        next();
    }
};