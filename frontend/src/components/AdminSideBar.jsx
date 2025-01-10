import { LogOut, List, Settings, User, Trophy, UserPen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from "../lib/utils"
import { Logo } from "./Logo"
import { Sidebar } from './SideBar'

export function AdminSidebar({ className }) {
	return (
		<div className={cn("flex h-auto w-64 flex-col bg-black p-4 justify-between", className)}>
			<Logo className="text-left text-2xl" />

			<nav className="flex-1 space-y-4">
				<Link to="/admin/add-movie" className="flex items-center space-x-3 text-gray-300 hover:text-white">
					<List className="h-5 w-5" />
					<span>Manage Movies</span>
				</Link>

				<Link to="/admin/rank-page" className="flex items-center space-x-3 text-gray-300 hover:text-white">
					<Trophy className="h-5 w-5" />
					<span>Manage Users</span>
				</Link>

				<Link to="/admin/signup" className="flex items-center space-x-3 text-gray-300 hover:text-white">
					<UserPen className="h-5 w-5" />
					<span>Create Admin Account</span>
				</Link>

				<Link to="/" className="flex items-center space-x-3 text-gray-300 hover:text-white">
					<LogOut className="h-5 w-5" />
					<span>Log Out</span>
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

