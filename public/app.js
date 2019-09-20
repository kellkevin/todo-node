console.log("javascript here");
$(document).ready(function(){
$.getJSON("/api/todos")
    .then(function(data){
        console.log(data);
        addTodos(data);
    });

$.getJSON("/api/todos/done")
.then(function(data){
    addDoneTodos(data);
});



    $("#todoInput").keypress(function(event){
        if(event.which == 13) {
            // var todoTask = $("#todoInput").val();
            createTodo();
           
        }
    });

    $("#tasks, #donetodos").on("click","span" , function(event){
        deleteTodo($(this));  
    });

    $("#tasks,#donetodos").on("click","li", function(event){
        $(this).toggleClass("done");
        
        updateComplete($(this).data("id"), $(this).hasClass("done"));
        if($(this).hasClass("done") === true){
            $("#donetodos").append(this);
        }else{
            //$(this).animate({opacity: 0 });
            $("#tasks").append(this);
        }
    });

});

function deleteTodo(todo){
    var deleteTask = $(todo).parent().attr("data-id");
        $.ajax({
            method: 'DELETE',
            url: 'api/todos/' + deleteTask
        }).then(function(){
            $(todo).parent().remove();
            
        });

}

function addTodo(todo){
    var done = todo.completed !== false ? "checked" : "";
    var newTodo = addTodoHTML(todo);
    if(todo.completed !== false) $(newTodo).addClass("done");
    $("#tasks").append(newTodo); 
}

function addDoneTodo(todo){
    var newTodo = $("<li data-id='" + todo._id+"' >" + todo.name   + "<span>x</span> </li>");
    $("#donetodos").append(addTodoHTML(newTodo));
    $("#donetodos li").addClass("done");
}

function addDoneTodos(todos){
    todos.forEach(function(todo){   
        $("#donetodos").append(addTodoHTML(todo));
        $("#donetodos li").addClass("done");
    });
}

function addTodoHTML(todo){
    var newTodo = $("<li data-id='" + todo._id+"' >" + todo.name   + "<span>x</span> </li>");
    return newTodo;
}




function addTodos(todos) {
    // add items to page 
    
    todos.forEach(function(todo){
        console.log("adding this: ", todo);
        addTodo(todo);
        
    });
}
/*
function toggleTodoStatus(id, done){
    updateTodo(id,{ completed: done });
};
toggleTodoStatus("5d7ab250b9f4db2df91bf411",true);
*/


function updateComplete(id,complete){
    console.log(id,complete);
    var dataObject = { completed: complete };
        var deleteUrl = 'api/todos/' + id;
    var deleteObject = {
        url: deleteUrl,
        method: "PUT",
        data:  dataObject 
    }


    console.log(deleteObject);
    $.ajax(deleteObject)
    .then(function(data){
        console.log(id + " has been updated");
        console.log(data);
    });
}


function createTodo(){
    
    var todoName = $("#todoInput").val();
    
    $.post("/api/todos",{ name: todoName })
    .then(function(createdTodo){
        console.log(createdTodo);
        addTodo(createdTodo);
    }).catch(function(error){
        console.log(error);
    });
    $("#todoInput").val("");
}
/*
for(todotask in stuff){
   console.log(todotask.name);
    $("#task").append("<li>"+ todotask.name  + "</li>");
}
*/

