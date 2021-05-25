import React, { createContext, useContext, useState } from 'react';
import { withDependency } from '../../app/di.context';
import { useAppState } from '../app.context';

const HomeContext = createContext();

export function useHomeState() {
    return useContext(HomeContext);
}

function HomeProvider({ children, mdbTrendingApi, mdbMoviesApi, mdbTvApi }) {

    const [trending, setTrending] = useState(null);
    const [popularMovies, setPopularMovies] = useState(null);
    const [popularTv, setPopularTv] = useState(null);
    const appState = useAppState();

    function loadTrending(media_type = 'all', time_window = 'week') {
        const _loadTrending = async () => {
            const res = await mdbTrendingApi.getTrending({ media_type, time_window });
            setTrending(res);
        }
        const task = _loadTrending();
        appState?.appLoader.waitFor(task);
    }

    function loadPopularMovies() {
        const _loadPopularMovies = async () => {
            const res = await mdbMoviesApi.getPopular();
            res.results = res.results?.slice(0, 14);
            setPopularMovies(res);
        }
        const task = _loadPopularMovies();
        appState?.appLoader.waitFor(task);
    }


    function loadPopularTv() {
        const _loadPopularTv = async () => {
            const res = await mdbTvApi.getPopular();
            res.results = res.results?.slice(0, 14);
            setPopularTv(res);
        }
        const task = _loadPopularTv();
        appState?.appLoader.waitFor(task);
    }

    return (
        <HomeContext.Provider value={{ trending, popularMovies, popularTv, loadPopularMovies, loadTrending, loadPopularTv }}>
            {children}
        </HomeContext.Provider>
    );
}

export default withDependency(HomeProvider, ['mdbTrendingApi', 'mdbMoviesApi', 'mdbTvApi']);
