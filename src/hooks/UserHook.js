import {
    useState,
    useEffect
} from 'react'
import {
    firestore,
    getDocument,
    getDocumentQuery
} from 'api/firebase'
import _ from 'lodash'

export const useUser = (username) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState('')
    const [profile, setProfile] = useState('')

    let userListner = ''
    let profileListner = ''

    /**
     * 
     * @param {string} username
     * @description loads the user for given username ans instantiates
     *              realtime listners on the user profile 
     * 
     */
    const loadUser = async (username) => {
        setLoading(true)
        try {
            const userDoc = await getDocumentQuery('users', {
                field: 'username',
                op: '==',
                comp: username
            })
            const profileDoc = await getDocument('profiles', userDoc[0].data.profileId)
            setUser(userDoc[0])
            setProfile(profileDoc)
            setLoading(false)
            instantiateListners(userDoc[0].id, profileDoc.id)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
        setLoading(false)
    }


    /**
     * 
     * @param {string} tagId 
     * @description add the tag id to tags array in userDoc
     * 
     */
    const addTag = async (tagId) => {
        setLoading(true)
        const userRef = firestore.collection('users').doc(user.id)
        await firestore.runTransaction(transaction => {
            return transaction.get(userRef).then(doc => {
                if (!doc.data().tags) {
                    transaction.set(userRef, {
                        ...doc.data(),
                        tags: [tagId]
                    })
                } else {
                    let tags = doc.data().tags
                    tags.push(tagId)
                    transaction.update(userRef, {
                        tags: tags
                    })
                }
            })
        }).then(() => {
            console.log("Transaction successfully completed.")
            setLoading(false)
        }).catch(err => {
            console.log('Transaction failed: ', err)
            setLoading(false)
        })
    }


    /**
     * 
     * @param {string} tagId 
     * @description removes the given tag id from the tags array in userDoc
     * 
     */
    const removeTag = async (tagId) => {
        setLoading(true)
        const userRef = firestore.collection('users').doc(user.id)
        await firestore.runTransaction(transaction => {
            return transaction.get(userRef).then(doc => {
                if (doc.data().tags) {
                    let filteredTags = _.remove(doc.data().tags, (tag) => {
                        return tag !== tagId
                    })
                    transaction.update(userRef, {
                        tags: filteredTags
                    })
                }
            })
        }).then(res => {
            console.log('Tag Removed successfully')
            setLoading(false)
        }).catch(err => {
            console.log('Transaction Failed', err)
            setLoading(false)
        })
    }


    /**
     * 
     * @param {string} userId 
     * @param {string} profileId 
     * @description instantiates a realtime change listners to the documents
     * 
     */
    const instantiateListners = (userId, profileId) => {
        if (!userListner) {
            userListner = firestore
                .collection('users')
                .doc(userId)
                .onSnapshot(snap => {
                    setUser({
                        id: snap.id,
                        data: snap.data()
                    })
                })
        }

        if (!profileListner) {
            profileListner = firestore
                .collection('profiles')
                .doc(profileId)
                .onSnapshot(snap => {
                    setProfile({
                        id: snap.id,
                        data: snap.data()
                    })
                })
        }
    }



    useEffect(() => {
        if (!user && !profile && username) {
            loadUser(username)
        }
    }, [username])

    useEffect(() => {
        if (userListner) {
            console.log(userListner)
            return userListner
        }
    }, [userListner])

    useEffect(() => {
        if (profileListner) {
            return profileListner
        }
    }, [profileListner])

    return {
        loadUser,
        loading,
        user,
        profile,
        addTag,
        removeTag
    }
}