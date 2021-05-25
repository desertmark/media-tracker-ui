import React, { useState } from 'react';
import { useEffect } from 'react';
import Carousel from '../../components/carousel/carousel';
import { useHomeState, useLoadTrending } from './home.context';
import HomeProvider from './home.context';
import { useAppState } from '../app.context';
import CarouselSlide from '../../components/carousel-slide/carousel-slide';
import { Box } from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Media from '../../components/media/media';
import Gallery from '../../components/gallery/gallery';
import Text from '../../components/text/text';
import Toggle from '../../components/toggle/toggle-button';
import PopcornIcon from '../../components/icons/popcorn';
import LiveTv from '@material-ui/icons/LiveTv';

function Home() {
  const appState = useAppState();
  const homeState = useHomeState();
  const [currentTrendingMediaType, setCurrentTrendingMediaType] = useState('all');
  const [currentTrendingTimeWindow, setCurrentTrendingTimeWindow] = useState('week');
  useEffect(() => {
    homeState.loadTrending();
    homeState.loadPopularMovies();
    homeState.loadPopularTv();
  }, [])

  function buildSlide(item) {
    const imgName = item.backdrop_path;
    const url = `${appState.imagesConfig.base_url}${appState.imagesConfig.backdrop_sizes[2]}${imgName}`
    return (
      <CarouselSlide
        key={imgName}
        height="720px"
        url={url}
        overlay={true}
        title={item.name || item.title}
        description={item.overview}
      ></CarouselSlide>
    );
  }

  function buildMedia(item) {
    const imgName = item.poster_path;
    const url = `${appState.imagesConfig.base_url}${appState.imagesConfig.backdrop_sizes[2]}${imgName}`
    return (
      <Media
        key={url}
        url={url}
        title={item.title || item.name}
        date={item.release_date || item.first_air_date}
        rating={item.vote_average}
      ></Media>
    );
  }

  function onTrendingMediaChange(event, mediaType) {
    setCurrentTrendingMediaType(mediaType);
    homeState.loadTrending(mediaType, currentTrendingTimeWindow);
  }
  function onTrendingTimeChange(event, timeWindow) {
    setCurrentTrendingTimeWindow(timeWindow);
    homeState.loadTrending(currentTrendingMediaType, timeWindow);
  }

  return (
    <div className="home">
      {/* <Box my="2rem">
                <Text color="primary.main" size="h4" weight="fontWeightLight">What's trending right now</Text>
            </Box> */}
      <div className="no-gutters">
        <Carousel>
          {homeState?.trending?.results?.map(item => buildSlide(item))}
        </Carousel>
      </div>
      <div>
        <Box my={4}>
          <Text color="primary.main" size="h4" weight="fontWeightLight">Trending right now</Text>
        </Box>
        <Box display="flex" my={2}>
          <Box>
            <ToggleButtonGroup
              value={currentTrendingMediaType}
              exclusive
              onChange={onTrendingMediaChange}
              size="small"
            >
              <Toggle color="primary" value="all">All</Toggle>
              <Toggle color="primary" value="movies">
                <PopcornIcon />
              </Toggle>
              <Toggle color="primary" value="tv">
                <LiveTv />
              </Toggle>
            </ToggleButtonGroup>
          </Box>
          <Box ml={2}>
            <ToggleButtonGroup
              value={currentTrendingTimeWindow}
              exclusive
              onChange={onTrendingTimeChange}
              size="small"
            >
              <Toggle color="info" value="week">This Week</Toggle>
              <Toggle color="info" value="day">Today</Toggle>
            </ToggleButtonGroup>
          </Box>
        </Box>
        <Gallery colSize="10rem">
          {homeState?.trending?.results?.map(item => buildMedia(item))}
        </Gallery>
      </div>
      <div>
        <Box my="2rem" display="flex" alignItems="center">
          <Box mr={1}><PopcornIcon fontSize="large" color="primary"/></Box>
          <Text color="primary.main" size="h4" weight="fontWeightLight">See what's popular on the big screen</Text>
        </Box>
        <Gallery colSize="10rem">
          {homeState?.popularMovies?.results?.map(item => buildMedia(item))}
        </Gallery>
      </div>
      <div>
        <Box my="2rem" display="flex" alignItems="center">
          <Box mr={1}><LiveTv fontSize="large" color="primary"/></Box>
          <Text color="primary.main" size="h4" weight="fontWeightLight">See what's popular on the small screen</Text>
        </Box>
        <Gallery colSize="10rem">
          {homeState?.popularTv?.results?.map(item => buildMedia(item))}
        </Gallery>
      </div>

      {JSON.stringify()}
    </div>
  );
}

export default () => <HomeProvider><Home></Home></HomeProvider>;