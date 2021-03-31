
import React from 'react';
import renderer from 'react-test-renderer';
import AddReviewPage from '../../components/add-review-page/add-review-page.jsx';
import withReviewForm from './with-review-form.jsx';

const movie = {
  id: 1,
  name: `Die Hard`,
  previewImg: `img/die-hard.jpg`,
  backgroundImg: `https://via.placeholder.com/1300x552`,
  posterImg: `https://via.placeholder.com/273x410`,
  previewVid: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  genre: `Action`,
  year: 1988,
  rating: 8.2,
  score: 796619,
  description: `An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.`,
  director: `John McTiernan`,
  cast: [`Bruce Willis`, `Alan Rickman`, `Bonnie Bedelia`],
  runtime: 132,
};

const AddReviewPageWrapped = withReviewForm(AddReviewPage);

it(`withVideoPlayer component should render correctly`, () => {
  const tree = renderer.create((
    <AddReviewPageWrapped
      movie={movie}
      postReview={() => {}}
      isLoading={false}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
