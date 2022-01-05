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
      pageAfterIn: function(e, page) {
        var router = this;
        var app = router.app;
        get_genres()
      }
    }
  },
  {
    path: '/play/:id',
    url: './pages/play.html',
    on: {
      pageAfterIn: function (e, page) {
        var router = this;
        var app = router.app;
        var genreId = page.route.params.id;
        var round = 1;

        results = []

        get_4_artists_by_genreId(genreId, round);
      },
    }
  },
  {
    path: '/result/:score',
    url: './pages/result.html',
    on: {
      pageAfterIn: function (e, page) {
        var router = this;
        var app = router.app;
        var score = page.route.params.score;

        get_score(score)
      }
    }
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
