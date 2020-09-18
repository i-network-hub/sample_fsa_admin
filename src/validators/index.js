import * as yup from 'yup'

const ProfileSchema = yup.object().shape({
    name: yup.string().required(),
    professionalName: yup.string(),
    hasProfessionalName: yup.bool().required(),
    gender: yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required()
    }),
    type: yup.string().required(),
    languages: yup.object().shape({
        native: yup.array().of(yup.object().shape({
            label: yup.string(),
            value: yup.string()
        })).max(1),
        additonal: yup.array().of(yup.object().shape({
            label: yup.string(),
            value: yup.string()
        }))
    }),
    currentCity: yup.array().of(
        yup.object().shape({
            label: yup.string(),
            value: yup.string()
        })
    ).max(1),
    nationality: yup.array().of(
        yup.object().shape({
            label: yup.string(),
            value: yup.string()
        })
    ).max(1),
    playingAge: yup.object().shape({
        from: yup.number().min(1).max(99).required(),
        to: yup.number().min(1).max(99).required()
    }).required(),
    height: yup.object().shape({
        feet: yup.number().min(1).max(12).required(),
        inch: yup.number().min(1).max(12).required()
    }).required(),
    focus: yup.array().of(yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required()
    })).max(1).required(),
    skills: yup.array().of(yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required()
    })).required(),
    dob: yup.string(),
    social: yup.object(),
    headsot: yup.string(),
    midshot: yup.string(),
    lonsghot: yup.string(),
    profileshot: yup.string(),
    shouldershot: yup.string(),
    avatar: yup.string()
})


export const validateProfile = async (profile) => {
    return await ProfileSchema.isValid(profile)
        .then(res => res)
        .catch(err => {
            throw new Error(err)
        })
}