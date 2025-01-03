import { Home, TrendingUp, Bookmark, List, Settings, User } from 'lucide-react'
import { cn } from "../lib/utils"

export function Sidebar({ className }) {
  return (
    <div className={cn("flex h-screen w-64 flex-col bg-black p-4", className)}>
      <div className="mb-8">
        <h1 className="text-2xl text-left font-bold text-red-600">PuppyPilm</h1>
      </div>
      
      <nav className="flex-1 space-y-4">
        <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white">
          <Home className="h-5 w-5" />
          <span>Home</span>
        </a>
        <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white">
          <List className="h-5 w-5" />
          <span>Browse</span>
        </a>
        <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white">
          <TrendingUp className="h-5 w-5" />
          <span>Trending</span>
        </a>
        <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white">
          <Bookmark className="h-5 w-5" />
          <span>Saved</span>
        </a>
        <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white">
          <List className="h-5 w-5" />
          <span>Playlist</span>
        </a>
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

