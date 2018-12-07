import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
// eslint-disable-next-line import/no-cycle
import weather from '../Weather/weather';
import weatherData from '../../helpers/Data/weatherData';

const showAddWeather = () => {
  const uid = authHelpers.getCurrentUid();
  const emptyLocation = {
    userUid: uid,
    zipcode: '',
    isCurrent: true,
  };
  const domstring = `<div class="form-group mt-5 row">
    <div class="col-8 mx-auto">
      <div class="input-group mb-2 mx-auto row">
        <div class="input-group-prepend">
          <div class="input-group-text">Zip Code</div>
        </div>    
          <input type="text" class="form-control" value="${emptyLocation.zipcode}" id="form-location-zip" placeholder="Enter Zip Code">
      </div>
      <div class="row save-location-btns">
        <button id="save-location" class="btn-success mx-auto">Save New Location</button>
        <button id="cancel-add-location" class="btn-danger mx-auto">Cancel</button>      
      </div>
    </div>         
  </div>
  `;
  $('#add-location').html(domstring).show();
};

const showFirstLocationBtn = () => {
  const domstring = `
        <div class="row add-location-btns">
        <button id="add-first-location" class="btn-success mx-auto">Save New Location</button>
      </div>`;
  $('#first-location-btn').html(domstring).show();
};

const getLocationFromForm = () => {
  const uid = authHelpers.getCurrentUid();
  const location = {
    zipcode: $('#form-location-zip').val(),
    userUid: uid,
    isCurrent: true,
  };
  return location;
};

const updateCurrentLocation = (locationId) => {
  const current = true;
  weatherData.updateIsCurrent(locationId, current)
    .then(() => {
      weather.initWeather();
    })
    .catch((error) => {
      console.error('error updating current location', error);
    });
};

// const updateAllIsCurrent = (e) => {
//   const locationId = e.target.id;
//   const uid = authHelpers.getCurrentUid();
//   weatherData.getWeatherData(uid)
//     .then((weatherArray) => {
//       weatherArray.forEach((location) => {
//         let current = location.isCurrent;
//         if (current === true) {
//           current = false;
//         }
//         weatherData.updateIsCurrent(location.id, current)
//           .then(() => {
//             updateCurrentLocation(locationId);
//           })
//           .catch((error) => {
//             console.error('error updating all to false', error);
//           });
//       });
//     });
// };

const updateAllIsCurrent = (e) => {
  const locationId = e.target.id;
  const uid = authHelpers.getCurrentUid();
  weatherData.getWeatherData(uid)
    .then((weatherArray) => {
      weatherArray.forEach((location) => {
        let current = location.isCurrent;
        if (current === true) {
          current = false;
        }
        weatherData.updateIsCurrent(location.id, current);
      });
    })
    .then(() => {
      updateCurrentLocation(locationId);
    })
    .catch((error) => {
      console.error('error updating all to false', error);
    });
};

const addFirstLocation = () => {
  const firstLocation = getLocationFromForm();
  weatherData.addNewLocation(firstLocation)
    .then(() => {
      weather.initWeather();
      $('#add-location').html('').hide();
      $('#first-location-btn').hide();
      $('#weather-dropdown').show();
    })
    .catch((error) => {
      console.error(error);
    });
};

const addLocation = () => {
  const uid = authHelpers.getCurrentUid();
  weatherData.getCurrentWeatherData(uid)
    .then((weatherArray) => {
      const current = false;
      weatherData.updateIsCurrent(weatherArray.id, current);
      const newLocation = getLocationFromForm();
      return newLocation;
    })
    .then((newLocation) => {
      weatherData.addNewLocation(newLocation);
    })
    .then(() => {
      weather.initWeather();
      $('#add-location').html('').hide();
    })
    .catch((error) => {
      console.error(error);
    });
};

const deleteWeather = () => {
  const uid = authHelpers.getCurrentUid();
  weatherData.getCurrentWeatherData(uid)
    .then((weatherArray) => {
      weatherData.deleteWeatherData(weatherArray.id)
        .then(() => {
          weather.initWeather();
        });
    })
    .catch((error) => {
      console.error(error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-location', updateAllIsCurrent);
  $('body').on('click', '#add-weather-btn', showAddWeather);
  $('body').on('click', '.delete-weather-btn', deleteWeather);
  $('body').on('click', '#save-location', addLocation);
  $('body').on('click', '#cancel-add-location', weather.initWeather);
  $('body').on('click', '#add-first-location', addFirstLocation);
  // $('body').on('keyup', '#add-location', (e) => {
  //   if (e.keyCode === 13) {
  //     addLocation();
  //   }
  // });
  // $('body').on('keyup', '#add-first-location', (e) => {
  //   if (e.keyCode === 13) {
  //     console.log('first loc enter!');
  //     addFirstLocation();
  //   }
  // });
};

export default { bindEvents, showAddWeather, showFirstLocationBtn };
