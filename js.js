console.log("connected");
// remove active
function removeActiveClass(){
    const activeButtons=document.getElementsByClassName("active");
   for(let btn of activeButtons){
    btn.classList.remove("active");
   }
}



function loadCategories(){
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res)=>res.json())
    .then((data)=>displaycategories(data.categories));
}

function loadVideos(){
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((response)=>response.json())
    .then((data)=>{
        document.getElementById("btn-all").classList.add("active");
        displayVideos(data.videos);
    });
}

// LoadCategoriesVideos
const LoadCategoryVideos=(id)=>{
    // console.log(id);
    const url=`https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);

fetch(url)
.then((res)=> res.json())
.then((data)=>{
    removeActiveClass();
    const clickedButton=document.getElementById(`btn-${id}`);
    clickedButton.classList.add("active");
    console.log(clickedButton);
    displayVideos(data.category)
} );

};

// load video details
const loadVideoDetails=(videoId)=>{
    console.log(videoId);
    const url=` https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;

   fetch(url)
   .then((res)=>res.json())
   .then((data)=>displayVideoDetails(data));
};
const displayVideoDetails = (data) => {
  const video = data.video; // extract actual video
  document.getElementById("video_details").showModal();

  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
   <div class="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
  `;
};




function displaycategories(categories){
  const categoryContainer = document.getElementById("category-container");
  for (let cat of categories){
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
      <button id="btn-${cat.category_id}" onclick="LoadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    categoryContainer.append(categoryDiv);
  }
}

const displayVideos = (videos)=>{
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML="";
if(videos.length==0){
    videoContainer.innerHTML=`
    <div class="col-span-full py-20 flex flex-col justify-center items-center text-center">
        <img class="w-[120px]" src="./image/Icon.png" alt="">
        <h2 class="text-2xl font-bold">Oops!! Sorry,There is no content here</h2>
    </div>
    
    `;
}



  videos.forEach((video)=>{
    const videoCard = document.createElement('div');
    videoCard.innerHTML = `

<div class="card bg-base-100  ">
  <figure class="relative">
    <img class="w-full h-[150px] object-cover"
      src="${video.thumbnail}" />
      <span class="absolute bottom-2 right-1 rounded text-sm text-white bg-black px-2">3hr 56 min ago</span>
  </figure>
  <div class=" gap-3 flex py-5 px-0">
    <!-- Profile part -->
   <div class="profile">

    <div class="avatar">
  <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
    <img src="${video.authors[0].profile_picture}" />

  </div>
</div>
   </div>
   <!-- intro part -->
   <div class="intro">
    <h2 class="text-sm font-semibold">Midnight Serenade</h2>
    <p class="text-sm text-gray-400">${video.authors[0].profile_name}</p>
    <p class="text-sm text-gray-400">${video.others.views} Views</p>
   </div>   
  </div>
  <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
</div>

    `;
    videoContainer.append(videoCard);
  });
};

loadCategories();
