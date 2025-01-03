import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Star, ShieldCheck } from 'lucide-react'
import { Logo } from "../components/Logo"
import { AdminSidebar } from "../components/AdminSideBar"
import movie1 from "../assets/img/poster-1.jpg"
import movie2 from "../assets/img/poster-2.jpg"
import movie3 from "../assets/img/poster-3.jpg"
import backgroundAdmin from "../assets/img/background3.jpg"


export function AdminHomepage() {
    // Sample data - replace with your actual data
    const movies = [
        {
            id: 1,
            title: "Singin' in the Rain",
            rating: 4.8,
            posterUrl: `${movie1}`,
            mpaRating: "G",
            year: 1952
        },
        {
            id: 2,
            title: "Breaking Bad - Season 2",
            rating: 4.9,
            posterUrl: `${movie2}`,
            mpaRating: "R",
            year: 2009
        },
        {
            id: 3,
            title: "Schindler's List",
            rating: 4.9,
            posterUrl: `${movie3}`,
            mpaRating: "R",
            year: 1993
        },
        // Add more movies as needed
    ]

    return (
        <div className="flex w-full h-auto bg-black">
            <AdminSidebar />
            <div className="flex flex-col h-full flex-1 bg-gray-900">
                <div className="p-8" style={{ backgroundImage: `url('${backgroundAdmin}')` }}>
                    <Logo className="text-center text-3xl bg-slate-900 bg-opacity-90 py-2 px-4 inline-block rounded-lg" />
                    <div className="mx-auto space-y-4">
                        {/* Welcome Card */}
                        <Card className="py-4 px-8 bg-black bg-opacity-40 border-gray-700">
                            <CardHeader className="space-y-1 text-left">
                                <div className="flex items-center space-x-4">
                                    <div className="h-10 w-10 rounded-full bg-red-600 border- flex items-center justify-center">
                                        <ShieldCheck className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl text-white">Welcome, Admin!</CardTitle>
                                        <p className="text-gray-400 text-sm">Manage your movie collection and curate content</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-4">
                                    <Card className="bg-gray-800 border-gray-700">
                                        <CardContent>
                                            <div className="text-2xl font-semibold text-white">{movies.length}</div>
                                            <div className="text-sm text-gray-400">Total Movies</div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-gray-800 border-gray-700">
                                        <CardContent>
                                            <div className="text-2xl font-semibold text-white">4.5</div>
                                            <div className="text-sm text-gray-400">Average Rating</div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-gray-800 border-gray-700">
                                        <CardContent>
                                            <div className="text-2xl font-semibold text-white">3</div>
                                            <div className="text-sm text-gray-400">Active Studios</div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Movies Grid */}
                <div className="flex-auto flex flex-col m-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Recent Movies</h2>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {movies.map((movie) => (
                            <Card
                                key={movie.id}
                                className="flex flex-col h-full bg-black bg-opacity-40 border-gray-700 hover:border-gray-600 transition-colors"
                            >
                                <CardHeader className="flex-1 h-2/3 relative">
                                    <img
                                        src={movie.posterUrl || `/placeholder.svg?height=450&width=300`}
                                        alt={movie.title}
                                        className="object-cover h-full rounded-lg"
                                    />
                                    <div className="absolute top-2 right-2">
                                        <Badge variant="secondary" className="bg-black bg-opacity-75 text-white">
                                            {movie.mpaRating}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white truncate">{movie.title}</h3>
                                            <p className="text-sm text-gray-400">{movie.year}</p>
                                        </div>
                                        <div className="flex items-center space-x-1 text-yellow-400">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="text-sm font-medium">{movie.rating}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}