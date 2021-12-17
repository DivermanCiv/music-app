function get_4_artists_by_genreId(genreId) {

    app.request({
      url: "https://www.proxyscan.io/api/proxy?format=json/https://api.deezer.com/genre/" + genreId + "/artists", //URL de L'api
      method: "GET", // Méthode
      crossDomain: true,
      dataType: "jsonp", // Important, sinon vous allez récupérer un string et non un objet
      beforeSend: function () {
        // Avant de récupérer mes datas, j'affiche un loader 
        //(important quand on fait un traitement pour montrer qu'il est en cours +  empêcher les impatients de cliquer partout pendant le process !)
        app.dialog.preloader();
      },
      success: async function (res) {

        for (let index = 0; index < 4; index++) {
            
            console.log(res[index]);
            let tracklist = await get_tracklist_by_artist(res[index].id)

            $('.answer-container').append(`
            <div class="Row margin-60 padding">
                <div class="Col text-align-center answer">${tracklist.title}</div>
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

    let result = await app.request({
        url: "https://www.proxyscan.io/api/proxy?format=json/https://api.deezer.com/artist/" + artistId + "/top", //URL de L'api
        method: "GET", // Méthode 
        crossDomain: true,
        dataType: "jsonp", // Important, sinon vous allez récupérer un string et non un objet
        success: function (res) {
            
            let index = Math.floor(Math.random() * res.length);

            return res[index];

        },
        error: function(res){
          console.log(res)
        }
    })
    return result;
}