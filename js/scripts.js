$(document).ready(function(){
    var form_position = $('form').offset().top;

    $(document).scroll(function(){
        if ($(document).scrollTop() >= form_position - 80) {
            var form_container_width = $('.form-container').width();
            $('form').addClass('fixed').width(form_container_width);
        }
        else {
            $('form').removeClass('fixed');
        }
    });

    $('body').on('click', 'input[type="checkbox"]', function(){
        var checked = $(this).is(':checked');
        var listItem = $(this).parents('li');
        // completeTask(listItem, checked);
    });

    $('body').on('click', 'i', function(){
        var listItem = $(this).parents('li');

        if($(this).hasClass('fa-remove')) {
            // deleteTask(listItem);
        }
        else if ($(this).hasClass('fa-pencil')) {
            $(this).parents('.task-display').fadeOut(400, function(){
                $(this).siblings('.task-edit').fadeIn();
            });
        }
        else if ($(this).hasClass('fa-undo')) {
            $(this).parents('.task-edit').fadeOut(400, function(){
                $(this).siblings('.task-display').fadeIn();
            });
        }
        else if ($(this).hasClass('fa-save')) {
            // editTask(listItem);
        }
    });

    // Display all current tasks
    fireDB.ref('tasks').once('value').then(function(snapshot) {
        //foreach through all tasks and append those that are not deleted
        $.each(snapshot.val(), function(task_id, task_obj){
            if(!task_obj.deleted) {
                $('ul').append('<li data-task-id=' + task_id + '><div class="task-display"><span class="input-group-addon"><input type="checkbox" aria-label="task-complete"></span><span class="task-text">' + task_obj.description + ' </span><i class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="Edit task"></i><i class="fa fa-remove" data-toggle="tooltip" data-placement="right" title="Remove task"></i></div><div class="task-edit" style="display:none;"><input type="text" name="edit-' + task_id + '" value="' + task_obj.description + '" class="form-control"><span class="edit-icons"><i class="fa fa-undo" data-toggle="tooltip" data-placement="top" title="Undo"></i><i class="fa fa-save" data-toggle="tooltip" data-placement="right" title="Save task"></i></span></div></li>')
            }
        });

        $('[data-toggle="tooltip"]').tooltip();
    });

    // Validate/Clean & submit new tasks
    $('form').submit(function(event){
        event.preventDefault();

        var newTask = $('input#newTask').val();
        // Strip tags
        newTask = newTask.replace(/<(?:.|\n)*?>/gm, '');

        if(newTask != '') {
            // addTask(newTask);
        }
        
    });

});