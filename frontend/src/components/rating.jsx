import { Star } from 'lucide-react'

export function Rating({ rating, maxRating = 10 }) {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxRating)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-400">{rating}/{maxRating} stars rating</span>
    </div>
  )
}

