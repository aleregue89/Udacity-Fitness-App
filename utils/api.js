import {AsyncStorage} from 'react-native'
import {CALENDAR_STORAGE_KEY} from './_calendar'
import {formatCalendarResults} from './_calendar'

export function fetchCalendarResults () {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(formatCalendarResults)
}

// we are passing an object that has an specific entry on it as well as the key
// then we are calling AsyncStorage.mergeitem passing CALENDAR_STORAGE_KEY and we
// are going to merge into it is an stringify version of this
// object which has the [key] as property name & the 'entry' as the value
export function submitEntry ({entry, key}) {
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key] : entry
    }))
}

// we are passing a key
// we want to remove the item at this key from our AsyncStorage
// first we are getting everyhing from this location 
// then when once have the info let's call 'results'
// we parse it
// we'll say that data[key] is 'undefined'
// we are going to delete all the info at data[key] property
// finally we set CALENDAR_STORAGE_KEY with everything left after we've deleted the specif item
export function removeEntry (key) {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
        })
}