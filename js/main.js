
const loadCategories = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const categoriesTab = data.data;
    // console.log(categories);

    const categoriesContainer = document.getElementById('categories');
    categoriesTab.forEach((categoryTab, index) => {
       
        // console.log(categoryTab);
        const span = document.createElement('span');
        span.innerHTML = `<button onclick="loadPostById(${categoryTab?.category_id})" class="btn btn-ghost bg-slate-300 focus:bg-red-600 focus-within:text-white ">${categoryTab?.category}</button>`;
        categoriesContainer.appendChild(span)
    })
    
}


const loadPostById =async(id) =>{

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    const allCategoriesData = data.data;
    const categoriesCardContainer = document.getElementById('allPosts');
    categoriesCardContainer.innerHTML = ""
   

    allCategoriesData.forEach(category => {
        console.log(category?.authors[0]?.verified);
        const card = document.createElement('div'); 
        card.innerHTML=`
        <div id="card" class="card card-compact bg-base-100 shadow-xl w-80">
        <figure class="w-80 h-[200px]">
            <img class="w-full h-full" src="${category.thumbnail}" alt="Shoes" />
        </figure>
        <div class="card-body">

            <div class="flex gap-4 items-center">
                <div class="avatar">
                <div class="w-10 rounded-full">
                  <img src="${category?.authors[0]?.profile_picture}" />
                </div>
              </div>


                <div>
                    <h2 class="font-bold leading-6"> ${category?.title} </h2>
                </div>
            </div>


    <div class="flex gap-4">
        <div class="font-sm font-normal">${category?.authors[0]?.profile_name}</div>
        <div class="font-sm font-normal">
        <img class="w-5 h-5"  src="${category?.authors[0]?.verified === true ? '/project resources/verified.png' : '/project resources/white.jpg'}">
        </div>
    </div>

            <p> <span>${category?.others.views}</span> views</p>
        </div>
    </div>
        `
        categoriesCardContainer.appendChild(card);
        
    })
}
loadPostById('1000')


















// category call function
loadCategories()
