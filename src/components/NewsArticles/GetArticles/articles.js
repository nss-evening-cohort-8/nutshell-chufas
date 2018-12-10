import $ from 'jquery';
import 'bootstrap';
import authHelpers from '../../../helpers/authHelpers';
import './articles.scss';
import getAllArticles from '../../../helpers/Data/dataGetter';

const creatCards = (articles) => {
  let domString = '';
  domString += '<div class="d-flex flex-row justify-content-center">';
  domString += '<h5 class="heading-article"> Articles</h5>';
  domString += '<button class=" btn btn-success m-3" id="add-articles-btn">+</button>';
  domString += '</div>';
  articles.forEach((article) => {
    domString += `<div class="card border-secondary mb-3" style="width: 50rem;">
    <div class="card-body">
    <h5 class="card-title">${article.title}</h5>
    <p class="card-text">${article.synopsis}</p>
    <a href="${article.url}" target="_blank" class="mr-3">Read more</a>
    <button type="button" class="delete-btn pt-1 btn btn-danger btn-sm mb-2" data-delete-id=${article.id}>
      <i class="far fa-trash-alt" data-delete-id=${article.id}></i>
    </button>
    <button type="button" class="edit-btn pt-1 btn btn-success btn-sm mb-2" data-edit-id=${article.id}>
      <i class="far fa-edit" data-edit-id=${article.id}></i>
    </button>  
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
