import axios from "axios";
import { list } from "firebase/storage";

// import { productImages } from "./../../configs/schema";

const FormatResult = (resp) => {
    let result=[];
    let finalResult=[];
    resp.forEach((item)=>{
        const listingId=item.ProductListing?.id;
        if(!result[listingId]){
            result[listingId]={
                product:item.ProductListing,
                images:[]
            }
        }

        if(item.productImages){
            result[listingId].images.push(item.productImages)
        }
    })  

    result.forEach((item)=>{
        finalResult.push({
            ...item.product,
            images:item.images
        })

    })

    return finalResult; 
}
const SendBirdApplicationId = import.meta.env.VITE_SENDBIRD_APP_ID
const SendBirdApiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN
const CreateSendBirdUser =(userId,nickname,profileUrl)=>{
    return axios.post('https://api-'+SendBirdApplicationId+'.sendbird.com/v3/users',
        {

        user_id:userId,
        nickname:nickname,
        profile_url:profileUrl,
        issue_access_token:false
        },{
            headers:{
                'Content-Type':'application/json',
                'Api-token':SendBirdApiToken
            }
        })
}

export default { FormatResult , CreateSendBirdUser};



