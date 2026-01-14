"use client";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useGetAllGenresHook } from "@/hooks/genre.hook";
import { genreProps } from "@/types/genre.types";
import Header from "../_components/Header";
import DeleteGenre from "../_components/genre/Delete.Genre";
import EditGener from "../_components/genre/Edit.Gener";
import AddGenre from "../_components/genre/add";
import { useEffect, useState } from "react";
import Paginations from "../_components/genre/Paginations";
function Genre() {
 const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

 const [search, setSearch]= useState("")
const [debouncedSearch, setDebouncedSearch] = useState("");

  // 3. useEffect si loo maareeyo waqtiga
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500); 

    return () => {
      clearTimeout(handler); 
    };
  }, [search]);

      const { data } = useGetAllGenresHook({
        limit,
        page,
        search : debouncedSearch || undefined,

    
      });

 
 const genresList = data?.genres || [];
 const totalGenres = parseInt(data?.total_genres || "0");
 
 

  return (
    <div className="mt-5">
      <Header title="Genre" />

      <div className="mx-auto mt-10 flex w-[80%] items-center justify-between space-x-1 overflow-hidden">
        <div className="">
          <Input placeholder="Search" className="md:w-[400px] lg:w-[600px]"  value={search} onChange={(e)=> setSearch(e.target.value)}/>
        </div>
        {/* add genre */}
        <AddGenre />
      </div>
      <div className="mx-auto mt-10 flex w-[80%] items-center justify-center overflow-hidden">
        <Table className="w-full">
          <TableCaption>{genresList.length < 0 ? "No genres found" : "Genres"}</TableCaption>
          <TableHeader>
            <TableRow>
             
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
             {genresList?.map((item: genreProps, index: number)=>(
                 <TableRow key={index}>
                 
                  <TableCell>{item.id_genre <9 ? "00" + item.id_genre: item.id_genre <99 ? "0"+item.id_genre : item.id_genre}</TableCell>
                  <TableCell>{item.name_genre}</TableCell>
                  <TableCell>
                    {/* edit genre */}
                    <EditGener id={item.id_genre} genre={item.name_genre}/>
                  </TableCell>
                  <TableCell>
                    {/* delete genre */}
                    <DeleteGenre id={item.id_genre} name={item.name_genre}/>
                  </TableCell>
                </TableRow>
             ))}
            
          </TableBody>
        </Table>
      </div>
     
     <Paginations 
          currentPage={page} 
          totalItems={totalGenres} 
          limit={limit} 
          onPageChange={(newPage) => setPage(newPage)} 
        />
     
     
      
    </div>
  );
}

export default Genre;
