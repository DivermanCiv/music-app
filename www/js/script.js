function get_genres(genresIdList){
  app.request({
    url: "https://infinite-fortress-56625.herokuapp.com/https://api.deezer.com/genre",
    method: "GET",
    dataType: "json",
    beforeSend: function() {
      app.dialog.preloader('Chargement', 'blue');
    },
    success: function(res) {
      var elementFound = 0
      for(let index = 0; index < res.data.length; index++){
        var found = genresIdList.find(function(element){
          if (element == res.data[index].id){

            $('.genre__selection').append(`
              <div class="col-50">
                <a href="/play/${res.data[index].id}">
                  <img src="${res.data[index].picture_medium}">
                </a>
                <div class="Row text-align-center">${res.data[index].name}</div>
              </div>`)
          }
        })
      }
      app.dialog.close();
    }
  })
}
