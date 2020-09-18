$(document).ready(function () {
    $('.delete-profile').on('click',function (e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
           type: 'DELETE',
           url: '/karta/'+id,
           success:function (response) {
               alert('Karta Ochirildi...');
               window.location.href='/';
           },
           error: function(err) {
               console.log(err);
           }
        });
    });
});