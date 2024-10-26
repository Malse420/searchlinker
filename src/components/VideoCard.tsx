import { SearchResult } from "@/lib/api";
import { Video, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface VideoCardProps {
  video: SearchResult;
}

export const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
      <CardContent className="p-0 relative aspect-video">
        <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-gray-900/30 transition-colors flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <img
          src={`https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&fit=crop`}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-white font-medium truncate">{video.title}</h3>
          <p className="text-gray-200 text-sm line-clamp-2">{video.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};