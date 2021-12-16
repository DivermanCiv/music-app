
var routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/home/',
    url: './pages/home.html',
  },
  {
    path: '/start/',
    url: './pages/start.html',
    on: {
      pageInit: function(e, page) {
        var router = this;
        var app = router.app;
        var genresIdList = ["132", "116", "152"]
        get_genres(genresIdList)
      }
    }
  },
  {
    path: '/play/',
    url: './pages/play.html',
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/form/',
    url: './pages/form.html',
  },
  {
    path: '/settings/',
    url: './pages/settings.html',
  },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    componentUrl: './pages/dynamic-route.html',
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/request-and-load.html',
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];

function get_recipe(recipeId) {
  app.request({
    url: "https://api.deezer.com" + recipeId, //URL de L'api
    method: "GET", // Méthode
    dataType: "json", // Important, sinon vous allez récupérer un string et non un objet
    beforeSend: function () {
      // Avant de récupérer mes datas, j'affiche un loader
      //(important quand on fait un traitement pour montrer qu'il est en cours +  empêcher les impatients de cliquer partout pendant le process !)
      app.dialog.preloader();
    },
    success: function (res) {
      // res correspond à la réponse
      console.log(res);
      console.log(res.meals);
      //Traitement des datas
      for (let index = 0; index < res.meals.length; index++) {
        let meal = res.meals[index];
        $$(".recipe__title").html(meal.strMeal);
        $$(".recipe__description").html(meal.strInstructions);
      }
      // Je ferme le loader
      app.dialog.close();
    },
  });
}
