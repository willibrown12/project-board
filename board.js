const tasks=[]
const container = document.getElementById("container")
let lstasks = JSON.parse(localStorage.getItem("tasks"))||[]
tasks.push(...lstasks)

function init() {
   
    mindate()
    clearall()
    const sumbitbtn = document.getElementById("sumbitbtn")

    sumbitbtn.addEventListener("click", function () {
        const title = document.getElementById("titlePapar");
        const info = document.getElementById("infopaper");
        const date = document.getElementById("datepaper");
        const time=document.getElementById("timepaper");
        if (title.value === "" || info.value === ""||date.value===""||time.value==="") {
            alert("Missing input value")
            return;
        }
        const colors = ['ff6b66', '#fff766', '#78ff7a', '#78d0ff',"#faa0fa","#faa0a0","#f2cc8a"];
       const degrees = ['-9deg','0deg','9deg','-3deg','3deg'];
   
        const task = {
            title: title.value,
            info: info.value,
            date:date.value, 
            time:time.value,
           id: `${Math.ceil(Math.random() * 9999)}`,
           color:colors[[Math.floor(Math.random() * colors.length)]],
           degrees:degrees[[Math.floor(Math.random() * degrees.length)]],
           
        }
        tasks.push(task)
        
        localStorage.setItem("tasks", JSON.stringify(tasks));
        
        draw(tasks, container)
        title.value ="";
        info.value = "";
        date.value ="";
        time.value = "";
       
       
       
    })
    draw(tasks, container)
    const clearbtn = document.getElementById("clearbtn")
    clearbtn.addEventListener("click", function () {
        const title = document.getElementById("titlePapar");
        const info = document.getElementById("infopaper");
        const date = document.getElementById("datepaper");
        const time=document.getElementById("timepaper");
        title.value ="";
        info.value = "";
        date.value ="";
        time.value = "";
       
       
       
    })
    
}

function clearall() {
    const trash = document.getElementById("trash")
    trash.addEventListener("click", function () {
        localStorage.removeItem("tasks");
        tasks.splice(0, tasks.length)
        draw(tasks,container)
        
    })
    
}

function draw(tasks,container){
    container.innerHTML = "";  
const taskUi=tasks.map((current=> GetSingleProductUi(current)))
container.append(...taskUi)
}

function GetSingleProductUi(current){
    const title = document.createElement("h3")
    title.className="overflow-y m-2 "
    title.style.height="50px"
    title.innerText = current?.title
    const info = document.createElement("div")
    info.innerText = current?.info
    info.className="overflow-y m-0 p-1"
    info.style.height="170px"
    info.style.width="300px"
    const date = document.createElement("div")
    date.innerText = current?.date
    const time = document.createElement("div")
    time.innerText = current?.time
    const Button = document.createElement("Button")
    Button.className="btn-close hidden"
    Button.addEventListener("click", function () {
        const foundIndex = tasks.findIndex(pr => pr.id===current.id)
        if (foundIndex > -1) {
            tasks.splice(foundIndex, 1)
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        
        const tableBody = document.getElementById("usersTable")
        draw(tasks,container)
    })
    const box = document.createElement("div")
    
    box.style.width="300px"
    box.style.height="300px"

   
    box.style.backgroundColor =current?.color
    box.style.rotate =current?.degrees
    box.className="box fade2 m-5"
  const divtitle=document.createElement("div")
  divtitle.className="flex p-1"
  const divdate=document.createElement("div")
  divdate.className="p-2 flex"
 
  divtitle.append(Button)
  divdate.append(date,time)
  
  box.append(divtitle,title,info,divdate)
  
    return box

}




      







function mindate(){
    document.getElementById('datepaper').addEventListener('keydown', function (event) {
        event.preventDefault()
      })
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = yyyy + '-' + mm + '-' + dd;
   document.getElementById("datepaper").setAttribute('min',today)
}


init()

