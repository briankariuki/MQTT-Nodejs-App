const Joi = require('joi')

module.exports = {
    register (req, res, next){
        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).max(30),
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{6,32}$')
            ),
        })

        const {error, value} = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key){
                case 'username':
                    res.status(400).send({
                        error: 'Username should contain only alphabets.'
                    })
                    break
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                            <br>
                            1. It must contain ONLY the following characters: lowercase, uppercase, numerics
                            <br>
                            2. Must be atleast 6 characters in length
                        `
                    })
                    break   
                default:
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })
            }
        } else {
            next()
        }  
    }
}