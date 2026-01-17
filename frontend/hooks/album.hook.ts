import {
  AlbumCreate,
  AlbumDelete,
  AlbumUpdate,
  GetAllAlbums,
} from "@/api/album.api";
import {
  albumDeleteProps,
  allAlbumProps
} from "@/types/album.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const AlbumCreateHook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => AlbumCreate(data),
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["allAlbums"] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data?.message || "error");
    },
  });
};

export const AlbumUpdateHook = () => {
  const queryClient = useQueryClient();

  return useMutation({
  
    mutationFn: ({ id, data }: { id: number | string; data: FormData }) => 
      AlbumUpdate(id, data),
    
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message || "Updated successfully");
      queryClient.invalidateQueries({ queryKey: ["allAlbums"] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data?.message || "Error occurred");
    },
  });
};

export const AlbumDeleteHook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: albumDeleteProps) => AlbumDelete(data),
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["allAlbums"] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data?.message || "error");
    },
  });
};

export const GetAllAlbumsHook =  (data:allAlbumProps) => {
  return   useQuery({
    queryKey: ["allAlbums",data],
    queryFn: () => GetAllAlbums(data),
  });
};
