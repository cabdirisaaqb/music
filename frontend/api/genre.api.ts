import { Axios } from "@/lib/axios";
import { genreCreateProps,allGenreProps,genreDeleteProps,genreUpdateProps} from "@/types/genre.types";


export const  CerateGenre = async(props:genreCreateProps)=>{
    const {data} = await Axios.post("/admin/genreCreate",props)
    return data
}

export const  UPdateGenre = async(props:genreUpdateProps)=>{
    const {data} = await Axios.put(`/admin/genreUpdate/${props.id}`,{name:props.name})
    return data
}
export const  DeleteGenre = async(props:genreDeleteProps)=>{
    const {data} = await Axios.delete(`/admin/genreDelete/${props.id}`)
   
    
    return data
}
export const  GetAllGenres = async(props:allGenreProps)=>{
    if(props.search){
        const {data} = await Axios.get(`/fetch/allGenres?page=${props.page}&limit=${props.limit}&search=${props.search}`)
        return data
    }else{
         const {data} = await Axios.get(`/fetch/allGenres?page=${props.page}&limit=${props.limit}`)
        return data
    }
}

export const  GenreId = async()=>{
    const {data} = await Axios.get(`/fetch/GenreId`)
    return data
}

