
import './css/styles.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

const perPage = 15;
let isLoading = false;

form.addEventListener('submit', async event => {
  event.preventDefault();

  if (isLoading) return;

  query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();
  isLoading = true;

  try {
    const data = await getImagesByQuery(query, page);

    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    if (page * perPage < totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message:
          "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    isLoading = false;
  }
});

loadMoreBtn.addEventListener('click', async () => {
  if (isLoading) return;

  hideLoadMoreButton();
  showLoader();
  isLoading = true;

  try {
    const nextPage = page + 1;
    const data = await getImagesByQuery(query, nextPage);

    if (data.hits.length === 0) {
      iziToast.info({
        message:
          "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    page = nextPage;
    createGallery(data.hits);

    const galleryItem = document.querySelector('.gallery-item');
    const itemHeight = galleryItem.getBoundingClientRect().height;

    window.scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth',
    });

    if (page * perPage < totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message:
          "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Failed to load more images!',
      position: 'topRight',
    });

    showLoadMoreButton();
  } finally {
    hideLoader();
    isLoading = false;
  }
});
