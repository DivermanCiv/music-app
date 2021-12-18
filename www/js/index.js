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


function get_4_artists_by_genreId(genreId) {

    app.request({
      url: "https://infinite-fortress-56625.herokuapp.com/https://api.deezer.com/genre/" + genreId + "/artists", //URL de L'api
      method: "GET", // Méthode
      crossDomain: true,
      dataType: "json", // Important, sinon vous allez récupérer un string et non un objet
      beforeSend: function () {
        // Avant de récupérer mes datas, j'affiche un loader
        //(important quand on fait un traitement pour montrer qu'il est en cours +  empêcher les impatients de cliquer partout pendant le process !)
        app.dialog.preloader();
      },
      success: async function (res) {
        var randomArtists = []
        while (randomArtists.length < 4){
          var newArtist = (Math.floor(Math.random() * res.data.length))
          var found = 0
          for(index=0; index<randomArtists.length; index++){
            if(newArtist == randomArtists[index]){
              found++
            }
          }
          if (found === 0){
            randomArtists.push(newArtist)
          }
        }
        var goodAnswer = (Math.floor(Math.random() * randomArtists.length))
        console.log(goodAnswer)
        for (let index = 0; index < randomArtists.length; index++) {
            let tracklist = await get_tracklist_by_artist(res.data[randomArtists[index]].id)
            console.log(tracklist)
            if (index == goodAnswer){
              var answerType = "good"
              $('.music').append(`
                  <source src="${tracklist.data.data[index].preview}" type="audio/mpeg">
              `)
            } else { var answerType = "wrong" }

            $('.answer-container').append(`
            <div class="Row margin-60 padding">
                <div class="Col text-align-center answer ${answerType}">${tracklist.data.data[index].title} - ${tracklist.data.data[index].artist.name}</div>
            </div>
            `)
        }



        app.dialog.close();

      },

      error: function(res){
        console.log(res)
      }
    })
};


async function get_tracklist_by_artist(artistId){

    let response = await app.request({
        url: "https://infinite-fortress-56625.herokuapp.com/https://api.deezer.com/artist/" + artistId + "/top", //URL de L'api
        method: "GET", // Méthode
        crossDomain: true,
        dataType: "json", // Important, sinon vous allez récupérer un string et non un objet
        success: function (res) {
          let index = Math.floor(Math.random() * res.data.length);

          let result = res.data[index];

          return result
        },
        error: function(res){
          console.log(res)
        }
    })

    return response;
}
