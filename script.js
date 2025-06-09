const datetime = document.getElementById("datetime");
const clocktime = document.getElementById("clocktime");

const updateClock=()=> {
    const now = new Date();
    const dayName = now.toLocaleDateString('en-US', { weekday: 'short' });
    const day = now.getDate();
    const monthName = now.toLocaleDateString('en-US', { month: 'long' });
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds=now.getSeconds().toString().padStart(2, '0');

    datetime.textContent = `Today, ${dayName} ${day} ${monthName} ${year}`;
    clocktime.textContent = `${hours % 12 || 12}:${minutes}:${seconds} ${hours >= 12 ? 'PM' : 'AM'}`;
    // console.log(now);
};

setInterval(updateClock, 1000);
updateClock();

const todoInput=document.querySelector(".todo__input");
const todoCreateButton=document.querySelector(".todo__create__button");
const todoContainer=document.querySelector(".todo__container");

const allTodoItemText=[];

todoCreateButton.addEventListener("click",()=>{
    const todoItemText=todoInput.value.trim();
    todoInput.value="";
    if(!todoItemText){
        return;
    }
    allTodoItemText.push(todoItemText);
    renderTodoItems();
    
});

const renderTodoItems=()=>{
    const allTodoItemHtmls=allTodoItemText.map((text,index)=>{
        return`
            <div class="todo__item" data-index="${index}">
                <div class="todo__item__left">
                    <input type="checkbox" class="completed"/>
                    <span class="spantext">${text}</span>
                </div>
                <div class="todo__item__right">
                    <svg 
                    class="todo__delete__button"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="red"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-trash"
                    >
                        <path d="M3 6h18"/>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    </svg>
                </div>
             </div>
        `;
    });
    todoContainer.innerHTML=allTodoItemHtmls.join("");

};

todoContainer.addEventListener("click",(event)=>{
    const target=event.target;
    // If checkbox clicked
    if (target.classList.contains("completed")) {
        const span = target.closest(".todo__item").querySelector(".spantext");
        span.style.textDecoration = target.checked ? "line-through" : "none";
    }
    // If delete icon clicked
    if (target.closest(".todo__delete__button")) {
        const todoItem = target.closest(".todo__item");
        const index = parseInt(todoItem.dataset.index);
        allTodoItemText.splice(index, 1); // Remove item from array
        renderTodoItems(); // Re-render
    }

});

