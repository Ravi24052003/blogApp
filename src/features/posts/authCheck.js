import axios from "axios";
import conf from "../../conf/conf";

async function authCheck(){
    try {
        const tokenObj =  JSON.parse(localStorage.getItem('token'));

        const formData = new FormData();
        formData.append("controller", "authCheck");

        const {data} = await axios.post(`${conf.serverBaseUrl}/index.php`, formData, {
            headers: {
                Authorization: tokenObj?.token
            }
        });
       
        console.log("posts.js authCheckAsync data", data);

        return data;
    } catch (error) { 
   throw error;
    }
}

export default authCheck