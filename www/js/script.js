function get_genres(){
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

            $('.genre__selection').append(`
              <div class="col-50 padding">
                <a href="/play/${res.data[index].id}">
                  <img class="plain border-radius-10" src="${res.data[index].picture_medium}">
                </a>
                <div class="h2 text-align-center">${res.data[index].name}</div>
              </div>
            `)
      }
      app.dialog.close();
    }
  })
}
