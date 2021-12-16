function get_genres(genresIdList){
  app.request({
    url: "https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre",
    method: "GET",
    dataType: "json",
    beforeSend: function() {
      app.dialog.preloader('Chargement', 'blue');
    },
    success: function(res) {
      var genresNames = [];
      var genresImages = [];
      for(let index = 0; index < res.data.length; index++){
        var found = genresIdList.find(function(element){
          if (element == res.data[index].id){
            $('.genre__selection').append(`
            <div class="Row padding">
                <img class="Row padding" src="${res.data[index].picture_medium}"/>
                <div class="Row text-align-center answer">${res.data[index].name}</div>
            </div>`)
          }
        })
      }
      app.dialog.close();
    }
  })
}
