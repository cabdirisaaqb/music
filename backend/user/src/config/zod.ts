import {z} from "zod"

export const UserSchema = z.object({
    name:z.string().min(3,"name must be at least 3 characters"),
    email:z.string().email("invalid email"),
    password:z.string().min(8,"password must be at least 8 characters").max(20,"password must be at most 20 characters")

})

