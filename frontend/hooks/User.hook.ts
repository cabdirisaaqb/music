
import { AllUsers, Login, Logout, Me, Register, UpdateUserProfile } from "@/api/User.api";
import { AllUsersProps, LoginProps, RegisterProps, UpdateUserProfileProps } from "@/types/User.types";
import { useMutation } from "@tanstack/react-query";
import {toast} from "sonner";


export const RegisterUserHook = () => {
   
    return useMutation({
        mutationFn: (data: RegisterProps) => {
            return Register(data);

           
        },
        onSuccess: (data):void => {
            
            toast.success(data.message);
            console.log(data.message);
            
            
          
        },
        onError: (error:Error):void => {
            toast.error(error.response.data.massage
);
              console.log(error);
          
        }
      
    });
};

export const LoginUserHook = () => {
    return useMutation({
        mutationFn: (data:LoginProps) => {
            return Login(data);
           
        },
        onSuccess: (data) => {
            
            toast.success(data.massage);
          
            
          
        },
        onError: (error:Error) => {
            toast.error(error.response.data.massage);
             
          
        }
      
    });
};

export const LogoutUserHook = () => {
    return useMutation({
        mutationFn: () => {
            return Logout();
           
        },
        onSuccess: (data) => {
            
            toast.success(" logout successful");
            console.log(data);
            
          
        },
        onError: (error) => {
            toast.error(" logout failed");
              console.log(error);
          
        }
      
    });
};

export const UpdateUserProfileHook = () => {
    return useMutation({
        mutationFn: ( data:UpdateUserProfileProps) => {
            return  UpdateUserProfile(data);
           
        },
        onSuccess: (data) => {
            
            toast.success("update successful");
            console.log(data);
            
          
        },
        onError: (error) => {
            toast.error(" update failed");
              console.log(error);
          
        }
      
    });
};

export const  MeUserHook = () => {
    return useMutation({
        mutationFn: () => {
            return  Me();
           
        },
        onSuccess: (data) => {
           
            console.log(data);
            
          
        },
        onError: (error) => {
            toast.error(" Me failed");
              console.log(error);
          
        }
      
    });
};

export const  AllUsersHook = () => {
    return useMutation({
        mutationFn: (data:AllUsersProps) => {
            return  AllUsers(data);
           
        },
        onSuccess: (data) => {
           
            console.log(data);
            
          
        },
        onError: (error) => {
            toast.error(" Me failed");
              console.log(error);
          
        }
      
    });
};





