import $ from 'jquery';
import eventsData from '../../helpers/Data/eventData';
import authHepers from '../../helpers/authHelpers';


const printAllEvents = (eventsArray) => {
  let domString = '';
  domString += '<h5> Events</h5>';
  domString += '<div class="event-card">';
  domString += '<button class="btn btn-info" id="add-events">Add Events</button>';
  if (eventsArray.length) {
    eventsArray.forEach((event) => {
      domString += `<div class="card border-secondary mb-3" style="max-width: 18rem;">
                      <div class="card-header">${event.event}</div>
                      <div class="card-body">
                        <p class="card-text">${event.startDate}</p>
                        <p class="card-text">${event.location}</p>
                        <input class="delete-button pt-1" data-delete-id=${event.id} type="image" src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/56-512.png" width="20px"></input>    
                        <input class="edit-button pt-1 ml-2" data-edit-id=${event.id} type="image" src="http://www.iconarchive.com/download/i49407/designcontest/outline/Pencil.ico" width="20px"></input>
                      </div>
                      <div class="card-footer text-muted" >${event.created}</div>
                    </div>`;
      domString += '</div>';
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
  const idToDelete = e.target.dataset.deleteId;
  eventsData.deleteEvent(idToDelete)
    .then(() => {
      eventsSection();
    }).catch((error) => {
      console.error(error);
    });
};

$('body').on('click', '.delete-button', deleteEvent);

const initializeEventsSection = () => {
  eventsSection();
};

export default initializeEventsSection;
