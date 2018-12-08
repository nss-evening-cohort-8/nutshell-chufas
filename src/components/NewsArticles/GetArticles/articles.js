import $ from 'jquery';
import 'bootstrap';
import authHelpers from '../../../helpers/authHelpers';
import './articles.scss';

import getAllArticles from '../../../helpers/Data/dataGetter';
import deleteIcon from '../../images/deleteIcon.jpeg';

const creatCards = (articles) => {
  let domString = '';
  domString += '<button class="btn-info m-3" id="add-articles-btn">Add Articles</button>';
  articles.forEach((article) => {
    domString += `<div class="card" style="width: 50rem;">
    <div class="card-body">
    <h5 class="card-title">${article.title}</h5>
    <p class="card-text">${article.synopsis}</p>
    <a href="${article.url}" target="_blank">Read more</a>
    <img src="${deleteIcon}" width="20px" height="20px" class="btn-danger delete-btn" data-delete-id=${article.id}>
    <button class="btn-info edit-btn" data-edit-id=${article.id}>Edit</button>
    </div>
    </div>`;
  });
  $('#articles').html(domString);
};

const getArticles = () => {
  const uid = authHelpers.getCurrentUid();
  getAllArticles.getAllArticlesFromDb(uid)
    .then((allArticlesArray) => {
      creatCards(allArticlesArray);
    })
    .catch((error) => {
      console.error(error);
    });
};

const deleteArticle = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  getAllArticles.deleteArticle(idToDelete)
    .then(() => {
      getArticles();
    })
    .catch((error) => {
      console.log('error in deleting friend', error);
    });
};

$('body').on('click', '.delete-btn', deleteArticle);

const initializeArticlesPage = () => {
  getArticles();
};
export default initializeArticlesPage;
