import test from 'tape';
import {put, take, call, fork} from 'redux-saga/effects';
import {watchForLoadImages, loadSomeImages} from '../watchForLoadImages';
import {fetchImages} from '../server/flickr';

test('watchLoadImages', assert => {
  const gen = watchForLoadImages();

  assert.deepEqual(
    gen.next().value,
    take('LOAD_IMAGES'),
    'watchLoadImages should be waiting for LOAD_IMAGES action'
  );

  assert.deepEqual(
    gen.next().value,
    call(loadSomeImages),
    'watchLoadImages should call loadImages after LOAD_IMAGES action is received'
  );

  assert.end();
});

test('loadImages', assert => {
  const gen = loadSomeImages();

  assert.deepEqual(
    gen.next().value,
    call(fetchImages),
    'loadImages should call the fetchImages api'
  );

  const images = [0];

  assert.deepEqual(
    gen.next(images).value,
    put({type: 'IMAGES_RECEIVED', images}),
    'loadImages should dispatch an IMAGES_RECEIVED action with the images'
  );

  assert.deepEqual(
    gen.next(images).value,
    put({type: 'SELECT_IMAGE', image: images[0]}),
    'loadImages should dispatch an SELECT_IMAGE action with the first image'
  );

  const error = 'error';

  assert.deepEqual(
    gen.throw(error).value,
    put({type: 'LOAD_IMAGES_FAILURE', error}),
    'loadImages should dispatch an LOAD_IMAGES_FAILURE if an error is thrown'
  );

  assert.end();
});

