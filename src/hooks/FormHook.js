import {
    useState,
    useEffect
} from 'react'
import {
    firestore,
    auth,
    createAccount,
    createDocument,
    addDocument,
    uploadShots
} from 'api/firebase'
import _ from 'lodash'
import {
    validateProfile
} from 'validators'
import {
    create
} from 'istanbul-reports'

const initialState = {
    name: '',
    username: '',
    email: '',
    password: 'starcast@1234',
    professionalName: '',
    hasProfessionalName: false,
    phone: {
        code: 91,
        number: ''
    },
    gender: {
        label: 'Male',
        value: 'male'
    },
    type: {
        label: 'Performing Artist',
        value: 'pa'
    },
    languages: {
        native: [],
        additional: []
    },
    currentCity: [],
    nationality: [],
    playingAge: {
        from: '',
        to: ''
    },
    height: {
        feet: '',
        inch: ''
    },
    focus: [],
    skills: [],
    dob: '',
    createdAt: '',
    social: {},
    crops: '',
    headshot: '',
    longshot: '',
    midshot: '',
    profileshot: '',
    shouldershot: '',
    message: ''
}


export const useForm = () => {
    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState('')
    const [usernameVisited, setUsernameVisited] = useState(false)
    const [emailVisited, setEmailVisited] = useState(false)


    /**
     * 
     * @param {String} name Generates username from given name 
     */
    const generateUsername = (name) => {
        if (!usernameVisited) {
            return name.toLowerCase().split(' ').join('')
        }
    }


    /**
     * 
     * @param {String} name Generates email from given name 
     */
    const generateEmail = (name) => {
        if (!emailVisited) {
            return `${name.toLowerCase().split(' ').join('')}@test.com`
        }
    }


    /**
     * 
     * @param {String} username Checks if username is available to use 
     */
    const validateUsername = async (username) => {
        const response = await firestore
            .collection('users')
            .where('username', '==', username)
            .get().then(snap => {
                if (snap.docs.length > 0) {
                    return false
                } else {
                    return true
                }
            }).catch(err => {
                return false
            })

        if (!response) {
            return 'Username already in use'
        } else {
            return ''
        }
    }


    /**
     * 
     * @param {string} email Checks if username is available and is valid
     */
    const validateEmail = async (email) => {
        const response = await auth.fetchSignInMethodsForEmail(email)
            .then(res => {
                if (res.length === 0) {
                    return true
                } else {
                    return false
                }
            }).catch(err => {
                return false
            })

        if (!response) {
            return 'Email already in use.'
        } else {
            return ''
        }
    }


    /**
     * 
     * @param {Object} age Make sures that playing age is of a valid range 
     */
    const validatePlayingAge = (age) => {
        if (!age.from || age.from === 0) return 'Invalid Minimum Age'
        if (!age.to || age.to > 99) return 'Invalid Maximum age'
        if (age.to && age.from && age.to < age.from) return 'Maximum age cant be less then minimum age.'
        return ''
    }


    /**
     * ? Calls validate methods for username, emaul, and playing age and sets
     * ? errors state.
     */
    const validate = async () => {
        const {
            username,
            email,
            playingAge
        } = values
        let usernameError, emailError, playingAgeError

        if (username) usernameError = await validateUsername(username)
        if (email) emailError = await validateEmail(email)
        if (playingAge.from && playingAge.to) playingAgeError = validatePlayingAge(playingAge)

        setErrors({
            ...errors,
            usernameError,
            emailError,
            playingAgeError
        })
    }


    //? Creating a debounced instance of validator method using lodash
    //? debounce function.
    const validatorDebounced = _.debounce(validate, 150, {
        leading: false,
        trailing: true
    })


    /**
     * 
     * @param {ReactSyntheticEvent} event updates values according to change event 
     */
    const onChange = (event) => {
        const clone = _.clone(values, true)
        const updated = _.set(clone, event.target.name, event.target.value)

        if (event.target.name === 'name') {
            updated.username = generateUsername(event.target.value)
            updated.email = generateEmail(event.target.value)
        }
        setValues(updated)
    }

    const onSubmit = async () => {
        setLoading(true)
        const profileFields = [
            'name',
            'username',
            'hasProfessionalName',
            'professionalName',
            'playingAge',
            'height',
            'social',
            'nationality',
            'currentCity',
            'languages',
            'focus',
            'skills',
            'dob',
            'type',
            'gender'
        ]

        try {
            setLoadingMessage('Creating Account')
            const {
                uid
            } = await createAccount({
                email: values.email,
                password: values.password,
                name: values.name
            })
            setLoadingMessage('Uploading Images')
            const images = await uploadShots(values.crops, uid)
            setLoadingMessage('Images Uploaded')
            const date = new Date().toISOString()
            let profile = _.pick(values, profileFields)

            profile = _.merge(profile, images.urls)
            profile.type = values.type.value
            profile.createdAt = date

            setLoadingMessage('Uploading Profile')
            const profileID = await createDocument('profiles', profile)

            let user = {
                profileId: profileID,
                username: values.username,
                type: values.type.value,
                createdAt: date
            }

            setLoadingMessage('Adding To User LIst')
            const userDoc = await addDocument('users', uid, user)

            setLoadingMessage('Completed')
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
        setLoadingMessage('')
        setValues(initialState)
        setErrors({})
    }


    useEffect(() => {
        validatorDebounced()
    }, [values])


    return {
        onChange,
        values,
        errors,
        onSubmit,
        loading,
        loadingMessage
    }
}