import { useState } from 'react'
import { auth } from 'api/firebase'

export const useLogin = ({ callback, initialState = {}, validate }) => {
	const [values, setValues] = useState(initialState)
	const [errors, setErrors] = useState({})
	const [loading, setLoading] = useState(false)

	const login = async (email, password) => {
		await auth.signInWithEmailAndPassword(email, password)
			.then(res => {
				return res
			}).catch(err => {
				if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
					throw new Error('Email or password not valid.')
				} else {
					throw new Error('Some unknown error occurred.')
				}
			})
	}

	const onChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		})
	}

	const onSubmit = async (event) => {
		event.preventDefault()
		if (Object.keys(validate(values)).length === 0) {
			setLoading(true)
			try {
				const res = await login(values.email, values.password)
				callback(res)
				setLoading(false)
			} catch (err) {
				setErrors({
					authError: err.message
				})
				setLoading(false)
			}
		} else {
			setErrors(validate(values))
			setLoading(false)
		}
	}

	return {
		errors,
		onSubmit,
		onChange,
		values,
		loading
	}
}