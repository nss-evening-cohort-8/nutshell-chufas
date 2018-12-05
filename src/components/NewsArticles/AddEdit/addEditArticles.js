import $ from 'jquery';
import 'bootstrap';
import authHelpers from '../../../helpers/authHelpers';
import initializeArticlesPage from '../GetArticles/articles';

import getArticles from '../../../helpers/Data/dataGetter';

const formBuilder = (articles) => {
  const form = `<form>
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
  </form>`;
  return form;
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
  $('#add-articles').html(domString).hide();
};

const addNewArticle = () => {
  const newArticle = getArticlesFromForm();
  getArticles.addNewArticle(newArticle)
    .then(() => {
      $('#add-articles').show();
      initializeArticlesPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

const showEditForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  getArticles.getSingleArticle(idToEdit)
    .then((singleArticle) => {
      let domString = '<h2>Edit Article</h2>';
      domString += formBuilder(singleArticle);
      domString += `<button id="edit-task" data-single-edit-id="${singleArticle.id}">Save Article</button>`;
      $('#add-articles').html(domString).show();
    })
    .catch((error) => {
      console.error('error in getting single for edit', error);
    });
};
const updateArticle = (e) => {
  const updatedArticle = getArticlesFromForm();
  const ArticleId = e.target.dataset.singleEditId;
  getArticles.updateArticle(updatedArticle, ArticleId)
    .then(() => {
      $('#add-articles').html('').hide();
      initializeArticlesPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};
$('body').on('click', '#add-articles-btn', addNewArticle);
$('body').on('click', '#edit-task', updateArticle);
$('body').on('click', '.edit-btn', showEditForm);

export default { buildAddForm };
