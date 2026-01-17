
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
import { Button } from '@/components/ui/button'
import { AlbumDeleteHook } from '@/hooks/album.hook'
import { Trash } from 'lucide-react'
function DeleteAlbum({id, name}: {id: number, name: string}) {
    const {mutate} = AlbumDeleteHook()
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
                      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

    </div>
  )
}

export default DeleteAlbum