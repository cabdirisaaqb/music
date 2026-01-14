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
import { useCreateGenreHook } from "@/hooks/genre.hook";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

function AddGenre() {
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState(false); // Si loo xiro dialog-ga
  
  const { mutate, isPending } = useCreateGenreHook();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return; // Hubi in magaca la qoray

    mutate(
      { name },
      {
        onSuccess: () => {
          setName("");
          setOpen(false); // Xir dialog-ga marka ay guulaysato
        },
      },
    );
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <CirclePlus className="h-6 w-6 text-green-600 dark:text-green-300" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[425px]">
          {/* Form-ka halkan billow */}
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add Genre</DialogTitle>
              <DialogDescription>Enter the name of the genre below.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="genre">Genre Name</Label>
                <Input
                  id="genre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter genre name"
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save genre"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddGenre;