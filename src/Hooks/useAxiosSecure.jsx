import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


const axiosSecure = axios.create({
 baseURL: 'https://car-doctor-server-six-psi.vercel.app',
 withCredentials: true,
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {logout} = useAuth()
    useEffect(()=>{
        axiosSecure.interceptors.response.use(res => {
            return res; 
        }, error => {
            // console.log('error tracked in the interceprors', error.response)
            if(error.response.status === 401 || error.response.status === 403 ){
                console.log('log out the user : ')
                logout()
                .then(()=>{
                    navigate('/login')
                }).catch(error => console.log(error))
            }
        })
    },[])
    return axiosSecure;
};

export default useAxiosSecure;