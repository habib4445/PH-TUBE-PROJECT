console.log("connected");

function loadCategories(){
    // fetch the data
    fetch(" https://openapi.programming-hero.com/api/phero-tube/categories")
    // converted promise to json
    .then((res)=>res.json() )
    // send data to display
    .then((data)=>displaycategories(data.categories));
}

function displaycategories(categories){
// get container
const categoryConatiner=document.getElementById("category-container");
// Loop operation on array of object
for (let cat of categories){
    console.log(cat);
    // create element
    const categoryDiv=document.createElement("div");
    categoryDiv.innerHTML=`
    <button class="btn btn-sm">${cat.category}</button>
    `;

    // Append the element
    categoryConatiner.append(categoryDiv);
}

}



loadCategories();