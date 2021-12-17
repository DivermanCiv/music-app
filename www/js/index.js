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
          randomArtists.push(newArtist)
        }

        for (let index = 0; index < randomArtists.length; index++) {

            let tracklist = await get_tracklist_by_artist(res.data[randomArtists[index]].id)

            $('.answer-container').append(`
            <div class="Row margin-60 padding">
                <div class="Col text-align-center answer">${tracklist.data.data[index].title_short} - ${tracklist.data.data[index].artist.name}</div>
            </div>
            `)

            $('.music').append(`
                <source src="${tracklist.data.data[2].preview}" type="audio/mpeg">
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

    let result = await app.request({
        url: "https://infinite-fortress-56625.herokuapp.com/https://api.deezer.com/artist/" + artistId + "/top", //URL de L'api
        method: "GET", // Méthode
        crossDomain: true,
        dataType: "json", // Important, sinon vous allez récupérer un string et non un objet
        success: function (res) {

            let index = Math.floor(Math.random() * res.data.length);

            let result = res.data[index];

            return result;

        },
        error: function(res){
          console.log(res)
        }
    })
    return result;
}
