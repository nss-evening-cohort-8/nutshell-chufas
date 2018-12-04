import $ from 'jquery';
import 'bootstrap';
import authHelpers from '../../../helpers/authHelpers';
// import initializeArticlesPage from '../GetArticles/articles';

import getAllArticles from '../../../helpers/Data/dataGetter';

const formBuilder = (articles) => {
  let domString = '';
  domString = `<form>
    <div class="form-group">
      <label for="input-title">Article Title</label>
      <input type="text" class="form-control" value="${articles.title}" id="input-title">
    </div>
    <div class="form-group">
      <label for="inpute-synopsis">Synopsis</label>
      <input type="text" class="form-control" value="${articles.synopsis}" id="input-synopsis">
    </div>
    <div class="form-group">
      <label for="inpute-url">URL</label>
      <input type="text" class="form-control" value="${articles.url}" id="input-url">
    </div>
    <button type="submit" class="btn btn-primary" id="save-article">Save Article</button>
  </form>`;
  $('#new-article').html(domString);
};

const getArticlesFromForm = () => {
  const article = {
    title: $('#input-title').val(),
    synopsis: $('#input-synopsis').val(),
    ulr: $('#input-url').val(),
    uid: authHelpers.getCurrentUid(),
  };
  return article;
};

const buildAddForm = () => { // we need this function just to reuse fomBuilder
  // func, to add, add and editbutton
  const emptyArticle = {
    title: '',
    synopsis: '',
    url: '',
  };
  let domString = '<h2>Add New Article</h2>';
  domString += formBuilder(emptyArticle);
  domString += '<button id="add-article">Add Article</button>';
  $('#add-articles').html(domString).show();
  $('#articles-container').show();
};

const addNewArticle = () => {
  const newArticle = getArticlesFromForm();
  getAllArticles.addNewArticle(newArticle)
    .then(() => {
      $('#articles-container').html('').show();
    //   initializeArticlesPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

$('body').on('click', '#save-article', addNewArticle);

const bindEvent = () => {
  $('body').on('click', '#add-articles', formBuilder);
};

export default { buildAddForm, bindEvent };
