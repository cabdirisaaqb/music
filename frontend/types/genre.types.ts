
export interface genreProps{
    id_genre:number;
    name_genre:string;
    
} 
export interface genreCreateProps{
    name:string;
}
export interface genreUpdateProps{
    name:string;
    id:number;
}
export interface genreDeleteProps{
    id:number;
}
export interface allGenreProps{
    page?:number;
    limit?:number;
    search?:string;
}