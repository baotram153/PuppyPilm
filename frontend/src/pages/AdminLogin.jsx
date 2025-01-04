import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Film } from 'lucide-react'
import backgroundLogin from "../assets/img/background1.jpg"

import axios from 'axios'

export function AdminLogin() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('Login attempt with:', { email, password })

		// call api
		axios.post('https://puppypilm.tatrungtin.id.vn/api/auth/login', { email, password })
			.then((res) => {
				console.log(res.data.message)
				localStorage.setItem('token', res.data.token)
				// localStorage.setItem('user', JSON.stringify(res.data.user))
				window.location.href = '/homepage'
			})
			.catch((err) => {
				console.error(err)
			})

	}
	//   console.log(Input)
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-75 bg-cover bg-blend-overlay text-left" style={{ backgroundImage: `url(${backgroundLogin})` }}>
			<Card className="w-[350px] bg-black bg-opacity-75 text-white py-4 px-8">
				<CardHeader className="space-y-1 text-center">
					<CardTitle className="text-2xl flex items-center justify-center">
						<Film className="mr-2" />
						Log In
					</CardTitle>
					<CardDescription className="text-gray-400">
						Enter your credentials to access your account
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<form onSubmit={handleSubmit}>
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
						<div className="space-y-2 mb-4">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								placeholder="Password must contain at least 8 characters."
								onChange={(e) => setPassword(e.target.value)}
								required
								className="bg-gray-800 border-gray-700 text-white"
							/>
						</div>
						<Button type="submit" className="w-full mt-4 bg-red-600 hover:bg-red-700">
							Sign In
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<p className="text-sm text-gray-400 text-center w-full whitespace-nowrap">
						Or you may want to <Link to="/admin/signup" className="text-red-400 hover:underline">Create an Admin account</Link>!
					</p>
				</CardFooter>
			</Card>
		</div>
	)
}

