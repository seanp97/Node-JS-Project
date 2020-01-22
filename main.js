$(document).ready(function () {
    var newDate = new Date();
    var nYear = newDate.getFullYear();
    $(".dateYear").text(nYear);

    $("#addUser").click(function () {
        $('#addInput').parents('form').eq(0).submit();
    });

    $("#editUser").click(function () {
        $('#editInput').parents('form').eq(0).submit();
    });
});

