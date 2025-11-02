console.log("connected");

function loadCategories(){
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res)=>res.json())
    .then((data)=>displaycategories(data.categories));
}

function loadVideos(){
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((response)=>response.json())
    .then((data)=>displayVideos(data.videos));
}

function displaycategories(categories){
  const categoryContainer = document.getElementById("category-container");
  for (let cat of categories){
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
      <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    categoryContainer.append(categoryDiv);
  }
}

const displayVideos = (videos)=>{
  const videoContainer = document.getElementById("video-container");
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
    <p class="text-sm text-gray-400">91k View</p>
   </div>   
  </div>
</div>

    `;
    videoContainer.append(videoCard);
  });
};

loadCategories();
loadVideos();
