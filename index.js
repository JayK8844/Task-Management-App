const taskContainer = document.querySelector(".task_container");   //parent element to store cards

//Global store
const globlaStore = [];

const NewCard = ({id, imageUrl,taskTitle, TaskDescription, taskType}) => `<div class="col-md-6 col-lg-4" id=${id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
    <button type="button" class="btn btn-outline-danger"><i class="fas fa-dumpster"></i></button>
  </div>
  <img src=${imageUrl} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">${TaskDescription}</p>
    <span class="badge bg-primary">${taskType}</span>
  </div>
  <div class="card-footer text-muted">
    <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
  </div>
</div>
</div>`;

const loadInitialTaskCards = () =>{
//access localstorage
const getInitialData = localStorage.getItem("tasky");
if(!getInitialData) return;   //If tasky is null

// covert string object to object
const { cards } = JSON.parse(getInitialData);

//Map around the array to generate HTML card and injct it to DOM
cards.map((cardObject) => {
const createNewCard = NewCard(cardObject);
taskContainer.insertAdjacentHTML("beforeend", createNewCard);
globlaStore.push(cardObject);
});
};
const saveChanges = () =>{
const taskData = {
    id:`${Date.now()}`,  //Unique number for card id
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType:document.getElementById("tasktype").value,
    TaskDescription: document.getElementById("taskdescription").value,
    };
    const createNewCard = NewCard(taskData);

    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globlaStore.push(taskData); //Push data to Array
    

    //Add to local storage
    localStorage.setItem("tasky", JSON.stringify({ cards: globlaStore }));  //'tasky' is key to identify data

};