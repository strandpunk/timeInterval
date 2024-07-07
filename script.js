// console.log('123')

const dayStart = '9:00'
const dayEnd = '21:00'

const dayStartHrs = '9'
const dayEndHrs = '21'

const busy = [
  {
    'start': '10:30',
    'stop': '10:50'
  },
  {
    'start': '18:40',
    'stop': '18:50'
  },
  {
    'start': '14:40',
    'stop': '15:50'
  },
  {
    'start': '16:40',
    'stop': '17:20'
  },
  {
    'start': '20:05',
    'stop': '20:20'
  }
]


//Создаем список всех возможных интервалов рабочего дня по 30 минут
let workTimeHrs = 9
let workTimeMin = 0
let workTime = workTimeHrs + ':0' + workTimeMin

let working = []

//console.log(workTime)
working.push(workTime)
for (let i = 0; i < 24; i++) {
  workTimeMin = workTimeMin + 30

  if (workTimeMin >= 60) {
    workTimeMin = workTimeMin - 60
    workTimeHrs++
    workTime = workTimeHrs + ':' + workTimeMin
    //console.log(workTime)

    if (String(workTime).length < 5) {
      workTime = workTimeHrs + ':0' + workTimeMin
      working.push(workTime)
    }
    else {
      working.push(workTime)
    }

  }
  else {
    workTime = workTimeHrs + ':' + workTimeMin
    working.push(workTime)
    //console.log(workTime)
  }
}


const workingMin = []
//Переводим время в минуты
working.forEach((time) => {

  let workHrs = time.split(':')[0] * 60;
  let workMin = time.slice(-2)
  let workTime = Number(workHrs) + Number(workMin)
  workingMin.push(workTime)
  //console.log(workTime)
})


const busyMin = []
busy.forEach((time) => {

  let startTimeHrs = time.start.slice(0, 2)
  let stopTimeHrs = time.stop.slice(0, 2)

  let startTimeMin = time.start.slice(3, 5)
  let stopTimeMin = time.stop.slice(3, 5)

  let x = (Number(startTimeHrs) * 60) + Number(startTimeMin)
  busyMin.push(x)
  let y = (Number(stopTimeHrs) * 60) + Number(stopTimeMin)
  busyMin.push(y)



  //console.log(workTime)
})

//console.log(workingMin)
//console.log(busyMin)

// Определение промежутков
// Определение промежутков с учетом разницы в 30 единиц
const intervals = [];
for (let i = 0; i < busyMin.length; i += 2) {
  const start = busyMin[i] - 29; // Увеличиваем начальную границу
  const end = busyMin[i + 1] + 29; // Увеличиваем конечную границу
  intervals.push([start, end]);
}

//console.log(intervals)


const numbersNotInIntervals = workingMin.filter(number => {
  return !intervals.some(([start, end]) => start <= number && number <= end);
});
//console.log("not interval:", numbersNotInIntervals);


//Переводим минуты в массиве в формат времени
function convertMinutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = mins.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}

function convertMinutesArrayToTimeArray(minutesArray) {
  return minutesArray.map(convertMinutesToTime);
}

const timeArray = convertMinutesArrayToTimeArray(numbersNotInIntervals);
console.log(timeArray);

const arrayOut = document.getElementById("arrayOut");
const arrayHTML = "<ul>" + timeArray.map(item => `<li>${item}</li>`).join("") + "</ul>";
arrayOut.innerHTML = arrayHTML;