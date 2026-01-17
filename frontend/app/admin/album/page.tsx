"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetAllAlbumsHook } from "@/hooks/album.hook";
import { AlbumProps } from "@/types/album.types";
import { Input } from "@base-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddAlbum from "../_components/album/add.album";
import DeleteAlbum from "../_components/album/Delete.Album";
import UpdateAlbum from "../_components/album/ubdate.album";
import Header from "../_components/Header";
import Paginations from "../_components/genre/Paginations";

function Album() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const searchQuery = searchParams.get("search") || "";

  const [search, setSearch] = useState(searchQuery || "");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", limit.toString());
    params.set("page", newPage.toString());
    params.delete("search");

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search.trim()) {
        params.set("search", search.trim());
        params.set("limit", limit.toString());
        params.set("page", "1");
      } else {-
        params.delete("search");
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
    
  }, [search,router,pathname,limit,searchParams]);

  useEffect(() => {
    setDebouncedSearch(searchQuery);
  }, [searchQuery]);

  const { data: albums } = GetAllAlbumsHook({
    limit,
    page,
    search: debouncedSearch || undefined
    
  });

  const listAlbums = albums?.data;
  const totalItems = albums?.totalItems || 0;
  return (
    <div className="mt-5">
      <Header title="Album" />
      
    

      <div className="mx-auto mt-5 w-[80%]">
        <div className="mx-auto mt-10 flex items-center justify-between space-x-1 overflow-hidden">
          <div className="border">
            <Input
              placeholder="Search"
              type="search"
              className="p-2 md:w-[400px] lg:w-[600px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* add album */}
          <AddAlbum />
        </div>

        <div className="mx-auto mt-10 flex items-center justify-center overflow-x-auto">
          <Table className="w-full">
            <TableCaption>Albums</TableCaption>
            <TableHeader>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>description</TableCell>
                <TableCell>img</TableCell>

                <TableCell>background</TableCell>
                <TableCell>search</TableCell>
                <TableCell>genre</TableCell>
                <TableCell>created_at</TableCell>
                <TableCell>updated_at</TableCell>
                <TableCell>edit</TableCell>
                <TableCell>delete</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {listAlbums?.map((album: AlbumProps, index: number) => (
                <TableRow key={index}>
                  <TableCell>{album.id_album}</TableCell>
                  <TableCell>{album.name_album}</TableCell>
                  <TableCell>{album.description_album}</TableCell>
                  <TableCell>
                    <img
                      src={album.image_url_album}
                      alt="album"
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                  </TableCell>

                  <TableCell>
                    <span style={{ backgroundColor: album.background }}>
                      {album.background}
                    </span>
                  </TableCell>
                  <TableCell>
                    {album.search_album.map((item, index) => (
                      <div key={index}>
                        <ul className="flex items-center justify-between">
                          <li>{item}</li>
                        </ul>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{album.name_genre}</TableCell>
                  <TableCell>
                    {new Date(album.created_at_album).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    {new Date(album.updated_at_album).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <UpdateAlbum
                      id_genre={album.id_genre}
                      genress={album.name_genre}
                      searchs={album.search_album}
                      key={index}
                      id={album.id_album}
                      names={album.name_album}
                      backgrounds={album.background}
                      imgs={album.image_url_album}
                      descriptions={album.description_album}
                    />
                  </TableCell>

                  <TableCell>
                    <DeleteAlbum id={album.id_album} name={album.name_album} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Paginations
          currentPage={page}
          totalItems={totalItems}
          limit={limit}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Album;