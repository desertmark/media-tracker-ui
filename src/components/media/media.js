import { Box, useTheme } from '@material-ui/core';
import React from 'react';
import './media.css';
import Text from '../text/text';
import CircularProgress from '../../components/circular-progress/circular-progress';

export default function Media({ url, title, date, rating }) {
  const theme = useTheme();
  return (
    <div className="media">
      <div className="media__poster"
        style={{ backgroundImage: `url(${url})` }}
      >
        <div className="media-poster__rating">
          <CircularProgress thickness={5} color="info.main" variant="determinate" value={rating * 10}>
            <div className="media-poster__rating">
              <Text weight="bold" color="secondary.light" size="caption">
                {rating}
              </Text>
            </div>
          </CircularProgress>
        </div>
      </div>
      <Box mt={1} mb={1}>
        <Text weight="fontWeightBold">{title}</Text>
        <Text size="caption" color="primary.dark">{date}</Text>
      </Box>
    </div>
  );
} 