import {
    useState,
    useEffect
} from 'react'
import _ from 'lodash'

const initialState = {
    name: '',
    username: '',
    currentCity: '',
    gender: '',
    focus: '',
    playingAge: {
        from: '',
        to: ''
    },
    height: {
        from: {
            feet: '',
            inch: ''
        },
        to: {
            feet: '',
            inch: ''
        }
    }
}


const formatString = (string) => {
    return string.toLowerCase().split(' ').join('')
}


const Filterer = function(data) {
    this.list = data

    this.filterName = (filter) => {
        if (filter && this.list && this.list.length > 0) {
            try {
                this.list = this.list.filter(item => {
                    let name = false
                    let professional = false

                    if (item && item.data && item.data.name) {
                        name = formatString(item.data.name).includes(formatString(filter))
                    }

                    if (item.data && item.data.hasProfessionalName && item.data.professionalName) {
                        professional = formatString(item.data.professionalName).includes(formatString(filter))
                    }

                    return name || professional

                })
            } catch (err) {
                return this
            }
        }
        return this
    }


    this.filterUsername = (filter) => {
        if (filter && this.list && this.list.length > 0) {
            try {
                this.list = this.list.filter(item => {
                    if (item && item.data && item.data.username) {
                        return formatString(item.data.username).includes(formatString(filter))
                    }
                })
            } catch (err) {
                console.log(err)
                return this
            }
        }
        return this
    }


    this.filterPlayingAge = (filter) => {
        if (this.list && this.list.length > 0) {
            this.list = this.list.filter(item => {
                try {
                    if (item.data.playingAge && item.data.playingAge.from && item.data.playingAge.to) {
                        if (filter.from !== '' && filter.to !== '') {
                            return parseInt(item.data.playingAge.from) <= parseInt(filter.to) && parseInt(item.data.playingAge.to) >= parseInt(filter.from)
                        }
                        if (filter.from !== '' && filter.to === '') {
                            return parseInt(item.data.playingAge.from) >= parseInt(filter.from)
                        }
                        if (filter.from === '' && filter.to !== '') {
                            return parseInt(item.data.playingAge.to) >= parseInt(filter.to)
                        }

                        return true
                    }
                    return true
                } catch (err) {
                    return true
                }
            })
        }
        //! Return this.list if length is < 0
        //! or this.list is undefined
        return this
    }


    this.filterHeight = (filter) => {
        let filters = {
            from: {
                feet: filter.from.feet || 0,
                inch: filter.from.inch || 0
            },
            to: {
                feet: filter.to.feet || 10,
                inch: filter.to.inch || 12
            }
        }

        let cmFrom = (((parseFloat(filters.from.feet) * 12.00) + parseFloat(filters.from.inch)) * 2.54)
        let cmTo = (((parseFloat(filters.to.feet) * 12.00) + parseFloat(filters.to.inch)) * 2.54)

        if (filter && this.list && this.list.length > 0) {
            try {
                this.list = this.list.filter(item => {
                    if (item && item.data && item.data.height) {
                        const cmHeight = (((parseFloat(item.data.height.feet || 0) * 12.00) + parseFloat(item.data.height.inch || item.data.height.inches || 0)) * 2.54)
                        if (cmHeight <= cmTo && cmHeight >= cmFrom) {
                            return true
                        }
                    }
                })
            } catch (err) {
                console.log(err)
                return this
            }
        }
        return this
    }

    this.filterCurrentCity = (filter) => {
        if (filter && this.list && this.list.length > 0) {
            try {
                this.list = this.list.filter(item => {
                    if (item && item.currentCity && item.currentCity.length === 1) {
                        return formatString(item.currentCity[0].label).includes(formatString(filter))
                    }
                })
            } catch (err) {
                console.log(err)
                return this
            }
        }
        return this
    }


    this.filterGender = (filter) => {
        if (filter && filter.value && this.list && this.list.length > 0) {
            try {
                this.list = this.list.filter(item => {
                    if (item && item.data && item.data.gender) {
                        return item.data.gender.value === filter.value
                    }
                })
            } catch (err) {
                console.log(err)
                return this
            }
        }
        return this
    }


    this.filterFocus = (filter) => {
        if (filter && filter.value && this.list && this.list.length > 0) {
            try {
                this.list = this.list.filter(item => {
                    if (item && item.data && item.data.focus && item.data.focus.length > 0) {
                        if (item.data.focus[0].value === 'both') {
                            return filter.value === 'actor' || filter.value === 'model' || filter.value === 'both'
                        } else {
                            return item.data.focus[0].value === filter.value
                        }
                    }
                })
            } catch (err) {
                console.log(err)
                return this
            }
        }
        return this
    }

    this.get = () => {
        return this.list
    }
}


export const useFilters = (originalData) => {
    const [filters, setFilters] = useState(initialState)
    const [filteredData, setFilteredData] = useState('')


    const handleFilterChange = (e) => {
        const filter = _.cloneDeep(filters)
        const updated = _.set(filter, e.target.name, e.target.value)
        setFilters(updated)
    }

    const filterData = (data, filters) => {
        const filterer = new Filterer(data)
        const filtered = filterer
            .filterName(filters.name)
            .filterUsername(filters.username)
            .filterPlayingAge(filters.playingAge)
            .filterHeight(filters.height)
            .filterCurrentCity(filters.currentCity)
            .filterGender(filters.gender)
            .filterFocus(filters.focus)
            .get()

        setFilteredData(filtered)
    }

    useEffect(() => {
        filterData(originalData, filters)
    }, [originalData, filters])

    return {
        handleFilterChange,
        filteredData,
        filters
    }
}