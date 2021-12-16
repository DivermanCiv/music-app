

function get_4_artists_by_genreId(genreId) {

    app.request({
      url: "https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/" + genreId + "/artists", //URL de L'api
      method: "GET", // Méthode 
      crossDomain: true,
      dataType: "json", // Important, sinon vous allez récupérer un string et non un objet
      beforeSend: function () {
        // Avant de récupérer mes datas, j'affiche un loader 
        //(important quand on fait un traitement pour montrer qu'il est en cours +  empêcher les impatients de cliquer partout pendant le process !)
        app.dialog.preloader();
      },
      success: function (res) {
        let tab = []
        for (let index = 0; index < 4; index++) {

            tracklist = get_tracklist_by_artist(res.data[index].id)

            tab.push(get_tracklist_by_artist(res.data[index].id))
        
        }
        app.dialog.close();
        $('.answer-container').append(`
            <div class="Row margin-60 padding">
                <div class="Col text-align-center answer">${res.data[index].name}</div>
            </div>
        `)
      },
      
      error: function(res){
        console.log(res)
      }
    })
};


function get_tracklist_by_artist(artistId){

    app.request({
        url: "https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/" + artistId + "/top", //URL de L'api
        method: "GET", // Méthode 
        crossDomain: true,
        dataType: "json", // Important, sinon vous allez récupérer un string et non un objet
        beforeSend: function () {
          // Avant de récupérer mes datas, j'affiche un loader 
          //(important quand on fait un traitement pour montrer qu'il est en cours +  empêcher les impatients de cliquer partout pendant le process !)
          app.dialog.preloader();
        },
        success: function (res) {
            let tab = []
            for (let index = 0; index < 4; index++) {
                
            }
            app.dialog.close();
        },
        error: function(res){
          console.log(res)
        }
      })
}