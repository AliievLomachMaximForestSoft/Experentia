import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './App.less'
import 'react-chat-elements/dist/main.css'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import LoginPage from './pages/LoginPage/LoginPage'
import Forgot from './pages/LoginPage/Forgot'
import NewPassword from './pages/LoginPage/NewPassword'
import ContentPage from './pages/ContentPage/ContentPage'
import InfoLinkEmail from './pages/LoginPage/InfoLinkEmail'
import Bookings from './components/Bookings/Bookings'
import BookingsAddEdit from './components/Bookings/BookingsAddEdit/BokingsAddEdit'
import BookingsDetails from './components/Bookings/BookingsDetails/BookingsDetails'
import Requests from './components/Requests/Requests'
import SupportChat from './components/SupportChat/SupportChat'
import Notifications from './components/Notifications/Notifications'
import BookingHistory from './components/BookingHistory/BookingHistory'
import About from './components/HotelSettings/About/About'
import Services from './components/HotelSettings/Services/Services'
import ServicesAdd from './components/HotelSettings/Services/ServicesAdd/ServicesAdd'
import ServicesDetails from './components/HotelSettings/Services/ServicesDetails/ServicesDetails'
import RoomTypes from './components/HotelSettings/RoomTypes/RoomTypes'
import Rooms from './components/HotelSettings/Rooms/Rooms'
import RoomsAdd from './components/HotelSettings/Rooms/RoomsAdd/RoomsAdd'
import WiFi from './components/HotelSettings/WiFi/WiFi'
import UsefulContacts from './components/HotelSettings/UsefulContacts/UsefulContacts'
import Addons from './components/HotelSettings/Addons/Addons'
import Subscription from './components/HotelSettings/Subscription/Subscription'
import HowToUse from './components/HowToUse/HowToUse'
import WindowMessages from './components/SupportChat/WindowMessages'
import NotificationsAdd from './components/Notifications/NotificationsAdd/NotificationsAdd'
import Standart from './components/ServiceSettings/Standart/Standart'
import Menu from './components/ServiceSettings/Menu/Menu'
import CategoryDishes from './components/ServiceSettings/CategoryDishes/CategoryDishes'
import CategoryDishesAddEdit from './components/ServiceSettings/CategoryDishes/CategotyDishesAddEdit/CategotyDisherAddEdit'
import Attractions from './components/ServiceSettings/Attractions/Attractions'
import AttractionsAddEdit from './components/ServiceSettings/Attractions/AttractionsAddEdit/AttractionsAddEdit'

function App() {
	const { isAuth, status } = useSelector((state) => state.login)
	const { isSubscription } = useSelector((state) => state.subscription)
	const setStorage = !localStorage.getItem('remember')
		? localStorage.setItem('remember', false)
		: null
	const setSubscription = !localStorage.getItem('subscription')
		? localStorage.setItem('subscription', false)
		: null

	return (
		<BrowserRouter>
			<Routes>
				<Route path='*' element={<ErrorPage status={404} />} />

				<Route path='forgot' element={<Forgot />} />
				<Route path='newPassword' element={<NewPassword />} />
				<Route path='info' element={<InfoLinkEmail />} />

				{/* <Route element={<LoginPage />}> */}

				<Route
					element={
						!isAuth && localStorage.getItem('remember') === 'false' ? (
							<LoginPage />
						) : localStorage.getItem('subscription') === 'false' ||
						  isSubscription === 'first' ? (
							<Subscription />
						) : status === 200 ? (
							<ContentPage />
						) : (
							<ErrorPage status={status} />
						)
					}
				>
					<Route path='/' element={<Bookings />} />
					<Route path='bookings/add' element={<BookingsAddEdit />} />
					<Route path='bookings/:id' element={<BookingsDetails />} />
					<Route path='bookings/edit/:id' element={<BookingsAddEdit />} />
					<Route path='requests' element={<Requests />} />
					<Route path='supportChat' element={<SupportChat />}>
						<Route path=':id' element={<WindowMessages />} />
					</Route>
					<Route
						path='serviceSettings/menu/:name/:id/:tax'
						element={<Menu />}
					/>
					<Route
						path='serviceSettings/attraction/:name/:id/:tax'
						element={<Attractions />}
					/>
					<Route
						path='serviceSettings/:name/:id/attraction/:type/new'
						element={<AttractionsAddEdit />}
					/>
					<Route
						path='serviceSettings/:name/:subName/:id/attraction/:type'
						element={<AttractionsAddEdit />}
					/>
					<Route
						path='serviceSettings/:name/:subName/:id/:tax/items'
						element={<CategoryDishes />}
					/>
					<Route
						path='serviceSettings/:name/:subName/:id/:tax/dish-add/:type'
						element={<CategoryDishesAddEdit />}
					/>
					<Route
						path='serviceSettings/:name/:subName/:id/:tax/dish-edit/:type/:itemid'
						element={<CategoryDishesAddEdit />}
					/>
					<Route
						path='serviceSettings/standart/:name/:id/:tax'
						element={<Standart />}
					/>
					<Route path='notifications' element={<Notifications />} />
					<Route path='notifications/add' element={<NotificationsAdd />} />
					<Route path='bookingHistory' element={<BookingHistory />} />
					<Route path='hotelSettings/about' element={<About />} />
					<Route path='hotelSettings/services' element={<Services />} />
					<Route path='hotelSettings/services/add' element={<ServicesAdd />} />
					<Route
						path='hotelSettings/services/:id'
						element={<ServicesDetails />}
					/>
					<Route
						path='hotelSettings/services/edit/:id'
						element={<ServicesAdd />}
					/>
					<Route path='hotelSettings/roomTypes' element={<RoomTypes />} />
					<Route path='hotelSettings/rooms' element={<Rooms />} />
					<Route path='hotelSettings/rooms/add' element={<RoomsAdd />} />
					<Route path='hotelSettings/rooms/edit/:id' element={<RoomsAdd />} />
					<Route path='hotelSettings/wiFi' element={<WiFi />} />
					<Route
						path='hotelSettings/usefulContacts'
						element={<UsefulContacts />}
					/>
					<Route path='hotelSettings/addons' element={<Addons />} />
					<Route path='hotelSettings/subscription' element={<Subscription />} />
					<Route path='howToUse' element={<HowToUse />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
