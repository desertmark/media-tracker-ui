
export const mdbConfig = {
    baseUrl: 'https://api.themoviedb.org/3',
    apiKey: 'f6eeb756f40457dfcc486ac37c3065d6',
    endpoints: {
        configuration: '/configuration',
        trending: '/trending/{media_type}/{time_window}',
        movie: '/movie/{movie_id}',
        tv: '/tv/{tv_id}',
    }
};
