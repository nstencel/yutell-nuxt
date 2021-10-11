export default {
    head: {
        title: "Yutell",
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: "stylesheet", type:"text/css", href: "https://cdn.iconmonstr.com/1.3.0/css/iconmonstr-iconic-font.min.css" }
        ]
    },
    components: true,
    buildModules: [
        '@nuxtjs/moment'
    ],
    // add your custom sass file
    css: [
        'video.js/dist/video-js.css',
        '~assets/scss/variables.scss',
        '~/assets/scss/account.scss', 
        '~/assets/scss/admin.scss',
        '~/assets/scss/app.scss',
        '~/assets/scss/appheader.scss',
        '~/assets/scss/auth.scss',
        '~/assets/scss/buttons.scss',
        '~/assets/scss/channel.scss',
        '~/assets/scss/comments.scss',
        '~/assets/scss/contentPage.scss',
        '~/assets/scss/contests.scss',
        '~/assets/scss/forms.scss',
        '~/assets/scss/modals.scss',
        '~/assets/scss/playlists.scss',
        '~/assets/scss/routeTransitions.scss',
        '~/assets/scss/search.scss',
        '~/assets/scss/sidebar.scss',
        '~/assets/scss/stories.scss',
        '~/assets/scss/structure.scss'
    ],
    link: [
        { rel: 'preconnect', href: "https://fonts.gstatic.com" },
        { rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i" },
        { rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/video.js@6.6.2/dist/video-js.css" },
        { rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/vue-video-player@5.0.0/src/custom-theme.css" }
    ],
    modules: [
        '@nuxt/http',
        'nuxt-sweetalert2',
        '@nuxtjs/style-resources'
    ],
    plugins: [
        { src: '~/plugins/persistedState.client.js' },
        { src: '~/plugins/star-rating.js', mode: 'client' }, // vue-star-rating doesn't have SSR support so we specify it only works on client browser
        { ssr: false, src: '~plugins/route-watch.js' },
        { src: '~plugins/video-player.js', ssr: false }
    ],
    styleResources: {
        scss: ['~/assets/scss/variables.scss']
    }
}