export interface SongProps {
  id_song: number;
  name_song: string;
  description_song: string;
  album_id: number;
  duration_song: string;
  genre_song_id: number;
  audio_url: string;
  image_url_song: string;
  search_song: string[];
  created_at_song: string;
  updated_at_song: string;
}
export interface SongCreate {
  name: string;
  description: string;
  album_id: number;
  genre: number;
  audio: File;
  img: File;
  search: string[];
}
export interface SongUpdate {
  id: number;
  name: string;
  description: string;
  album_id: number;
  genre: number;
  audio: File;
  img: File;
  search: string[];
}
export interface SongDelete {
  id: number;
}
export interface allSongProps {
  page?: number;
  limit?: number;
  search?: string;
  genre?: number;
}
