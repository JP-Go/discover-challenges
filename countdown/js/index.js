const DAYS_IN_HOURS = 24;
const HOURS_IN_MINUTES = 60;
const MINUTES_IN_SECONDS = 60;
const SECONDS_IN_MILISECONDS = 1000;
const DECIMAL = 10;

const daysField = document.querySelector("#days");
const hoursField = document.querySelector("#hours");
const minutesField = document.querySelector("#minutes");
const secondsField = document.querySelector("#seconds");

const fields = {
  daysField,
  hoursField,
  minutesField,
  secondsField,
};

// const ONE_MONTH_FROM_CURRENT_ONE = new Date().getMonth() + 1;
const launchDate = new Date(2022, 11, 31);
// launchDate.setMonth(ONE_MONTH_FROM_CURRENT_ONE);

function timeLeft(launchDate, today = new Date()) {
  const timeDeltaInMiliseconds = launchDate - today;
  const totalSeconds = Math.floor(
    timeDeltaInMiliseconds / SECONDS_IN_MILISECONDS
  );
  const seconds = totalSeconds % MINUTES_IN_SECONDS;
  const minutes =
    Math.floor(totalSeconds / MINUTES_IN_SECONDS) % HOURS_IN_MINUTES;
  const hours =
    Math.floor(totalSeconds / (HOURS_IN_MINUTES * MINUTES_IN_SECONDS)) %
    DAYS_IN_HOURS;
  const days =
    Math.floor(
      totalSeconds / (HOURS_IN_MINUTES * MINUTES_IN_SECONDS * DAYS_IN_HOURS)
    ) % DAYS_IN_HOURS;

  return { days, hours, minutes, seconds };
}

function updateTimerField(field, value) {
  field.innerText = value.toString(DECIMAL).padStart(2, "0");
}

function updateTimer(launchDate, fields) {
  const { days, hours, minutes, seconds } = timeLeft(launchDate);
  const { daysField, hoursField, minutesField, secondsField } = fields;
  updateTimerField(daysField, days);
  updateTimerField(hoursField, hours);
  updateTimerField(minutesField, minutes);
  updateTimerField(secondsField, seconds);
}

setInterval(() => {
  updateTimer(launchDate, fields);
}, 1000);
