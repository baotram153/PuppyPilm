import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Film } from 'lucide-react'
import backgroundSignup from "../assets/img/background2.jpg"

export function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle signup logic here
    console.log('Signup attempt with:', { name, email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-75 bg-cover bg-blend-overlay" style={{backgroundImage: `url(${backgroundSignup})`}}>
      <Card className="w-[400px] bg-black bg-opacity-75 text-white px-4">
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
            <div className="space-y-2 mb-6">
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
            <div className="space-y-2 mb-6">
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

