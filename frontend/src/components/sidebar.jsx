import { Home, TrendingUp, Bookmark, List, Settings, User, Trophy, Award, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from "../lib/utils"
import { Logo } from "./Logo"

export function Sidebar({ className }) {
	return (
		<div className={cn("flex h-screen w-64 flex-col bg-black p-4", className)}>
			{/* <div className="mb-8">
        <h1 className="text-2xl text-left font-bold text-red-600">PuppyPilm</h1>
      </div> */}

			<Logo className="text-left text-2xl" />

			<nav className="flex-1 space-y-4">
				<Link to="/movie" className="flex items-center space-x-3 text-gray-300 hover:text-white">
					<List className="h-5 w-5" />
					<span>Filter by Ratings</span>
				</Link>

				{/* <Link to="/rank-page" className="flex items-center space-x-3 text-gray-300 hover:text-white">
          <Award className="h-5 w-5" />
          <span>Filter by Rankings</span>
        </Link> */}

				<Link to="/see-award-rate" className="flex items-center space-x-3 text-gray-300 hover:text-white">
					<Trophy className="h-5 w-5" />
					<span>Filter by Awards</span>
				</Link>
				<Link to="/saved-movies" className="flex items-center space-x-3 text-gray-300 hover:text-white">
					<Bookmark className="h-5 w-5" />
					<span>Saved Movies</span>
				</Link>
				<Link to="/about" className="flex items-center space-x-3 text-gray-300 hover:text-white">
					<Users className="h-5 w-5" />
					<span>About us</span>
				</Link>
			</nav>

			<div className="space-y-4">
				<a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white">
					<Settings className="h-5 w-5" />
					<span>Setting</span>
				</a>
				<a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white">
					<User className="h-5 w-5" />
					<span>My profile</span>
				</a>
			</div>
		</div>
	)
}

