import {
    useState,
    useEffect
} from 'react'
import {
    firestore,
    getCollection
} from 'api/firebase'

export const useTags = () => {
    const [tags, setTags] = useState('')
    const [loading, setLoading] = useState(false)

    const getDocumentsFromSnapshot = (snapshot) => {
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                data: doc.data()
            }
        })
    }

    const loadTags = async () => {
        const tags = await getCollection('tags')
        setTags(tags)
        instantiateTagListner()
    }

    const addTag = async (data) => {
        setLoading(true)
        const newTagRef = firestore.collection('tags').doc()
        await firestore.runTransaction(transaction => {
            return transaction.get(newTagRef).then(doc => {
                transaction.set(newTagRef, {
                    ...data,
                    id: newTagRef.id
                })
            })
        }).then(res => {
            console.log('Tag added successfully.')
            setLoading(false)
        }).catch(err => {
            console.log(err)
            console.log('Failed to add tag.')
            setLoading(false)
        })
    }


    const updateTag = async (data) => {
        setLoading(true)
        const tagRef = firestore.collection('tags').doc(data.id)
        await firestore.runTransaction(transaction => {
            return transaction.get(tagRef).then(doc => {
                transaction.set(tagRef, data)
            })
        }).then(res => {
            console.log('Tag Updated successfully')
            setLoading(false)
        }).catch(err => {
            console.log('Failed to update tag.')
            console.log(err)
            setLoading(false)
        })
    }


    const deleteTag = async (id) => {
        setLoading(true)
        await firestore.collection('tags').doc(id).delete().then(res => {
            console.log('Tag Deleted Successfully')
            setLoading(false)
        }).catch(err => {
            console.log('Failed to delete tag')
            console.log(err)
            setLoading(false)
        })
    }


    const instantiateTagListner = () => {
        firestore
            .collection('tags')
            .onSnapshot(snap => {
                setTags(getDocumentsFromSnapshot(snap))
            })
    }

    useEffect(() => {
        if (!tags) {
            loadTags()
        }
    })

    return {
        loadTags,
        tags,
        loading,
        addTag,
        updateTag,
        deleteTag
    }
}