# Multiple graphs with Brushing

- This project contains mainly two plot namely
  - Bubble Map: This is a plot of Missing migrants on a world map
  - Histogram : This is plot of Missing migrants aggregated by months present in the timeline of the dataset
- The dataset used for this project is taken from [Missing Migrants Project](https://missingmigrants.iom.int/downloads)
- The feature that makes this project standout is the implemention of the "brushing" on histogram based on which the bubbles are populated on the worldmap
- The bubble map takes the domain of the brushed area and filters the migrants data that falls in that domain and plot on the world map.
- This is a very useful tool to draw insights like
  - What is the time period where most of the migrants went missing/dead?
  - Which countries' borders are most effect in which period? etc.,
- The app is also optimized by using useMemo hook from React to make the interaction snappy

## Tech Used

- React
- D3

## Snippet

https://github.com/Shanmukh459/Multiplot-with-brushing/assets/52078988/872bf51d-45d6-41c0-96c1-f64bb5cdae6c


Happy Coding!
