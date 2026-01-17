"use client";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlbumUpdateHook } from "@/hooks/album.hook";
import { useGenreIdHook } from "@/hooks/genre.hook";
import { genreProps } from "@/types/genre.types";
import { Edit } from "lucide-react"; // Waxaan u badalay Edit icon
import { useState } from "react";
import { toast } from "sonner";

function UpdateAlbum({ id, names, descriptions, backgrounds, genress, imgs, searchs, id_genre }: { id: number, names: string, descriptions: string, backgrounds: string, genress: string, imgs: string, searchs: string[]  , id_genre: number}) {
  const { data: genres } = useGenreIdHook();
  const listGenres = genres?.genre;
  
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(names);
  const [description, setDescription] = useState(descriptions);
  const [background, setBackground] = useState(backgrounds);
  const [genre, setGenre] = useState( id_genre|| "");
  const [img, setImg] = useState<File | string | null>(imgs);
  const [search, setSearch] = useState("");
 
  const [dataSearch, setDataSearch] = useState<string[]>(searchs || []);

  const { mutate } = AlbumUpdateHook();

  const handleSearch = () => {
    if (!search.trim()) return;
    setDataSearch((prev) => [...prev, search.trim()]);
    setSearch("");
  };

  const removeSearchTag = (tagToRemove: string) => {
    setDataSearch((prev) => prev.filter((item) => item !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name || !description || !background || !genre || !img) {
      return toast.error("All fields are required");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("background", background);
    formData.append("genre", String(Number(genre)));
    
    
    if (img instanceof File) {
      formData.append("img", img);
    }

  
    
    formData.append("search", JSON.stringify(dataSearch));
   
    

 
    mutate({ id, data: formData }, {
      onSuccess: () => {
        setOpen(false);
       
      },
      
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4 text-green-500" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-0">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="p-6 pb-0">
              <DialogTitle>Update Album</DialogTitle>
              <DialogDescription>
                Modify the details of your album.
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="h-[450px] p-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="grid gap-2">
                  <Label>Search Tags</Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add tag..." 
                      value={search} 
                      onChange={(e) => setSearch(e.target.value)} 
                      onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleSearch(); }}}
                    />
                    <Button type="button" onClick={handleSearch} size="sm">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {dataSearch.map((item, index) => (
                      <span key={index} className="flex items-center gap-1 bg-secondary px-2 py-1 rounded text-xs">
                        {item}
                        <button type="button" onClick={() => removeSearchTag(item)} className="text-red-500 ml-1">x</button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="background">Background Color</Label>
                  <Input id="background" type="color" value={background} onChange={(e) => setBackground(e.target.value)} />
                </div>

                <div className="grid gap-2">
                  <Label>Genre</Label>
                  
                  <Select value={String(genre)}  onValueChange={setGenre}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {listGenres?.map((g: genreProps) => (
                        <SelectItem key={g.id_genre} value={g.id_genre.toString()}>
                          {genre === g.name_genre ? genre : g.name_genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Album Image</Label>
                  <div className="flex flex-col gap-3">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setImg(file);
                      }}
                    />
                    {img && (
                      <div className="relative w-full h-[150px]">
                        <img
                          src={typeof img === "string" ? img : URL.createObjectURL(img)}
                          alt="preview"
                          className="w-full h-full object-cover rounded-md border"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>

            <DialogFooter className="p-6 pt-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateAlbum;