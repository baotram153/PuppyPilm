import { Home, TrendingUp, Bookmark, List, Settings, User, Trophy, Award, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from "../lib/utils"

export function Logo({ className }) {
  return (
    <div className={cn("mb-4", className)}>
        <h1 className="font-bold text-red-600">PuppyPilm</h1>
    </div>
  )
}
