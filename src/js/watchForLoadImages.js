import {fetchImages} from './server/flickr';
import {put, take, fork} from 'redux-saga/effects';
 
export function* loadSomeImages() {
	 try {
	   const images = yield fetchImages()
	   yield put({type: 'IMAGES_LOADED', images})
    console.log(images)
	 } catch(error) {
    yield put({type: 'IMAGES_LOADED', error})
	 }
}

export function* watchForLoadImages() {
  while(true){
    yield take('LOAD_IMAGES');
    yield fork(loadSomeImages);
  }
}
