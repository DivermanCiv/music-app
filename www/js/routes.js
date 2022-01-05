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
        var round = 0;

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
