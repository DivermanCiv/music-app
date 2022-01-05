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
};


function get_4_artists_by_genreId(genreId, round) {
    round++
    if(round > 2){
      var score = calculateResult(results)
      return app.views.main.router.navigate(`/result/${score}`)
    }
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
        for (let index = 0; index < randomArtists.length; index++) {
            let tracklist = await get_tracklist_by_artist(res.data[randomArtists[index]].id)
            if (index == goodAnswer){
              var answerType = "goodAnswer"
              $('.music').append(`
                  <source src="${tracklist.data.data[index].preview}" type="audio/mpeg">
              `)

              let music = document.querySelector(".music")
              let timer = document.getElementById("timer")
              timer.textContent = music.currentTime
              if(music.ontimeupdate == 0){
                nextQuestion(genreId)
              }
              music.load()
            } else { var answerType = "wrongAnswer" }

            $('.answer-container').append(`
            <div class="Row margin-60 padding">
                <div class="Col text-align-center answer ${answerType}">${tracklist.data.data[index].title} - ${tracklist.data.data[index].artist.name}</div>
            </div>
            `)
        }

        var countdown = setTimeout(nextQuestion, 30000, genreId, round)

        checkAnswer(genreId, round, countdown);


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

function checkAnswer(genreId, round, countdown){
  var answers = document.getElementsByClassName("answer")
  for(var i=0; i<answers.length; i++){
    answers[i].addEventListener("click", function(){
      clearTimeout(countdown)
      if(this.classList.contains("goodAnswer")) {
        goodAnswer()
        let music = document.querySelector(".music")
        addResult(music.currentTime)
      } else {
        wrongAnswer()
      }
      setTimeout(nextQuestion, 2000, genreId, round)
    })
  }
}

function goodAnswer(){
  console.log('bravo')
}

function wrongAnswer(){
  console.log('wrong')
}

function nextQuestion(genreId, round){

  let music = document.querySelector(".music")

  music.pause()
  music.currentTime = 0;

  $('.music').empty();

  $('.answer-container').empty();

  get_4_artists_by_genreId(genreId, round)
}

results = []

function addResult(timer){
  result = 30000 - timer * 1000
  result = Math.round(result)
  results.push(result)
}

function calculateResult(results){
  var finalResult = 0
  results.forEach(element => {
    finalResult += element
  });
  results = []
  return finalResult
}

function get_score(score){
    $('#score').append(`${score}`)

}
