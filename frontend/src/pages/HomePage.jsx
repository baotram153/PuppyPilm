import { ArrowLeft, ChevronRight, Play } from 'lucide-react'
import { Button } from "../components/ui/Button"
import { Sidebar } from "../components/sidebar"
import { Rating } from "../components/rating"
import { EpisodeCard } from "../components/episode-card"
import background from "../assets/img/dark-1.jpg"
import episode1 from "../assets/img/dark-2.jpg"
import episode2 from "../assets/img/dark-3.jpg"
import episode3 from "../assets/img/dark-4.jpg"
import episode4 from "../assets/img/dark-5.jpg"
import episode5 from "../assets/img/dark-6.jpg"

export default function App() {
    return (
        <div className="flex w-full h-full bg-black">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                <div
                    className="relative min-h-screen bg-cover bg-center px-8 py-6"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url('${background}')`
                    }}
                >
                    {/* Navigation */}
                    <nav className="mb-12 flex items-center text-gray-400">
                        <Button variant="ghost" className="text-gray-400">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Browse
                        </Button>
                    </nav>

                    {/* Content */}
                    <div className="max-w-4xl text-left">
                        <h1 className="mb-4 text-6xl font-bold tracking-tight text-white">
                            DARK
                        </h1>

                        <p className="mb-6 text-gray-300 bg-slate-950 bg-opacity-70 rounded-lg">
                            A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.
                        </p>

                        <Rating rating={8} />

                        <div className="space-x-4 my-6">
                            <Button className="bg-red-600 text-white hover:bg-red-700">
                                <Play className="mr-2 h-4 w-4" />
                                TRAILER
                            </Button>
                            <Button variant="secondary" className="bg-slate-600 text-white hover:bg-slate-700">REVIEW</Button>

                        </div>

                        {/* Seasons */}
                        <div className="mb-6 space-x-6">
                            <Button variant="link" className="text-red-600">Season 1</Button>
                            <Button variant="link" className="text-gray-400">Season 2</Button>
                            <Button variant="link" className="text-gray-400">Season 3</Button>
                        </div>

                        {/* Episodes */}
                        <div className="relative">
                            <div className="h-48 flex space-x-4 overflow-x-auto pb-4">
                                <EpisodeCard
                                    title="Episode 1: I heard a scream"
                                    image={episode1}
                                    className="flex-shrink-0 h-full w-64"
                                />
                                <EpisodeCard
                                    title="Episode 2: Run"
                                    image={episode2}
                                    className="flex-shrink-0 h-full w-64"
                                />
                                <EpisodeCard
                                    title="Episode 3: Stay right there"
                                    image={episode3}
                                    className="flex-shrink-0 h-full w-64"
                                />
                                <EpisodeCard
                                    title="Episode 4: The Gods are coming"
                                    image={episode4}
                                    className="flex-shrink-0 h-full w-64"
                                />
                                <EpisodeCard
                                    title="Episode 5: We're dead"
                                    image={episode5}
                                    className="flex-shrink-0 h-full w-64"
                                />
                            </div>
                        </div>
                        <div className="absolute bottom-4 right-0 flex items-center space-x-2 bg-gradient-to-l from-black px-4">
                            <span className="text-sm text-gray-400">More like this</span>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

