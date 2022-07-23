    let sitesSaved = []
    const inputEl = document.getElementById("input-el")
    const tabBtn = document.getElementById("tab-btn")
    const inputBtn = document.getElementById("input-btn")
    const delBtn = document.getElementById("del-btn")
    const ulEl = document.getElementById("ul-el")
    
    // deduce our array into string, to put in local storage
    const sitesSavedInStorage = JSON.parse(localStorage.getItem("sitesSaved"))
    
    // if saved thing then array = saved thing
     if(sitesSavedInStorage){
         sitesSaved= sitesSavedInStorage
    // run render function
         render(sitesSaved)
     
        }
// our function does this..
// create a render function with parameters
    function render(sites) {
        // let output = empty string
        let listItems = ""
        // run a loop to get parameters full ength
        for (let i = 0; i < sites.length; i++) {
            // let output = parameter in loop
            listItems += `
                <li>
                    <a target='_blank' href='${sites[i]}'>
                        ${sites[i]}
                    </a>
                </li>
            `
        }
        // input field = output
        ulEl.innerHTML = listItems  
    }
    
    tabBtn.addEventListener("click", function(){
        chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
            sitesSaved.push(tabs[0].url)
            localStorage.setItem("sitesSaved", JSON.stringify(sitesSaved))
        
            render(sitesSaved)
        })
    })
 
       
    delBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    sitesSaved=[]
    
    render(sitesSaved)
    })
     
    inputBtn.addEventListener("click", function() {
    
    sitesSaved.push(inputEl.value)
    
        inputEl.value = ""
    
        localStorage.setItem("sitesSaved", JSON.stringify(sitesSaved) )
    
    
        render(sitesSaved)
    
    })