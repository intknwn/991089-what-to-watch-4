export const parseMovieData = (movie) => ({
  id: movie.id,
  name: movie.name,
  posterImg: movie.poster_image,
  previewImg: movie.preview_image,
  backgroundImg: movie.background_image,
  backgroundColor: movie.background_color,
  videoSrc: movie.video_link,
  previewVid: movie.preview_video_link,
  description: movie.description,
  rating: movie.rating,
  score: movie.scores_count,
  director: movie.director,
  cast: movie.starring,
  runtime: movie.run_time,
  genre: movie.genre,
  year: movie.released,
  isFavorite: movie.is_favorite,
});

export const parseUserData = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  avatarSrc: user.avatar_url,
});

