const tablaTodos= async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json();

    let tableBody=``;
    todos.forEach((todo, index)  => {
        tableBody += `<tr>
        <td>${todo.userId}</td>
        <td>${todo.id}</td>
        <td>${todo.title}</td>
        <td>${todo.completed}</td>
        </tr>` 
    });
    document.getElementById("table_Body").innerHTML = tableBody;
    
};

window.addEventListener("load", function (){
    tablaTodos();
});
