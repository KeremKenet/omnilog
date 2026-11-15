import { MEDIA_TYPE_LABELS, releaseYear, STATUS_LABELS } from "@/lib/media";
import type { LibraryEntry } from "@/types/api";

interface LibraryEntryCardProps {
  entry: LibraryEntry;
}

/** One title of the library: poster, title, status and rating. Read only for now. */
export default function LibraryEntryCard({ entry }: LibraryEntryCardProps) {
  const { media_item: item } = entry;
  const year = releaseYear(item.release_date);

  // Medya türüne göre özel renk sınıfları (Game: Mavi, TV Series: Yeşil, Movie: Mor)
  const getMediaTypeBadgeStyle = (type: string) => {
    switch (type) {
      case "game":
        return "border-blue-500/40 bg-blue-500/20 text-blue-300";
      case "tv_series":
        return "border-emerald-500/40 bg-emerald-500/20 text-emerald-300";
      case "movie":
        return "border-purple-500/40 bg-purple-500/20 text-purple-300";
      default:
        return "border-horizon-cyan/40 bg-horizon-cyan/20 text-cyan-300";
    }
  };

  return (
    <article className="liquid-glass liquid-glass-card flex flex-col overflow-hidden rounded-2xl">
      <div className="relative h-56 w-full overflow-hidden bg-black/40">
        {item.poster_url ? (
          // A plain img, because the poster hosts of IGDB and TMDB are not configured for next/image
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.poster_url} alt={`Poster of ${item.title}`} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-500">No poster</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090C15] via-transparent to-transparent" />
        
        <span className={`absolute left-3 top-3 rounded-full border px-2 py-0.5 text-[10px] font-semibold backdrop-blur-md ${getMediaTypeBadgeStyle(item.media_type)}`}>
          {MEDIA_TYPE_LABELS[item.media_type]}
        </span>

        <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[10px] font-semibold text-slate-200 backdrop-blur-md">
          {STATUS_LABELS[entry.status]}
        </span>
      </div>

      <div className="space-y-1 p-5">
        <h3 className="font-bold tracking-tight text-white">{item.title}</h3>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{year ?? "Release date unknown"}</span>
          <span className="font-semibold text-amber-400">
            {entry.rating === null ? "Not rated" : `★ ${entry.rating}/10`}
          </span>
        </div>
      </div>
    </article>
  );
}