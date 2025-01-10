"use client"

import * as React from "react"
import { Search } from 'lucide-react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/table"

import { useState, useEffect } from "react"
import AxiosPublicInstance from "../api/axiosPublicInstance/"

import { cn } from "../lib/utils"

export default function MovieSearch( { className } ) {
	const [movieData, setMovieData] = useState([])
	const [filteredMovie, setFilteredMovie] = useState([])

	const [searchTitle, setSearchTitle] = useState('')
	const [searchAge, setSearchAge] = useState('')
	const [searchYear, setSearchYear] = useState('')
	const [searchCountry, setSearchCountry] = useState('')
	const [searchRate, setSearchRate] = useState('')
	const [searchGenre, setSearchGenre] = useState('')

	useEffect(() => {
		AxiosPublicInstance.get("movies")
			.then((response) => {
				setMovieData(response.data.data)
				setFilteredMovie(response.data.data)
				console.log(response.data.data)
			})
			.catch((error) => {
				console.error("Error fetching data: ", error)
			})
	}, [])

	const handleSearch = () => {
		console.log(searchTitle, searchAge, searchYear, searchCountry, searchRate, searchGenre)
		const queryParams = [
			searchTitle && `title=${searchTitle}`,
			searchAge && `age=${searchAge}`,
			searchYear && `releasedYear=${searchYear}`,
			searchCountry && `countryName=${searchCountry}`,
			searchRate && `rating=${searchRate}`,
		]
			.filter(Boolean)
			.join('&')
		console.log(queryParams)
		AxiosPublicInstance
			.get(`movies?${queryParams}`)
			.then((res) => {
				console.log(res.data.data)
				setMovieData(res.data.data) // Dữ liệu từ API
				setFilteredMovie(res.data.data)
				if (searchGenre) {
					const genres = searchGenre.split(',').map((genre) => genre.trim())
					console.log(genres)

					const movies = movieData.filter((movie) => {
						console.log(movie.genres)
						return genres.every((genre) => {
							const includesGenre = movie.genres.includes(genre)
							console.log(includesGenre)
							return includesGenre
						})
					})
					setFilteredMovie(movies)
				}
			})
			.catch((error) => {
				console.error('Lỗi khi gọi API:', error)
			})
	}

	return ( 
		<div className={cn("min-h-screen bg-black text-white p-6", className)}>
			<div className="max-w-7xl mx-auto space-y-8">
				{/* Search Form */}
				<div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
					<h2 className="text-2xl font-bold mb-6 text-red-500">Movie Search</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="space-y-2">
							<label className="text-sm text-gray-400">Released Year</label>
							<Input
								type="number"
								value={searchYear}
								onChange={(e) => setSearchYear(e.target.value)}
								placeholder="Greater than..."
								className="bg-zinc-800 border-zinc-700 text-white"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm text-gray-400">Age</label>
							<Input
								type="number"
								value={searchAge}
								onChange={(e) => setSearchAge(e.target.value)}
								placeholder="Less than..."
								className="bg-zinc-800 border-zinc-700 text-white"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm text-gray-400">Genre</label>
							<Input
								type="text"
								value={searchGenre}
								onChange={(e) => setSearchGenre(e.target.value)}
								placeholder="action, comedy, ..."
								className="bg-zinc-800 border-zinc-700 text-white"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm text-gray-400">Rate</label>
							<Select onValueChange={(value) => setSearchRate(value)}>
								<SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
									<SelectValue placeholder="Select Rate" />
								</SelectTrigger>
								<SelectContent className="bg-zinc-800 border-zinc-700">
									<SelectItem value="10" className="text-yellow-100">10</SelectItem>
									<SelectItem value="9" className="text-yellow-100">9</SelectItem>
									<SelectItem value="8" className="text-yellow-100">8</SelectItem>
									<SelectItem value="7" className="text-yellow-100">7</SelectItem>
									<SelectItem value="6" className="text-yellow-100">6</SelectItem>
									<SelectItem value="5" className="text-yellow-100">5</SelectItem>
									<SelectItem value="4" className="text-yellow-100">4</SelectItem>
									<SelectItem value="3" className="text-yellow-100">3</SelectItem>
									<SelectItem value="2" className="text-yellow-100">2</SelectItem>
									<SelectItem value="1" className="text-yellow-100">1</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<label className="text-sm text-gray-400">Title</label>
							<Input
								type="text"
								value={searchTitle}
								onChange={(e) => setSearchTitle(e.target.value)}
								placeholder="e.g. Breaking Bad"
								className="bg-zinc-800 border-zinc-700 text-white"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm text-gray-400">Country</label>
							<Input
								type="text"
								value={searchCountry}
								onChange={(e) => setSearchCountry(e.target.value)}
								placeholder="e.g. Breaking Bad"
								className="bg-zinc-800 border-zinc-700 text-white"
							/>
						</div>
					</div>
					<Button onClick={handleSearch} className="mt-6 bg-red-600 hover:bg-red-700 text-white">
						<Search className="mr-2 h-4 w-4" />
						Search Movies
					</Button>
				</div>

				{/* Results Table */}
				<div className="bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow className="border-zinc-700 bg-zinc-800">
									<TableHead className="text-gray-400">ID</TableHead>
									<TableHead className="text-gray-400">Title</TableHead>
									<TableHead className="text-gray-400">Description</TableHead>
									<TableHead className="text-gray-400">MPA Rating</TableHead>
									<TableHead className="text-gray-400">Year</TableHead>
									<TableHead className="text-gray-400 text-center">Studio</TableHead>
									<TableHead className="text-gray-400 text-center">Country</TableHead>
									<TableHead className="text-gray-400 text-center">Genre</TableHead>
									<TableHead className="text-gray-400">Rate</TableHead>
									<TableHead className="text-gray-400">Trailer</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredMovie.map((movie) => (
									<TableRow key={movie.movie_id} className="border-zinc-700">
										<TableCell className="text-white py-4">{movie.movie_id}</TableCell>
										<TableCell className="text-white font-medium text-left">{movie.title}</TableCell>
										<TableCell className="text-gray-300 max-w-md truncate">
											{movie.description}
										</TableCell>
										<TableCell className="text-white">{movie.mpa_rating}</TableCell>
										<TableCell className="text-white">{movie.released_year}</TableCell>
										<TableCell className="text-white">{movie.studio}</TableCell>
										<TableCell className="text-white">{movie.country}</TableCell>
										<TableCell className="text-white">{
											movie.genres.map((genre) => genre).join(", ")
										}</TableCell>
										<TableCell className="text-white">{Math.round(movie.average_rate * 10) / 10}</TableCell>
										<TableCell className="text-left">
											<a href={movie.link_trailer} target="_blank" rel="noreferrer" className="text-red-700 hover:text-red-800">Watch</a>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</div>
	)
}