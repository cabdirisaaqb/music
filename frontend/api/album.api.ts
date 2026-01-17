import { Axios } from "@/lib/axios";
import {
    
    albumDeleteProps,
    albumUPdateProps,
    allAlbumProps
} from "@/types/album.types";

export const AlbumCreate = async (data: FormData) => {
  const response = await Axios.post("/admin/albumCreate", data, {
    headers: {
      "Content-Type": "multipart/form-data", // Aad u muhiim ah!
    },
  });
  return response.data;
};

// album.api.ts
export const AlbumUpdate = async (id: number | string, data: FormData) => {
  const response = await Axios.put(`/admin/albumUpdate/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const AlbumDelete = async (props: albumDeleteProps) => {
  const { data } = await Axios.delete(`/admin/albumDelete/${props.id}`);
  return data;
};

export const GetAllAlbums = async (props: allAlbumProps) => {
  const { page, limit, search, genre } = props;
  console.log(`page:${page} search:${search} genre:${genre} limit:${limit}`);
  
  if (search) {
    const { data } = await Axios.get(
      `/fetch/allAlbum?page=${page}&limit=${limit}&search=${search}`,
    );
    return data;
  } else if (genre) {
    const { data } = await Axios.get(
      `/fetch/allAlbum?page=${page}&limit=${limit}&genre=${genre}`,
    );
    return data;
  } else {
    const { data } = await Axios.get(
      `/fetch/allAlbum?page=${page}&limit=${limit}`,
    );
    return data;
  }
};

export const GetAlbumById = async () => {
  const { data } = await Axios.get("/fetch/albumById");
  return data;
};