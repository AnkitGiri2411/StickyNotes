displayNotes();
let d =new Date();
let addNote=document.getElementById("button");
addNote.addEventListener("click", (event) => {
 
    let todotitle=document.getElementById('title');
    let tododetail=document.getElementById('detail');
                                                    
    if(!todotitle.value)
        alert('Note cannot be added: Missing Title');
    else
    {                                                       
       var notes= JSON.stringify({
            title: todotitle.value,
            detail: tododetail.value,
            date: d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear()+" at "+d.getHours()+':'+d.getMinutes()
        });
        notesObj=localStorage.getItem('notes');    

        notesObj = notesObj? JSON.parse(notesObj): [];      

        notesObj.push(notes);
        localStorage.setItem('notes',JSON.stringify(notesObj));

        todotitle.value = "";
        tododetail.value="";

        displayNotes();        


    }
});

function displayNotes(){
    
    let store= JSON.parse(localStorage.getItem('notes'));
    let stickyNote="";
                                   
    for(let i in store)
    {
        let notes=JSON.parse(store[i], (key, value)=> { return key=== "tilte"?`${value}`:value});
        stickyNote+=`<div class="card-body">
                    <h4 class="card-title"><span>Title : ${notes.title}</span></h4>
                    <p class="card-text"><span>Content : ${notes.detail}</span></p>
                    <button id="${i}" onclick="editNote(this.id)" class="btn secondary">Edit Note</button>
                    <div class="date">${notes.date}</div></div>`;
    }

    let noteE=document.getElementById("history");   
    if(store != null && store.length != 0) 
        noteE.innerHTML= stickyNote;
    else
        noteE.innerHTML = 'Kuch Bhi nahi hai Bhai , Kuch Kaam add karo pahale ';
    
}
                        
function editNote(index){
    let title = document.getElementById('title');
    let details = document.getElementById('detail');
    let notes = JSON.parse(localStorage.getItem('notes'));
    
    if(notes==null){
        storeObj=[];
    }
    else{
        storeObj = JSON.parse(notes[index], (key, value) => { return key === title?`${value}`:value;}); 
    }
                                
    title.value=storeObj.title;
    details.value=storeObj.detail;
    title.setAttribute("readonly", true);   
    
    notes.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
    
}