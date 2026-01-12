
 export interface RegisterProps{
    name: string;
    email: string;
    password: string;

}
 export interface LoginProps{
    email: string;
    password: string;

}

export interface  UpdateUserProfileProps{
    name?: string;
    email?: string;
    avatar?: string;
}
export interface UserProps{
    id_user: number;
    name: string;
    email: string;
    avatar: string;
    role: string;
    created_at_user?: string;
    updated_at_user?: string;
}
export interface AllUsersProps{
   
    page:number,
    limit:number,
    search:number
    
}