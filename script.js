
// Loading the category dynamically 

let categoryApi = "https://openapi.programming-hero.com/api/categories";

async function loadCategory (url) {

    try {

        let response = await fetch(url);
        let responseConvertedToJson = await response.json();

        // rawArray variable is the Array from server

        let rawArray = responseConvertedToJson.categories;

        rawArray.forEach(arrayItem => {
            
            let allCategoryName = arrayItem.category_name;

            // console.log(allCategoryName);

            let getCategoryDiv = document.getElementById('cat');

            let newlyCreatedDiv = document.createElement('div');

            newlyCreatedDiv.innerHTML = `<div class="button bg-green-800 m-1 p-2 rounded-md">
                <button class="font-bold text-white text-xs text-left " >${allCategoryName}</button>
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

            console.log(plantNam);


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
                
                <div class="card-button flex justify-center mt-4">
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