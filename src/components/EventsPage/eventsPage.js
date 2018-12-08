import $ from 'jquery';
import eventsData from '../../helpers/Data/eventData';
import authHepers from '../../helpers/authHelpers';
import './eventsPage.scss';

const printAllEvents = (eventsArray) => {
  let domString = '';
  domString += '<h5 class="heading"> Events</h5>';
  domString += '<button class="btn btn-success" id="add-events">+</button>';
  if (eventsArray.length) {
    eventsArray.forEach((event, i) => {
      if (i % 4 === 0) {
        domString += '<div class="row">';
      }
      domString += `<div class="card border-secondary mb-3" id="event-card" style="max-width: 18rem;">
                      <h5 class="card-header">${event.event}</h5>
                      <div class="card-body">
                        <p class="card-text">${event.startDate}</p>
                        <p class="card-text">${event.location}</p>
                        <button type="button" class="event-delete-button pt-1 btn btn-danger btn-sm mb-2" data-delete-id=${event.id}>
                          <i class="far fa-trash-alt" data-delete-id=${event.id}></i>
                        </button>
                        <button type="button" class="edit-button pt-1 btn btn-success btn-sm mb-2" data-edit-id=${event.id}>
                          <i class="far fa-edit" data-edit-id=${event.id}></i>
                        </button>                        
                      </div>
                      <div class="card-footer"><small class="text-muted">${event.created}</small></div>
                    </div>`;
      if (i % 4 === 3) {
        domString += '</div>';
      }
    });
  } else {
    domString += '<div class="card-text">You have no events.</div>';
  }
  $('#events').html(domString);
};

const eventsSection = () => {
  const uid = authHepers.getCurrentUid();
  eventsData.getAllEvents(uid)
    .then((eventsArray) => {
      eventsArray.sort((a, b) => new Date(b.created) - new Date(a.created));
      printAllEvents(eventsArray);
    }).catch((error) => {
      console.error(error);
    });
};

const deleteEvent = (e) => {
  console.log('DELETE');
  const idToDelete = e.target.dataset.deleteId;
  console.log(idToDelete);
  eventsData.deleteEvent(idToDelete)
    .then(() => {
      eventsSection();
    }).catch((error) => {
      console.error(error);
    });
};

$('body').on('click', '.event-delete-button', deleteEvent);

const initializeEventsSection = () => {
  eventsSection();
};

export default initializeEventsSection;
