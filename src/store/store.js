import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { loginReducer } from './login'
import { propertiesReducer } from './properties'
import { servicesReducer } from './services'
import { topPropertiesReducer } from './topproperties'
import { usersReducer } from './users'
import { localReducer } from './local'
import { bookingsReducer } from './bookings'
import { roomTypesReducer } from './roomTypes'
import { wifisReducer } from './wifi'
import { roomsReducer } from './rooms'
import { usefulContactsReducer } from './usefulContacts'
import { addonsReducer } from './addons'
import { notificationReducer } from './notification'
import { categoryItemsReducer } from './servicesMenuType'
import { standartItemsReducer } from './servicesStandartType'
import { categoryMenuItemsReducer } from './servicesMenuTypeItems'
import { attractionsReducer } from './servicesAttractions'
import { socketReducer } from './socket'
import { subscriptionReducer } from './subscription'
// import { requestsReducer } from './request'

const reducers = combineReducers({
	login: loginReducer,
	properties: propertiesReducer,
	users: usersReducer,
	services: servicesReducer,
	topProperties: topPropertiesReducer,
	local: localReducer,
	bookings: bookingsReducer,
	roomTypes: roomTypesReducer,
	wifis: wifisReducer,
	rooms: roomsReducer,
	usefulContacts: usefulContactsReducer,
	addons: addonsReducer,
	notifications: notificationReducer,
	// requests: requestsReducer,
	settingsMenuType: categoryItemsReducer,
	settingStandartType: standartItemsReducer,
	settingsMenuTypeItems: categoryMenuItemsReducer,
	settingsAttractionsType: attractionsReducer,
	socket: socketReducer,
	subscription: subscriptionReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store
