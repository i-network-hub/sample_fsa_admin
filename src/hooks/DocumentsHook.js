import {
    useState
} from 'react'
import {
    firestore,
    getCollection
} from 'api/firebase'

export const useDocuments = () => {
    const [loading, setLoading] = useState(false)


    const getDocumentsCount = async () => {
        return await firestore
            .collection('data')
            .doc('RA6n5M5tL3PI8RlYXs4B')
            .get()
            .then(snapshot => snapshot.data().documents)
    }

    const getNextDocuments = async (next, limit) => {
        const ref = firestore.collection('profiles').limit(limit)
        return await next.get()
            .then(snapshots => {
                let lastDoc = snapshots.docs[snapshots.docs.length - 1]
                let documents = []

                snapshots.forEach(doc => {
                    documents.push(doc.data())
                })

                const next = ref.startAfter(lastDoc)

                return {
                    documents,
                    next
                }
            })
    }

    const paginateProfiles = async (limit) => {
        const first = firestore.collection('profiles').limit(limit)
        return first.get().then(snapshots => {
            let lastDoc = snapshots.docs[snapshots.docs.length - 1]
            let documents = []

            snapshots.forEach(doc => {
                documents.push(doc.data())
            })

            let next = first.startAfter(lastDoc)

            return {
                documents,
                next
            }
        })
    }


    const getDocuments = async () => {
        setLoading(true)
        return await getCollection('profiles')
            .then(res => {
                setLoading(false)
                return res
            }).catch(err => {
                setLoading(false)
            })
    }

    return {
        paginateProfiles,
        getNextDocuments,
        getDocumentsCount,
        getDocuments,
        loading
    }
}