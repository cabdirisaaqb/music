"use client";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGenreIdHook } from "@/hooks/genre.hook";
import { genreProps } from "@/types/genre.types";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { albumCreateProps } from "@/types/album.types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { AlbumCreateHook } from "@/hooks/album.hook";
function AddAlbum() {
    const { data: genres } = useGenreIdHook();
    const listGenres = genres?.genre;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [background, setBackground] = useState("");
  const [genre, setGenre] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState<string[]>([]);

  const handleSearch = () => {
    if (!search) return;
    setDataSearch((prev) => [...prev, search])
    setSearch("");
    
    
  }
  const removeSearchTag = (tagToRemove: string) => {
  setDataSearch((prev) => prev.filter((item) => item !== tagToRemove));
};
 const {mutate}  = AlbumCreateHook()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !description || !background || !genre || !img || !dataSearch)  return toast.error("All fields are required");
   
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("background", background);
  formData.append("genre", String(Number(genre)));
  formData.append("img", img);
   formData.append("search", JSON.stringify(dataSearch));

  
     // cast FormData to albumCreateProps to satisfy mutate's parameter type
     mutate(formData, {
        onSuccess: () => {
            setOpen(false);
           
            setName("");
            setDescription("");
            setBackground("");
            setGenre("");
            setImg(null);
            setSearch("");
            setDataSearch([]);
            
          },

     })
     
     

  }

 


  return (
    <div>
      

       
      <Dialog open={open} onOpenChange={setOpen} >
            
          <DialogTrigger asChild>
            <Button variant="outline">
              <CirclePlus className="h-6 w-6 text-green-600 dark:text-green-300" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">

             
        <form onSubmit={handleSubmit} className="overflow-y-scroll h-[600px]"  >
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            

           
            <div className="grid gap-4 ">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your album  name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter your album  description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="search">search</Label>
                <div className="flex space-x-1">

                <Input
                  id="search"
                  name="search"
                  placeholder="Enter your album  description"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                 
                />
                <Button type="button" onClick={handleSearch} className="cursor-pointer">Add</Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                    {dataSearch.map((item, index) => (
                      <span key={index} className="flex items-center gap-1 bg-secondary px-2 py-1 rounded text-xs">
                        {item}
                        <button type="button" onClick={() => removeSearchTag(item)} className="text-red-500 ml-1">x</button>
                      </span>
                    ))}
                  </div>

              <div className="grid gap-3">
                <Label htmlFor="background">background</Label>
                <Input
                  id="background"
                  name="background"
                  type="color"
               
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="genre">genre</Label>
                <Select
                  value={genre}
                  onValueChange={(value) => setGenre(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>genre</SelectLabel>
                      {listGenres?.map((genre: genreProps) => (
                        <SelectItem
                          value={genre.id_genre.toString()}
                          key={genre.id_genre}
                        >
                          {genre.name_genre}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="img" className="bg-red-600 p-2 flex flex-col cursor-pointer">Img
                 
                 <Input
                  id="img"
                  name="img"
                  type="file"
                  accept="image/*"
                  hidden
                  
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0] ?? null;
                    if (file) setImg(file);
                  }}
                />
                
                 </Label>
              
                 
                {img && (
                  <Image
                  id="img"
                    src={URL.createObjectURL(img)}
                    alt="album"
                    width={200}
                    height={200}
                    className="rounded-md"
                  />
                )}
                 
              </div>

            </div>
            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="cursor-pointer">Save</Button>
            </DialogFooter>
        </form>
          </DialogContent>
       
      </Dialog>
     
    </div>
  );
}

export default AddAlbum;
