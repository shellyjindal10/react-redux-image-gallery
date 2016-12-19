import {fetchImages} from './server/flickr';
import {put} from 'redux-saga/effects';
 
export function* loadSomeImages(){
  const images = yield fetchImages()
  yield put({type: 'IMAGES_LOADED', images})
  console.log(images)
}

