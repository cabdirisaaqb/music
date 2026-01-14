import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SquarePen } from 'lucide-react'
import { useUpdateGenreHook } from '@/hooks/genre.hook'
function EditGener({genre,id}: {genre: string, id: number}) {
    const [open, setOpen] = React.useState(false)
    const [name, setName] = React.useState(genre)
    const {mutate} = useUpdateGenreHook()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!name) 
     console.log({id,name});
     
        mutate({id,name},{
            onSuccess: () => {
                setOpen(false)
              },
        })
      
       
      }
  return (
    <div>
         <Dialog onOpenChange={setOpen} open={open}>
                 
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <SquarePen className="h-6 w-6 dark:text-green-300 text-green-600" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                     <form onSubmit={handleSubmit}>
                      <DialogHeader className='mb-4'>
                        <DialogTitle>Edit genre</DialogTitle>
                        <DialogDescription>
                           Edit <span>{genre}</span>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 mb-3">
                        <div className="grid gap-3">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            defaultValue={name}
                          />
                        </div>
                      
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                  </form>
                    </DialogContent>
                </Dialog>
    </div>
  )
}

export default EditGener