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

export default { FormatResult };



