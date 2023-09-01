
const loadCategories = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const categoriesTab = data.data;
    // console.log(categories);

    const categoriesContainer = document.getElementById('categories');
    categoriesTab.forEach((categoryTab) => {
       
        // console.log(categoryTab);
        const span = document.createElement('span');
        span.innerHTML = `<button onclick="loadPostById(${categoryTab?.category_id})" class="btn btn-ghost bg-slate-300 focus:bg-red-600 focus-within:text-white ">${categoryTab?.category}</button>`;
        categoriesContainer.appendChild(span)
    })
    
}


const loadPostById =async(id) =>{
try {


    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    const allCategoriesData = data.data;
    const categoriesCardContainer = document.getElementById('allPosts');
    


    // Sort by view handle
    const sortByView = document.getElementById('sortByView');
    const sortByViewSM = document.getElementById('sortByViewSM');
    const sortedData =() => {
        const sortedData = allCategoriesData.sort((a,b) => {
            a = a?.others?.views;
            a = parseFloat(a.replace("K",""));
 
            b = b?.others?.views;
            b = parseFloat(b.replace("K",""));
            return b - a;
           
        })
       renderCard(sortedData); 
     }
    sortByView.addEventListener('click', sortedData); //desktop button
    sortByViewSM.addEventListener('click', sortedData);//mobile button


    
    
    // Render Card
    const renderCard = (withOutSortData)=>{
        categoriesCardContainer.innerHTML = ""

        // Error page Handle
   const errorContent = document.getElementById('errorContent');
   if (withOutSortData.length === 0) {
       errorContent.innerHTML = `
       <div class="flex justify-center items-center ">
       <div class="w-3/4 mx-auto text-center">
           <div class="mb-6 w-44 mx-auto">
           <img class="w-full" src="/project resources/icon.png" alt="Shoes" />
           </div>
           <div>
           <h2 class="font-bold text-5xl">Oops!! Sorry, There is no content here</h2>
           </div>
       </div>
       </div>

       `;
   }else{
       errorContent.innerHTML = ""
   }



        withOutSortData.forEach(category => {
            const card = document.createElement('div'); 

            // sec to hour:min:sec
            const seconds = category?.others?.posted_date;
            const hour = Math.floor(seconds / 3600);
            const minites = Math.floor((seconds % 3600) / 60);
            const actualDate = `${hour}hrs ${minites}min ago`;
            const emptyDate = "";

           if (seconds === "") {
               card.innerHTML = `
               <div id="card" class="card card-compact bg-base-100 shadow-xl w-80">
               <figure class="w-80 h-[200px]">
                   <img class="w-full h-full" src="${category.thumbnail}" />
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
               <img class="w-5 h-5"  src="${category?.authors[0]?.verified === true ? '/project resources/verified.png' : '/project resources/white.png'}">
               </div>
           </div>
       
                   <p> <span>${category?.others.views}</span> views</p>
               </div>
           </div>
               
               `
            
           }else{
            card.innerHTML=`
            <div id="card" class="card card-compact bg-base-100 shadow-xl w-80">
            <figure class="w-80 h-[200px] relative">
                <img class="w-full h-full" src="${category.thumbnail}" />
                <div class="absolute bottom-3 right-3 p-3 text-white bg-black px-4 py-2 rounded-md text-xs font-normal"> ${actualDate? actualDate : emptyDate} </div>
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
            <img class="w-5 h-5"  src="${category?.authors[0]?.verified === true ? '/project resources/verified.png' : '/project resources/white.png'}">
            </div>
        </div>
    
                <p> <span>${category?.others.views}</span> views</p>
            </div>
        </div>
            `
           }

            categoriesCardContainer.appendChild(card);
        })
    }
    renderCard(allCategoriesData);


} catch (error) {
    alert("error")
}
}



// initial call 
loadPostById('1000')

// category call function
loadCategories()
