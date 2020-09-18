import {
    cropImage
} from './cropImage'


export const generateId = () => {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


export const getClasses = (classes) => {
    return Object
        .entries(classes)
        .filter(entry => entry[1])
        .map(entry => entry[0])
        .join(' ')
}


export const concatList = (list) => {
    if (list.length > 0) {
        return list.reduce((acc, val, index) => {
            return index === list.length - 1 ? acc + val.label : acc + val.label + ', '
        }, '')
    } else {
        return 'Please Add'
    }
}


export const snapshotToArray = (snapshot) => {
    return snapshot.docs.map(doc => {
        return {
            id: doc.id,
            data: doc.data()
        }
    })
}


export {
    cropImage
}