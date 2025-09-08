

// Loading the category dynamically 

let categoryApi = "https://openapi.programming-hero.com/api/categories";


async function loadCategory (url) {

    try {

        let response = await fetch(url);
        let responseConvertedToJson = await response.json();

        // rawArray variable is the Array from server

        let rawArray = responseConvertedToJson.categories;

        rawArray.forEach(arrayItem => {

            let arrId = arrayItem.id;
            
            let allCategoryName = arrayItem.category_name;

            // console.log(allCategoryName);

            let getCategoryDiv = document.getElementById('cat');

            let newlyCreatedDiv = document.createElement('div');

            newlyCreatedDiv.innerHTML = `<div onclick="getCatIdOnly(${arrId})" class="button bg-green-600 m-1 p-2 rounded-md">
                <button  class="font-bold text-white text-xs text-left " >${allCategoryName}</button>
            </div>`
            getCategoryDiv.appendChild(newlyCreatedDiv);

        });

    } catch (error) {
        console.log("Error message:-", error);
    }
    
}

loadCategory(categoryApi);


// Load all the plants alltogether

let allPlantApi = "https://openapi.programming-hero.com/api/plants";

async function loadAllPlant (url) {

    try {

        let response = await fetch(url);
        let responseConvertedToJson = await response.json();

        // rawArray variable is the Array from server

        let rawArrayOfTress = responseConvertedToJson.plants;

        // console.log(rawArrayOfTress);

        rawArrayOfTress.forEach(arrayItem => {
            
            // Data to be shown
            let plantImage = arrayItem.image;
            let plantNam = arrayItem.name;
            let plantDescription = arrayItem.description;
            let plantCategory = arrayItem.category;
            let plantPrice = arrayItem.price;
            let itemid = arrayItem.id;
            


            let getTreeDataDiv = document.getElementById('tree-data');

            let newlyCreatedDivForTreeData = document.createElement('div');

            newlyCreatedDivForTreeData.innerHTML = `<div class="card-1 p-1 border-2 w-full h-auto rounded-md md:w-full ">

                <img class=" w-full h-[150px] bg-cover rounded-md" src="${plantImage}" alt="">

                <h1 class="text-sm font-bold my-1" >${plantNam}</h1>

                <p class="text-xs text-justify" >${plantDescription}</p>

                <div class="tree-type flex flex-row  justify-between mt-2 p-1">
                    <span class="text-xs font-bold bg-green-600 rounded-md px-2" >${plantCategory}</span>
                    <span class="text-xs font-bold" >${plantPrice}</span>
                </div>
                
                <div id="btndiv-${itemid}" onclick="getprice(${plantPrice}); addToCart('${plantNam}', ${plantPrice})" class="card-button flex justify-center mt-4">
                    <button class="bg-green-700 rounded-md text-center text-sm font-bold text-white p-2" >Add to Cart</button>
                </div>

            </div>`;
    
            getTreeDataDiv.appendChild(newlyCreatedDivForTreeData);
        

           
        });

    } catch (error) {
        console.log("Error message:-", error);
    }
    
}

loadAllPlant (allPlantApi);

// get the price

let pricarray = [];


function getprice(price){
    // Ensure numeric value
    pricarray.push(Number(price));

    let total = 0;

    for(let p of pricarray){
        total += p;
    }

    let getCartheading = document.getElementById('total-display');
    // console.log(getCartDiv);
    getCartheading.innerText = total;

    // removeCart(total);
    
};



// add to cart function

let rempricearr = [];

console.log(rempricearr);

function addToCart(name, price) {

            let getCartDiv = document.getElementById('cart-box');
            // console.log(getCartDiv);
            let createdDiv = document.createElement('div');
            
            createdDiv.innerHTML = `<div class="cart-list p-1 bg- bg-green-400 rounded-md m-1">

                <div class="top font-bold flex justify-between shadow-2xl md:min-w-[80px]">
                    <h1 class="text-[15px] md:text-xs">${name} </h1>
                    <button><i class="fa-solid fa-square-xmark"></i></button>
                </div>
                <h1 class="cart-price font-bold text-right md:text-xs" >${price} Tk</h1>
            </div>`;

            getCartDiv.appendChild(createdDiv);

             const cartBox = document.getElementById("cart-box");

            cartBox.addEventListener("click", (event) => {

    // check if  icon clicked

             if (event.target.classList.contains("fa-square-xmark")) {

        // remove only the nearest .cart-list

            const listItem = event.target.closest(".cart-list");
            if (listItem) {

                

                const priceElem = listItem.querySelector(".cart-price");
                const rprice = priceElem ? parseInt(priceElem.innerText) : 0;

                rempricearr.push(Number(rprice));
                // console.log(rempricearr);

                const rtotal = rempricearr.reduce((sum, p) => sum + p, 0);
                // console.log("Removed total:", typeof rtotal);

                listItem.remove();

                
                // const totalDisplay = document.getElementById("total-display");
                // totalDisplay.innerText = remaing ;

            }
        }
        
    });         

};



// Removing the cart completed it stays right here no need to move into a function to call





// function removeCart(totalp) {

//     const cartBox = document.getElementById("cart-box");

//     cartBox.addEventListener("click", (event) => {

//     // check if  icon clicked

//         if (event.target.classList.contains("fa-square-xmark")) {

//         // remove only the nearest .cart-list

//             const listItem = event.target.closest(".cart-list");
//             if (listItem) {

                

//                 const priceElem = listItem.querySelector(".cart-price");
//                 const rprice = priceElem ? parseInt(priceElem.innerText) : 0;

//                 rempricearr.push(Number(rprice));

//                 const rtotal = rempricearr.reduce((sum, p) => sum + p, 0);
//                 console.log("Removed total:", rtotal);

//                 listItem.remove();

                
//                 // const totalDisplay = document.getElementById("total-display");
//                 // totalDisplay.innerText = remaing ;

//             }
//         }
        
//     });

// };




// removeCart();



// Category id and related plant 


let catApi = "https://openapi.programming-hero.com/api/categories/";

async function getCatIdOnly(id) {

    try {

        let res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
        let resConvertedToJson = await res.json();

        // rawArray variable is the Array from server
        
        let rawArr = resConvertedToJson.plants;

        console.log(rawArr);

        let getTreeDataDiv = document.getElementById('tree-data');
        getTreeDataDiv.innerHTML ="";


        rawArr.forEach((items, index) => {
            let plantFamily = items;
            // console.log(items);

             // Data to be shown
            let familyImage = plantFamily.image;
            let familyNam = plantFamily.name;
            let familyDescription = plantFamily.description;
            let familyCategory = plantFamily.category;
            let familyPrice = plantFamily.price;

            let newlyCreatedDivForTreeData = document.createElement('div');

            newlyCreatedDivForTreeData.innerHTML = `<div class="card-1 p-1 border-2 w-full h-auto rounded-md md:w-full ">

                <img class=" w-full h-[150px] bg-cover rounded-md" src="${familyImage}" alt="">

                <h1 class="text-sm font-bold my-1" >${familyNam}</h1>

                <p class="text-xs text-justify" >${familyDescription}</p>

                <div class="tree-type flex flex-row  justify-between mt-2 p-1">
                    <span class="text-xs font-bold bg-green-600 rounded-md px-2" >${familyCategory}</span>
                    <span class="text-xs font-bold" >${familyPrice}</span>
                </div>
                
                <div class="card-button flex justify-center mt-4">
                    <button class="bg-green-700 rounded-md text-center text-sm font-bold text-white p-2" >Add to Cart</button>
                </div>

            </div>`;

            getTreeDataDiv.appendChild(newlyCreatedDivForTreeData);
            


        });

        


    } catch (error) {
        console.log("Error message: ", error);
    }
    
};




