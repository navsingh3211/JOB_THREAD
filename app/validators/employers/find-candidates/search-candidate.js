export default function makeSearchCandidateValidator({ Joi, CustomErrorHandler }) {

    return async function searchCandidateValidator({ ...data }, { }) {

        if (data.skill) data.skill = data.skill.split(',')
        if (data.l) data.l = data.l.split(',')
        if (data.priority) data.priority = data.priority.split(',')

        const options = {
            abortEarly: false,
            allowUnknown: false,
            errors: {
                wrap: {
                    label: ''
                }
            }
        }

        const schema = Joi.object().keys({
            k: Joi.string().trim().min(3).max(100).label(`Keyword`),
            jid: Joi.string().trim().label(`Job reference`),
            l: Joi.array().min(1).items(Joi.number().label(`Location item`)).label(`Location`),
            exp: Joi.number().label(`Experience`),
            npd: Joi.number().label(`Notice Period`),
            sal: Joi.number().label(`Salary`),
            et: Joi.number().label(`Employment type`),
            ct: Joi.number().valid(0, 1, 2).label(`Candidate type`),
            ed: Joi.number().label(`Education`),
            skill: Joi.array().min(1).items(Joi.number().label(`Skill item`)).label(`Skill`),
            la: Joi.number().label(`Last active`),
            resume: Joi.number().valid(0, 1, 2).label(`Resume`),
            workex: Joi.number().valid(0, 1, 2).label(`Work Experience`),
            priority: Joi.array().min(1).items(Joi.string().label(`Priority item`)).label(`Priority`),
            page: Joi.number().min(1).max(99).label(`Page`),
        })

        try {
            return await schema.validateAsync(data, options)
        }
        catch (err) {
            let errors
            err.details.map((item) => {
                let error = item.path.reverse().reduce((res, key) => ({ [key]: res }), String(item.message));
                errors = { ...errors, ...error }
            })
            throw CustomErrorHandler.validationError(errors)
        }
    }
}