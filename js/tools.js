
const loadTools = (isShow) =>{
       fetch('https://openapi.programming-hero.com/api/ai/tools')
            .then(res => res.json())
            .then(data => displayTools(data.data.tools , isShow))
            .catch(err => console.log(err))
            handlerLoading(true)
}

//tools = tools.sort((a, b) => a.published_in - b.published_in)

const displayTools = (tools ,isShow) =>{

 

  // console.log(tools);
 const cardContainer = document.getElementById('card-container')
 cardContainer.textContent = ''

 
 tools.sort(function(a, b){return a.tools?.name - b.tools?.name})


 tools.forEach(tool =>{
  //  console.log(tool);
  
   // Order List system

  const orderLists = tool.features;
  let count = 1 ;

 
const toolsCard = document.createElement('div');
  toolsCard.classList = `card card-compact  bg-slate-200 shadow-xl`
toolsCard.innerHTML = `

<figure  class="p-5 rounded"> 
<img src=${tool?.image}  alt="Shoes" /></figure>

<div class="card-body">
<h1 class="text-2xl font-bold">Feature </h1>
  ${orderLists.map(list =>{
   return `<ol> 
    <li> ${count ++  +'.'} ${list}  </li> 
    </ol>`
  }).join(' ')}


  <div class="border-t-2 mt-3">
  <h1 class="text-2xl font-bold mt-3"> ${tool?.name} </h1>

  <div class="flex justify-between" >

 

  <div class="flex items-center">
  <span><svg xmlns="http://www.w3.org/2000/svg" class="h-7 my-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-0 h-0">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
</svg></span>

 <span class="ml-3"> ${tool?.published_in} </span>
  </div>
  

<div onclick="modalHandler('${tool.id}')"> 
<svg xmlns="http://www.w3.org/2000/svg" class="w-6 text-indigo-600 cursor-pointer" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
 <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
</svg>
</div>

  </div>


  </div>

</div>

`
 
cardContainer.appendChild(toolsCard)

 })
   
 handlerLoading(false)
}


const handlerSort = (tool) =>{
  // tool = tool?.sort((a, b) => a.tool?.published_in - b.tool?.published_in)
 console.log(tool.published_in);
}

// Modal handler 
 const modalHandler = (id) =>{
  console.log('id check', id);
  my_modal_4.showModal()
 
 fetch(` https://openapi.programming-hero.com/api/ai/tool/${id}`)
 .then(res => res.json())
 .then(data => modalTools(data.data))

 }

 const modalTools = (tools) =>{
  console.log(tools);
  let items = tools.features;
  let totalName = []
  for(const item in items){
    totalName.push((items[item].feature_name))
  }

  console.log(totalName);
  console.log(items);
const parentContainer = document.getElementById('model-container')
  

  parentContainer.innerHTML = `
  
 <div class="mr-4"> 
 
   <h1 class="text-2xl font-bold"> ${tools.description} </h1>
   <div class="flex justify-between items-center mt-24">
   <div> <h2 class="text-1xl font-bold"> Feature </h2>
    
       ${totalName.map(name =>{
        
        return  ` <ul><li style="list-style-type: disc"> ${name} </li> </ul> `

      }).join(' ')} 
   
   
   </div>

   <div> <h2 class="text-1xl font-bold"> Integrations </h2> </div>
   
   </div>
   </div>





   <div class="mr-4">
   <img src="${tools?.image_link[0]}" alt="">
   <h3 class="mt-2 font-bold"> ${tools?.input_output_examples[0]?.input ||'Data Nai'}  </h3>
   <p class="mt-2 "> ${tools?.input_output_examples[0]?.output ? tools?.input_output_examples[0]?.output.slice(0,50) : 'Data Not Found' }  </p>
   
   </div>

  `
 }

 // See All button

 function myFunction(){
  loadTools(true)
}


// Spinner or Loading

 function handlerLoading(isLoading){
  const parentLoading = document.getElementById('loading')
  if(isLoading){
    parentLoading.classList.remove('hidden')
  }else{
    parentLoading.classList.add('hidden')
  }
 }


 loadTools()


 