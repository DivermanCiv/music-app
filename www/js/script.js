function get_genres(genresIdList){
  app.request({
    url: "https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre",
    method: "GET",
    dataType: "json",
    beforeSend: function() {
      app.dialog.preloader('Chargement', 'blue');
    },
    success: function(res) {
      console.log(res)
      for(let index = 0; index < res.data.length; index++){
        var found = genresIdList.find(function(element){
          if (element == res.data[index].id){
            $('.genre__selection').append(`
              <div class="col-50 padding">
                <a href="/play/${res.data[index].id}">
                  <img class="padding" src="${res.data[index].picture_small}">
                </a>
                <div class="Row text-align-center answer">${res.data[index].name}</div>
              </div>`)
          }
        })
      }
      app.dialog.close();
    }
  })
}
