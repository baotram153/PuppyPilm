import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Film } from 'lucide-react'
import backgroundSignup from "../assets/img/background2.jpg"

import axios from 'axios'
import axiosPublicInstance from '../api/axiosPublicInstance'

export function Signup() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [houseNumber, setHouseNumber] = useState('')
	const [street, setStreet] = useState('')
	const [district, setDistrict] = useState('')
	const [city, setCity] = useState('')

	const [dob, setDob] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('Signup attempt with:', { name, email, password })

		// call api
		// axios.post('https://puppypilm.tatrungtin.id.vn/api/users/register', { name, email, password })
		const displayedName = name;
		axiosPublicInstance.post('users/register', { displayedName, email, password, dob, houseNumber, street, district, city })
		.then((res) => {
			// if success, redirect to login page
			console.log(res.data.message)
			window.location.href = '/login'
		})
		.catch((err) => {
			console.error(err)
			alert(err.response.data.message)
		})
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-75 bg-cover bg-blend-overlay" style={{ backgroundImage: `url(${backgroundSignup})` }}>
			<Card className="w-[500px] bg-black bg-opacity-75 text-white py-4 px-8">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl flex items-center justify-center">
						<Film className="mr-2" />
						Sign Up
					</CardTitle>
					<CardDescription className="text-gray-400">
						Create an account to start curating your favorite movies
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4 text-left">
					<form onSubmit={handleSubmit}>
						<div className='flex space-x-4'>
							<div className="flex-1 space-y-2 mb-4">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									type="text"
									placeholder="John Doe"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									className="bg-gray-800 border-gray-700 text-white"
								/>
							</div>

							<div className="space-y-2 mb-2">
								<Label htmlFor="dob">Date of Birth</Label>
								<Input
									id="dob"
									type="date"
									value={dob}
									onChange={(e) => setDob(e.target.value)}
									required
									className="bg-gray-800 border-gray-700 text-white"
								/>
							</div>
						</div>
						<div className="space-y-2 mb-4">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="bg-gray-800 border-gray-700 text-white"
							/>
						</div>
						<div className="space-y-2 mb-6">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Password must contain at least 8 characters."
								required
								className="bg-gray-800 border-gray-700 text-white"
							/>
						</div>
						{/* Address */}
						<div className='flex space-x-4 mb-6'>
							<div className='flex space-y-2 flex-col w-1/4'>
								<Label htmlFor="houseNumber">House number</Label>
								<Input
									id="houseNumber"
									type="text"
									placeholder="1234"
									value={houseNumber}
									onChange={(e) => setHouseNumber(e.target.value)}
									required
									className=" bg-gray-800 border-gray-700 text-white"
								/>
							</div>

							<div className='flex flex-col space-y-2 flex-1'>
								<Label htmlFor="street">Street</Label>
								<Input
									id="street"
									type="text"
									placeholder="Main St."
									value={street}
									onChange={(e) => setStreet(e.target.value)}
									required
									className="bg-gray-800 border-gray-700 text-white"
								/>
							</div>
						</div>

						<div className='flex space-x-4 mb-4'>
							<div className='flex flex-col space-y-2 flex-1'>
								<Label htmlFor="address">District</Label>
								<Input
									id="district"
									type="text"
									placeholder="District 1"
									value={district}
									onChange={(e) => setDistrict(e.target.value)}
									required
									className="bg-gray-800 border-gray-700 text-white"
								/>
							</div>

							<div className='flex flex-col space-y-2 flex-1'>
								<Label htmlFor="address">City</Label>
								<Input
									id="city"
									type="text"
									placeholder="Ho Chi Minh City"
									value={city}
									onChange={(e) => setCity(e.target.value)}
									required
									className="bg-gray-800 border-gray-700 text-white"
								/>
							</div>

						</div>

						<Button type="submit" className="w-full mt-4 bg-red-600 hover:bg-red-700">
							Sign Up
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<p className="text-sm text-gray-400 text-center w-full">
						Already have an account? <Link to="/login" className="text-red-400 hover:underline">Log in</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	)
}

