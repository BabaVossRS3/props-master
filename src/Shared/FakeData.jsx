import { faker } from "@faker-js/faker";


function createRandomItemList(){
    return{
        name:faker.vehicle.vehicle(),
        fueltype:faker.vehicle.fuel(),
        model:faker.vehicle.model(),
        type:faker.vehicle.type(),
        image: 'https://www.yumianfurniture.com/wp-content/uploads/2021/10/luxury-furniture-9-6.jpg',
        miles:3000,
        gearType:'Manual',
        price:faker.finance.amount({min:100,max:1500}) +'€'
    };
}

const itemList = faker.helpers.multiple(createRandomItemList,{
    count: 7
})

export default {itemList}