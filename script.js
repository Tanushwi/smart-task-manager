const input = document.getElementById("taskInput")
const priority = document.getElementById("priority")
const list = document.getElementById("taskList")
const dueDate = document.getElementById("dueDate")
const search = document.getElementById("search")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

let filter = "all"

render()

function addTask(){

if(input.value.trim()==="") return

tasks.push({

text:input.value,
priority:priority.value,
date:dueDate.value,
completed:false

})

input.value=""
dueDate.value=""

save()
render()

}

function render(){

list.innerHTML=""

let filtered = tasks

if(filter==="pending"){
filtered = tasks.filter(t=>!t.completed)
}

if(filter==="completed"){
filtered = tasks.filter(t=>t.completed)
}

if(search.value){

filtered = filtered.filter(t =>
t.text.toLowerCase().includes(search.value.toLowerCase())
)

}

filtered.forEach((task,i)=>{

const realIndex = tasks.indexOf(task)

const li=document.createElement("li")

if(task.completed) li.classList.add("completed")

li.innerHTML=`

<div>

<input type="checkbox" ${task.completed ? "checked":""}>

${i+1}. ${task.text}

<br>

<small>${task.date || ""}</small>

</div>

<span class="priority ${task.priority.toLowerCase()}">
${task.priority}
</span>

<button class="delete">X</button>

`

const checkbox = li.querySelector("input")

checkbox.onchange = ()=>{

tasks[realIndex].completed = checkbox.checked

save()
render()

}

li.querySelector(".delete").onclick = ()=>{

tasks.splice(realIndex,1)

save()
render()

}

list.appendChild(li)

})

updateStats()

}

function updateStats(){

const total = tasks.length

const completed = tasks.filter(t=>t.completed).length

document.getElementById("total").innerText = total
document.getElementById("done").innerText = completed

const progress = total===0 ? 0 : (completed/total)*100

document.getElementById("progress").style.width = progress + "%"

}

function setFilter(type){

filter = type

render()

}

function save(){

localStorage.setItem("tasks",JSON.stringify(tasks))

}

search.oninput = render

document.getElementById("darkBtn").onclick = ()=>{

document.body.classList.toggle("dark")

}