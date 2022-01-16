function CariFoto() {
    $('#list-foto').html('');
    var API_KEY = '14101973-faca8177fb254f5a157082fd0';
    var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+$('#text-cari').val();
    $.getJSON(URL, function(data){
    if (parseInt(data.totalHits) > 0)
        $.each(data.hits, function(id, hit){ 
            console.log(hit.pageURL); 
            $('#list-foto').append(`
                    <div class="col-md-4 mb-3">
                        <div class="card" style="width: 350px">
                            <img src="` + hit.webformatURL + `" class="card-img-top" alt="..." style="height: 350px">
                            <div class="card-body">
                                <h5 class="card-title">` + hit.user + `</h5> 
                                <h6 class="card-subtitle mb-2 text-muted">Views : ` + hit.views + `</h6>
                                <h6 class="card-subtitle mb-2 text-muted" style="font-size: 13px">Tags : ` + hit.tags + `</h6>
                                <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal" data-id="` + hit.id + `" style="margin-top: 10px">Detail Foto</button>
                            </div>
                        </div>
                    </div>`);
        });
    else{
        console.log('No hits');
        $('#list-foto').html(`
                <h3>Data Tidak Di Temukan</h3>`);
    };
    });
}

$('#btnCari').on('click', function () {
    CariFoto();
});

$('#text-cari').on('keyup', function (e) {
    if (e.keyCode == 13) {
        CariFoto();
    }
});


$('#list-foto').on('click', '.btn-outline-primary', function () {
    $('#movie-foto').html('');
    $.ajax({
        "url": "https://pixabay.com/api/",
        "type": "get",
        "dataType": "json",
        "data": {
            "key": "14101973-faca8177fb254f5a157082fd0",
            "id": $(this).data('id')},
        success: function (data) {
             if (parseInt(data.totalHits) > 0)
        $.each(data.hits, function(id, hit){ 
            console.log(hit.pageURL); 
            $('#foto-detil').html(`
                    <div class="col-md-4">
                        <ul class="list-group">
                        <img src="` + hit.webformatURL + `" class="img-fluid" alt="Responsive image">
                        <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModa" data-id="` + hit.id + `" style="margin-top: 10px">Foto Hd</button>
                        </ul>
                    </div>
                    <div class="col-md-8">
                        <ul class="list-group">
                            <li class="list-group-item active">User : ` + hit.user + `</li>
                            <li class="list-group-item">Views : ` + hit.views + `</li>
                            <li class="list-group-item">Likes  : ` + hit.likes + `</li>
                            <li class="list-group-item">Downloads  : ` + hit.downloads + `</li>
                            <li class="list-group-item">Favorites  : ` + hit.favorites + `</li>
                            <li class="list-group-item">Type  : ` + hit.type + `</li>
                            <li class="list-group-item">Tags  : ` + hit.tags + `</li>
                        </ul>
                    </div>
                `)
            $('#foto-deti').html(`
                 <img src="` + hit.largeImageURL + `" class="img-fluid" alt="Responsive image">
                `)
        });
    else{
        console.log('No hits');
        alert('Terjadi kesalahan saat mengambil data');
    }; 
        }
    });

})