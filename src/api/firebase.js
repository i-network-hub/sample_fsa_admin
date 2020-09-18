import * as firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'

import keys from '../config/keys'

if (firebase.apps.length === 0) {
	firebase.initializeApp(keys)
}

export const auth = firebase.auth()
export const storage = firebase.storage().ref()
export const firestore = firebase.firestore()
export const functions = firebase.app().functions('asia-east2')

export const users = firestore.collection('users')
export const profiles = firestore.collection('profiles')
export const resources = firestore.collection('resources')




///////////////////////////////////////////////////////
//? Helper Functions
//! Do Not Expose or modify without checking dependent functions
///////////////////////////////////////////////////////
const getDocumentsFromSnapshot = (snapshot) => {
	return snapshot.docs.map(doc => {
		return {
			id: doc.id,
			data: doc.data()
		}
	})
}




///////////////////////////////////////////////////////
//? Authentication Related Functions
///////////////////////////////////////////////////////
export const createAccount = async (credentials) => {
	const createUserWithEmailAndPassword = functions.httpsCallable('createUserWithEmailAndPassword')
	return await createUserWithEmailAndPassword(credentials)
		.then(res => res.data.data)
		.catch(err => {
			throw new Error({
				message: 'Failed to create account',
				stack: err
			})
		})
}


export const logout = () => {
	auth.signOut()
}

///////////////////////////////////////////////////////
//? Document Related Functions
///////////////////////////////////////////////////////
export const createDocument = async (collection, data) => {
	return await firestore
		.collection(collection)
		.add(data)
		.then(res => res.id)
		.catch(err => {
			console.log(err)
			throw new Error({
				message: 'Failed to create document',
				stack: err
			})
		})
}



export const addDocument = async (collection, id, data) => {
	return await firestore
		.collection(collection)
		.doc(id)
		.set(data)
		.then(res => true)
		.catch(err => {
			return new Error({
				message: 'failed to add document',
				stack: err
			})
		})
}


export const getDocument = async (collection, doc) => {
	return await firestore.collection(collection)
		.doc(doc).get().then(snap => {
			if (snap.exists) {
				return {
					id: snap.id,
					data: snap.data()
				}
			} else {
				throw new Error('Document not found')
			}
		})
		.catch(err => {
			console.log(err)
			throw new Error(err.message)
		})
}

export const getDocumentQuery = async (collection, query) => {
	return await firestore.collection(collection)
		.where(query.field, query.op, query.comp).get().then(snapshot => {
			return getDocumentsFromSnapshot(snapshot)
		}).catch(err => {
			console.log(err)
			throw new Error('Failed to get document/documents')
		})
}


export const getCollection = async (collection) => {
	return await firestore.collection(collection)
		.get().then(snapshot => {
			return getDocumentsFromSnapshot(snapshot)
		}).catch(err => {
			console.log(err)
			throw new Error('Failed to get document/documents')
		})
}




///////////////////////////////////////////////////////
//? Image Related Functions
///////////////////////////////////////////////////////
export const uploadImage = async (image, path) => {
	const ref = storage.child(path)
	await ref.putString(image, 'data_url')
	return await ref.getDownloadURL().then(res => res)
}


export const uploadShots = async (crop, uid) => {
	let urls = {}
	let originals = {}

	if (crop.avatar) {
		urls.avatar = ''
		const original = await uploadImage(crop.avatar.image, `shots/${uid}/original/avatar.jpg`)
		const cropped = await uploadImage(crop.avatar.croppedImage, `shots/${uid}/avatar.jpg`)
		urls.avatar = cropped
		originals.avatar = original
		console.log('Avatar Uploaded')
	}

	if (crop.headshot) {
		const original = await uploadImage(crop.headshot.image, `shots/${uid}/original/headshot.jpg`)
		const cropped = await uploadImage(crop.headshot.croppedImage, `shots/${uid}/headshot.jpg`)
		urls.headshot = cropped
		originals.headshot = original
		console.log('Headshot Uploaded')
	}
	if (crop.profileshot) {
		const original = await uploadImage(crop.profileshot.image, `shots/${uid}/original/profileshot.jpg`)
		const cropped = await uploadImage(crop.profileshot.croppedImage, `shots/${uid}/profileshot.jpg`)
		urls.profileshot = cropped
		originals.profileshot = original
		console.log('Profileshot Uploaded')
	}
	if (crop.midshot) {
		const original = await uploadImage(crop.midshot.image, `shots/${uid}/original/midshot.jpg`)
		const cropped = await uploadImage(crop.midshot.croppedImage, `shots/${uid}/midshot.jpg`)
		urls.midshot = cropped
		originals.midshot = original
		console.log('Midshot Uploaded')
	}
	if (crop.longshot) {
		const original = await uploadImage(crop.longshot.image, `shots/${uid}/original/longshot.jpg`)
		const cropped = await uploadImage(crop.longshot.croppedImage, `shots/${uid}/longshot.jpg`)
		urls.longshot = cropped
		originals.longshot = original
		console.log('Longshot Uploaded')
	}
	if (crop.shouldershot) {
		const original = await uploadImage(crop.shouldershot.image, `shots/${uid}/original/shouldershot.jpg`)
		const cropped = await uploadImage(crop.shouldershot.croppedImage, `shots/${uid}/shouldershot.jpg`)
		urls.shouldershot = cropped
		originals.shouldershot = original
		console.log('Shouldershot Uploaded')
	}

	return {
		urls,
		originals
	}
}

export {
	firebase
}