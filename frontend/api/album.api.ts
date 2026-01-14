import { Axios } from "@/lib/axios";
import {
    albumCreateProps,
    albumDeleteProps,
    albumUPdateProps,
    allAlbumProps
} from "@/types/album.types";

export const AlbumCreate = async (props: albumCreateProps) => {
  const { data } = await Axios.post("/admin/albumCreate", props);
  return data;
};

export const AlbumUpdate = async (props: albumUPdateProps) => {
  const { data } = await Axios.put(`/admin/albumUpdate/${props.id}`, props);
  return data;
};

export const AlbumDelete = async (props: albumDeleteProps) => {
  const { data } = await Axios.delete(`/admin/albumDelete/${props.id}`);
  return data;
};

export const GetAllAlbums = async (props: allAlbumProps) => {
  const { page, limit, search, genre } = props;
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
