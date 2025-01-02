import { cn } from "../lib/utils"

export function EpisodeCard({ title, image, className }) {
  return (
    <div className={cn("group relative cursor-pointer", className)}>
      <img
        src={image}
        alt={title}
        className="h-5/6 w-full rounded object-cover transition-transform duration-200 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-2">
        <p className="text-sm text-white">{title}</p>
      </div>
    </div>
  )
}

