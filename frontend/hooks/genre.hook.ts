import {
  CerateGenre as CreateGenre, // Spelling sax ah
  UPdateGenre as UpdateGenre,
  DeleteGenre,
  GetAllGenres,
} from "@/api/genre.api";
import {
  genreCreateProps,
  genreDeleteProps,
  genreUpdateProps,
  allGenreProps,
} from "@/types/genre.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateGenreHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: genreCreateProps) => CreateGenre(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["allGenres"] });
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);

      toast.error(error.response?.data?.message || "error");
    },
  });
};

export const useUpdateGenreHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: genreUpdateProps) => UpdateGenre(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["allGenres"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "error");
    },
  });
};

export const useDeleteGenreHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: genreDeleteProps) => DeleteGenre({ id: data.id }),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["allGenres"] });
      console.log(data);
      
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "error");
      console.log(error);
      
    },
  });
};

export const useGetAllGenresHook = (params: allGenreProps) => {
  return useQuery({
    queryKey: ["allGenres", params],
    queryFn: () => GetAllGenres(params)
  });
};
