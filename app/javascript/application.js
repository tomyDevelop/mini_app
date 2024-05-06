// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

const init = function() {
  const hoursList = document.getElementById('hoursList');
  const minutesList = document.getElementById('minutesList');

  const hoursComboToggle = function () {
    if (hoursList.classList.contains('hidden')) {
      hoursList.classList.remove('hidden');
    } else {
      hoursList.classList.add('hidden');
    }
  }

  const minutesComboToggle = function () {
    if (minutesList.classList.contains('hidden')) {
      minutesList.classList.remove('hidden');
    } else {
      minutesList.classList.add('hidden');
    }
  }

  const hours = document.getElementById('hours');
  const minutes = document.getElementById('minutes');
  hours.addEventListener('click', hoursComboToggle);
  minutes.addEventListener('click', minutesComboToggle);

  const hourCombobox = document.getElementById('combobox_hours');
  const hours_options = document.querySelectorAll('#hoursList li');
  const minuteCombobox = document.getElementById('combobox_minutes');
  const minutes_options = document.querySelectorAll('#minutesList li');

  const hoursSelectOption = function(e) {
    hourCombobox.value = e.target.textContent;
  }

  const minutesSelectOption = function(e) {
    minuteCombobox.value = e.target.textContent;
  }

  hours_options.forEach( function(option) {
    option.addEventListener('click', function(e) {
      hoursSelectOption(e);
      hoursComboToggle();
    });
  });

  minutes_options.forEach( function(option) {
    option.addEventListener('click', function(e) {
      minutesSelectOption(e);
      minutesComboToggle();
    });
  });

  hourCombobox.addEventListener('input', function() {
    if (hoursList.classList.contains('hidden')) {
      hoursList.classList.remove('hidden');
    }
    
    const text = hourCombobox.value;
    let options_exists = false;
    hours_options.forEach( function(option) {
      if (option.textContent.includes(text)) {
        if (option.classList.contains('hidden')) {
          option.classList.remove('hidden');
        }
        if ( options_exists === false ) {
          options_exists = true;
        }
      } else {
        if (!option.classList.contains('hidden')) {
          option.classList.add('hidden');
        }
      }
    });

    if (!hoursList.classList.contains('hidden') && options_exists === false ) {
      hoursList.classList.add('hidden');
    }
  });

  minuteCombobox.addEventListener('input', function() {
    if (minutesList.classList.contains('hidden')) {
      minutesList.classList.remove('hidden');
    }
    
    const text = minuteCombobox.value;
    let options_exists = false;
    minutes_options.forEach( function(option) {
      if (option.textContent.includes(text)) {
        if (option.classList.contains('hidden')) {
          option.classList.remove('hidden');
        }
        if ( options_exists === false ) {
          options_exists = true;
        }
      } else {
        if (!option.classList.contains('hidden')) {
          option.classList.add('hidden');
        }
      }
    });

    if (!minutesList.classList.contains('hidden') && options_exists === false ) {
      minutesList.classList.add('hidden');
    }
  });

  document.addEventListener('mousedown', function(e) {
    if (!hourCombobox.contains(e.target) && !hours.contains(e.target) && !hoursList.contains(e.tartget)) {
      if (!hoursList.classList.contains('hidden')) {
        hoursList.classList.add('hidden');
      }
    }
  });

  document.addEventListener('mousedown', function(e) {
    if (!minuteCombobox.contains(e.target) && !minutes.contains(e.target) && !minutesList.contains(e.tartget)) {
      if (!minutesList.classList.contains('hidden')) {
        minutesList.classList.add('hidden');
      }
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (!hoursList.classList.contains('hidden')) {
        hoursList.classList.add('hidden');
      }
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (!minutesList.classList.contains('hidden')) {
        minutesList.classList.add('hidden');
      }
    }
  });

}

export default init;
