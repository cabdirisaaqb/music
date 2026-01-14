
import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDeleteGenreHook } from '@/hooks/genre.hook'
function DeleteGenre({id, name}: {id: number, name: string}) {
    const {mutate} = useDeleteGenreHook()
    const handleDelete = () => {
        if(!id) return
        console.log(id);
        
       
       mutate({id})

    }
  return (
    <div>
         <AlertDialog>
                  <AlertDialogTrigger>
                    <Button variant="destructive"   size="icon">
                        <Trash className="text-primary h-6 w-6" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will permanently delete 
                        <span className='text-primary'> {name}</span> from your
                        database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

    </div>
  )
}

export default DeleteGenre