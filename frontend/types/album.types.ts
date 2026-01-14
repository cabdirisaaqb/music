export interface AlbumProps {
  id_album: number;
  name_album: string;
  description_album: string;
  genre_album_id: number;
  search_album: string[];
  image_url_album: string;
  background: string;
  created_at_album: string;
  updated_at_album: string;
}

export interface albumCreateProps {
  name: string;
  description: string;
  genre: number;
  search: string[];
  background: string;
  img: File; 
}

export interface albumUPdateProps {
  name?: string;
  description?: string;
  genre?: number;
  search?: string[];
  background?: string;
  img?: File; 
  id:number
}

export interface albumDeleteProps {
  id: number;
}
export interface allAlbumProps {
  page?: number;
  limit?: number;
  search?: string;
  genre?: number;

}





