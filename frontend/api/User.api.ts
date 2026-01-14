import { Axios } from "@/lib/axios";
import { AllUsersProps, LoginProps, RegisterProps, UpdateUserProfileProps } from "@/types/User.types";

export const Register = async (props: RegisterProps) => {
  const { data } = await Axios.post("/user/register", props);
  return data;
};

export const Login = async (props: LoginProps) => {
  const { data } = await Axios.post("/user/login", props);
  return data;
};

export const Logout = async () => {
  const { data } = await Axios.get("/user/logout");
  return data;
};

export const Me = async () => {
  const { data } = await Axios.get("/user/me");
  return data;
};

export const UpdateUserProfile = async (props: UpdateUserProfileProps) => {
    const { data } = await Axios.patch("/user/update", props);
  return data;


}
export const AllUsers = async (props:AllUsersProps) => {
    const {limit,page,search} = props;
   
    if(search){
        const { data } = await Axios.get("/user/all",{params:{limit,page,search}});
        return  data

    }else{
         const { data } = await Axios.get("/user/all",{params:{limit,page}});
          return  data

    }
  
}