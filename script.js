

// Updating pric and removing the cart

let priceArray = []; // All the price has been stored

let updateCartBox = removedCartPrice =>{

    // Rmove the price got from the parameter from the array by map method

    priceArray = priceArray.filter(number => number !== removedCartPrice);

    console.log(priceArray);

    let Reamingtotal = priceArray.reduce((sum, current) => sum + current, 0);


    

    // Update the price by deducting from the totall

    let getTotalElement = document.getElementById('total-display');

    // Update the UI inner text
    getTotalElement.innerText = Reamingtotal;


};

//Adding the plants to cart and summing up the price to show on the cart-box



let addAndSum = (Name, Price, id) =>{

    // Get the cart-holding column container
    let cartDiv = document.getElementById('cart-box');

    // Creat a div container to show in ui
    let newCart = document.createElement('div');
    newCart.innerHTML = ` <div id="cart-list-${id}"  class=" p-1  bg-green-400 rounded-md m-1">

                <div class="top font-bold flex justify-between shadow-2xl md:min-w-[80px]">
                    <h1 class="text-[15px] md:text-xs">${Name}</h1>
                    <button id="cross-btn-${Price}" ><i onclick="updateCartBox(${Price});removeCart(${id})" class="fa-solid fa-square-xmark"></i></button>
                </div>
                <h1 class="font-bold text-letf md:text-xs" >${Price} tk</h1>
            </div>`;
    
    // Append the child div to parent dive
    cartDiv.appendChild(newCart);

    // Storing price in an arra to sum up

    priceArray.push(Price);
    let total = priceArray.reduce((sum, current) => sum + current, 0);

    // Get the container or element where the total will be shown
    let cartPriceDiv = document.getElementById('total-display');
    cartPriceDiv.innerHTML = `${total} tk`;

};

// This function is being called from the above function upon clicking on cross button and removes it from the cart list------------------------------------------------------------
function removeCart(CrossCartID) {
    console.log("from removeCart", CrossCartID);

    let cartBoxDel = document.getElementById(`cart-list-${CrossCartID}`);
    cartBoxDel.remove();
   
};


                  
                  
                  // Get all the plants upon loading the page
//===========================================================================

// This arrow function loads the api and call a function below it------

let loadPlants = () =>{
    
    fetch("https://openapi.programming-hero.com/api/plants")
    .then( (plantjson) => plantjson.json())
    .then( (plantsarr) => displayPlants(plantsarr.plants));
}

loadPlants();

let displayPlants = (treearr) =>{

    // Get the container and empty it where the data will be shown

    let parentDiv = document.getElementById('tree-data');
    parentDiv.innerHTML = "";

    for(let plant of treearr){

        // Extracting all the information to be shown
        let pImg = plant.image;
        let pName = plant.name;
        let pDes = plant.description;
        let pCat = plant.category;
        let pPrice = plant.price;
        let pId = plant.id;


        let newDiv = document.createElement('div');
        newDiv.innerHTML = `<div class="card-1 p-1  border-1 border-violet-700 w-full h-[450px] rounded-md md:w-full ">

                <img class=" w-full h-[250px] bg-cover rounded-md" src="${pImg}" alt="">

                <h1 class="text-sm font-bold my-1" >${pName}</h1>

                <p class="text-xs text-justify hover:bg-green-200" >${pDes}</p>

                <div class="tree-type flex flex-row  justify-between mt-2 p-1">
                    <span class="text-xs font-bold bg-green-600 rounded-md px-2" >${pCat}</span>
                    <span class="text-xs font-bold" >${pPrice}<span> tk</span></span>
                </div>
                
                <div id="cart-btn-${pId}" onclick="addAndSum('${pName}', ${pPrice}, ${pId})" class="card-button flex justify-center mt-4">
                    <button class="bg-green-700 rounded-md text-center text-sm font-bold text-white p-2" >
                    Add to Cart</button>
                </div>

            </div>`;

        parentDiv.appendChild(newDiv);
    }

}

// Completed
//==============================================================================




 // Middle Section-Dynamic Loading All Plants info by Id Category
 //  // ==============
// Loading the category's Plants family dynamically
//==============================================================================================================

    // There are  2 broad steps to show the plant info according to id as, the API shows the category when added Id of category it shows the plants of this category 
        
        // 1. Creat a function which would take the id as  paramter, when the button(located) clicked inside section-1
        // 2. onclcik the button will load the plants of that category API 
        // 3. Creat a second function which whill be called from this function with the raw array as parameter
        //-----------------------------------------------------------

    // Functionality or working steps of the  2nd functions
        // 1.Receive the array from loadcategoryPlants function as a parameter
        // 2.Get the container & empty the container as well , where the data will be shown
        // 3.Loop through the array and get the data which will be shown
            // 4.Creat the UI element ( Must be inside the loop)
            // 5.Append chiled the the created element to parent ( Must be inside the loop)
    //-----------------------------------------------------------------



// Remove active class property with this function which will be call from the bellow function
//=====================

let removeclass = () => {
    let getAllBtnClass = document.querySelectorAll('.all-btn');
    

    // loop throught the all the button and remove active class

    getAllBtnClass.forEach( btn => btn.classList.remove('active'));
}

//=======================
    
// This function is beng called from category_level buton from section-1
//-------------------------------------------------------
let loadCategoryPlants = (id) =>{

    // 1. Getting the API data by fetch function-------------
                // Add active status to selected button
                    // Steps
                        // 1. Give a common class to all button
                        // 2. Creat a function that removes a pre made active class with css properties
                        // 2. then add active status to the selected one

    fetch(`https://openapi.programming-hero.com/api/category/${id}`)  //${id} will be received as parameter from section-1
    .then( (response) => response.json())
    .then((categoryPlantsArray) =>{

        // Get the Selected category button with dynamic id
        let categoryBtn = document.getElementById(`category-btn-${id}`);

        // Remove the active class and later step add it so that it only shows on selected element

        removeclass();  // This functions removes all the active class

        // Add a (active class) to this button which will be shown only to selected one

        categoryBtn.classList.add('active');
        
        displayPlantsByCategory(categoryPlantsArray.plants);
    });

};

// 2nd Function
//--------------------

let displayPlantsByCategory =  plantcategory =>{

    // Get the container and empty it-------------------------------
    let getPlantDiv = document.getElementById('tree-data');
    getPlantDiv.innerHTML = "";

    //Loop through the array and extract information-----------------

    for(let item of plantcategory){
        
        // Information Extracted to be shown --------------------------
        let plantimg = item.image;
        let plantName = item.name;
        let plantDescription = item.description;
        let plantCategory = item.category;
        let plantPrice = item.price;
        let plantAddCartButtonId = item.id;


        // Creat a new container or element to show up the extreated data-----------------------

        let newPlantDiv = document.createElement('div');
        
        newPlantDiv.innerHTML = ` <div class="card-1 p-1  border-2 w-full h-[450px] rounded-md md:w-full ">

                <img class=" w-full h-[250px] bg-cover rounded-md" src="${plantimg}" alt="">

                <h1 class="text-sm font-bold my-1" >${plantName}</h1>

                <p class="text-xs text-justify hover:bg-green-200" >${plantDescription}</p>

                <div class="tree-type flex flex-row  justify-between mt-2 p-1">
                    <span class="text-xs font-bold bg-green-600 rounded-md px-2" >${plantCategory}</span>
                    <span class="text-xs font-bold" >${plantPrice}<span> tk</span></span>
                </div>
                
                <div id="cart-btn-${plantAddCartButtonId}" onclick="addAndSum('${plantName}', ${plantPrice})" class="card-button flex justify-center mt-4">
                    <button class="bg-green-700 rounded-md text-center text-sm font-bold text-white p-2" >
                    Add to Cart</button>
                </div>

            </div>`;

        // Append the child to parent container
        getPlantDiv.appendChild(newPlantDiv);


    }


};

//Completed successfully
//================================================================================================




// Left Section-1 -Dynamic Category
// ================================

// Loading the category dynamically
//==============================================================================================================

let loadCategory = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then( (res) => res.json())
    .then( (categoryData) => displayCategory(categoryData.categories));
};

loadCategory();

let displayCategory = (categoryArray) => {

    // To display the received data there are 4 steps
        // 1.Get the container & empty the container as well , where the data will be shown
        // 2.Loop through the array and get the data which will be shown
            // 3.Creat the UI element ( Must be inside the loop)
            // 4.Append chiled the the created element to parent ( Must be inside the loop)
    //---------------------------------------------------------------------------------------------------------

    
    // 1.Get the container & empty the container as well
    //---------------------------------------------------------------------------------------------------------       
    let categoryContainer = document.getElementById('cat');
    categoryContainer.innerHTML ="";

    // 2.Loop through array and extract single item(which is object in this case) from the Category Array
    //----------------------------------------------------------------------------------------------------------

    for(let item of categoryArray){
        
        // CategoryName of each object from the array item-----------------------
        let categoryName = item.category_name;

        // CategoryId of each object from the array item--------------------------
        let categoryId = item.id;

        // Now creat the element--------------------------------------------------
        let newElement = document.createElement('div');
        newElement.innerHTML = `<div id="category-btn-${categoryId}" onclick="loadCategoryPlants(${categoryId})" class="button bg-green-400 m-1 p-2 rounded-md hover:bg-green-700 all-btn">
                <button class="font-bold text-white " >${categoryName}</button>
            </div> `;

        // Append the chiled to prent container 
        categoryContainer.appendChild(newElement);

    };

};

displayCategory();

// Category Name loading completed succesfully
//=============================================================================================================





// Removing the cart completed it stays right here no need to move into a function to call










// Category id and related plant 


// let catApi = "https://openapi.programming-hero.com/api/categories/";

// async function getCatIdOnly(id) {

//     try {

//         let res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
//         let resConvertedToJson = await res.json();

//         // rawArray variable is the Array from server
        
//         let rawArr = resConvertedToJson.plants;

//         console.log(rawArr);

//         let getTreeDataDiv = document.getElementById('tree-data');
//         getTreeDataDiv.innerHTML ="";


//         rawArr.forEach((items, index) => {
//             let plantFamily = items;
//             // console.log(items);

//              // Data to be shown
//             let familyImage = plantFamily.image;
//             let familyNam = plantFamily.name;
//             let familyDescription = plantFamily.description;
//             let familyCategory = plantFamily.category;
//             let familyPrice = plantFamily.price;

//             let newlyCreatedDivForTreeData = document.createElement('div');

//             newlyCreatedDivForTreeData.innerHTML = `<div class="card-1 p-1 border-2 w-full h-auto rounded-md md:w-full ">

//                 <img class=" w-full h-[150px] bg-cover rounded-md" src="${familyImage}" alt="">

//                 <h1 class="text-sm font-bold my-1" >${familyNam}</h1>

//                 <p class="text-xs text-justify" >${familyDescription}</p>

//                 <div class="tree-type flex flex-row  justify-between mt-2 p-1">
//                     <span class="text-xs font-bold bg-green-600 rounded-md px-2" >${familyCategory}</span>
//                     <span class="text-xs font-bold" >${familyPrice}</span>
//                 </div>
                
//                 <div class="card-button flex justify-center mt-4">
//                     <button class="bg-green-700 rounded-md text-center text-sm font-bold text-white p-2" >Add to Cart</button>
//                 </div>

//             </div>`;

//             getTreeDataDiv.appendChild(newlyCreatedDivForTreeData);
            


//         });

        


//     } catch (error) {
//         console.log("Error message: ", error);
//     }
    
// };




