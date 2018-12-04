import $ from 'jquery';
import 'bootstrap';
// import authHelpers from '../../../helpers/authHelpers';

import getAllArticles from '../../../helpers/Data/dataGetter';

const articleForm = (articles) => {
  let domString = '';
  domString = `<form>
    <div class="form-group">
      <label for="input-title">Article Title</label>
      <input type="text" class="form-control" value="${articles.title}" id="input-title">
    </div>
    <div class="form-group">
      <label for="inpute-synopsis">Synopsis</label>
      <input type="text" class="form-control" "${articles.synopsis}" id="input-synopsis">
    </div>
    <div class="form-group">
      <label for="inpute-url">URL</label>
      <input type="text" class="form-control" "${articles.url}" id="input-url">
    </div>
    <button type="submit" class="btn btn-primary" id="save-article">Save Article</button>
  </form>`;
  $('#new-article').html(domString);
};

const bindEvent = () => {
  $('body').on('click', '#add-articles', articleForm);
};

export default { bindEvent };
