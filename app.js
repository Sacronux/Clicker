window.onload = function() {
  if (localStorage.getItem('click') !== 0 && localStorage.getItem('click') !== null) {
    clickValue = +localStorage.getItem('clickValue');
    lvlValue = +localStorage.getItem('lvlValue');
    denominator = +localStorage.getItem('denominator');
    click = +localStorage.getItem('click');
    clickPowerCounter = +localStorage.getItem('clickPowerCounter');
    autoBonus = +localStorage.getItem('autoBonus');
    clickPower.innerHTML = +localStorage.getItem('clickPowerHTML');
    clickCounter.innerHTML = +localStorage.getItem('clickCounterHTML');
    clickPowerPrice.innerHTML = +localStorage.getItem('clickPowerPriceHTML');
    clickPowerPriceTen.innerHTML = +localStorage.getItem('clickPowerPriceTenHTML');
    lvl.innerHTML = (+localStorage.getItem('lvlValue') - 1);
    circle.style.strokeDashoffset = +localStorage.getItem('circle.style.strokeDashoffset');
    plusSecPrice.innerHTML = +localStorage.getItem('plusSecPrice');
    plusTenSecPrice.innerHTML = +localStorage.getItem('plusTenSecPrice');
  }
}

console.log(localStorage.getItem('click'));

const clickBtn = document.querySelector('#click-btn');
const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
const clickCounter = document.querySelector('.clicks-counter');
const plusOneBtn = document.querySelector('.plus-one');
const lvl = document.querySelector('.lvl-counter');
const clickPower = document.querySelector('.click-power-counter');
const clickPowerPrice = document.querySelector('.click-power-counter-value');
const clickPowerPriceTen = document.querySelector('.click-power-counter-value-ten');
const plusTenBtn = document.querySelector('.plus-ten');
const plusSecBtn = document.querySelector('.plus-one-sec');
const plusTenSecBtn = document.querySelector('.plus-ten-sec');
const plusSecPrice = document.querySelector('.click-sec-value');
const plusTenSecPrice = document.querySelector('.click-sec-value-ten');

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

let clickValue = 1;
let lvlValue = 1;
let denominator = 100;
let click = 0;
let clickPowerCounter = 1;
let autoBonus = 0;

function setLocalStorage() {
  localStorage.setItem('clickValue', clickValue);
  localStorage.setItem('lvlValue', lvlValue);
  localStorage.setItem('denominator', denominator);
  localStorage.setItem('click', click);
  localStorage.setItem('clickPowerCounter', clickPowerCounter);
  localStorage.setItem('clickPowerHTML', clickPower.innerHTML);
  localStorage.setItem('clickCounterHTML', clickCounter.innerHTML);
  localStorage.setItem('clickPowerPriceHTML', clickPowerPrice.innerHTML);
  localStorage.setItem('clickPowerPriceTenHTML', clickPowerPriceTen.innerHTML);
  localStorage.setItem('circle.style.strokeDashoffset', circle.style.strokeDashoffset);
  localStorage.setItem('plusSecPrice', plusSecPrice.innerHTML);
  localStorage.setItem('plusTenSecPrice', plusTenSecPrice.innerHTML);
  localStorage.setItem('autoBonus', autoBonus);
}
  
plusOneBtn.addEventListener('click', function() {
  if(clickValue > clickPowerPrice.innerHTML) {
    clickPowerCounter += 1;
    clickPower.innerHTML = clickPowerCounter;
    clickCounter.innerHTML = clickValue - clickPowerPrice.innerHTML - 1;
    clickValue = clickValue - clickPowerPrice.innerHTML;
    clickPowerPrice.innerHTML = Math.floor(clickPowerPrice.innerHTML * 1.2);
    setLocalStorage();
  }
});

plusTenBtn.addEventListener('click', function() {
  if(clickValue > clickPowerPriceTen.innerHTML) {
    clickPowerCounter += 10;
    clickPower.innerHTML = clickPowerCounter;
    clickCounter.innerHTML = clickValue - clickPowerPriceTen.innerHTML - 1;
    clickValue = clickValue - clickPowerPriceTen.innerHTML;
    clickPowerPriceTen.innerHTML = Math.floor(clickPowerPriceTen.innerHTML * 1.2);
    setLocalStorage();
  }
});

clickPower.innerHTML = clickPowerCounter;

clickBtn.addEventListener('click', function() {
  click += clickPowerCounter;
  setProgress(click);
  
  if (clickPowerCounter > 1) {
    clickValue = clickValue + (clickPowerCounter - 1);
    
  }
  clickCounter.innerHTML = clickValue++; 

  if(click === denominator || click >= denominator) {
    denominator *= 2.5;
    click = 0;
    lvl.innerHTML = lvlValue++;
    setLocalStorage();
  }
  setLocalStorage();
});

plusSecBtn.addEventListener('click', function() {
  if(clickValue > plusSecPrice.innerHTML) {
    clickCounter.innerHTML = clickValue - plusSecPrice.innerHTML - 1;
    clickValue = clickValue - plusSecPrice.innerHTML;
    plusSecPrice.innerHTML = Math.floor(plusSecPrice.innerHTML * 1.5);
    autoBonus++
    setLocalStorage();
  }
});

plusTenSecBtn.addEventListener('click', function() {
  if(clickValue > plusTenSecPrice.innerHTML) {
    clickCounter.innerHTML = clickValue - plusTenSecPrice.innerHTML - 1;
    clickValue = clickValue - plusTenSecPrice.innerHTML;
    plusTenSecPrice.innerHTML = Math.floor(plusTenSecPrice.innerHTML * 1.5);
    autoBonus += 10;
    setLocalStorage();
  }
});

function setProgress(click) {
  var offset = click / denominator * circumference;
  if(circumference >= offset) {
    circle.style.strokeDashoffset = circumference - offset;
  } else {
    circle.style.strokeDashoffset = circumference - circumference;
  }
}

let setAutoBonus = 
  setInterval(function() {
    click += +autoBonus;
    setProgress(click);
    clickValue += +autoBonus;
    clickCounter.innerHTML = +(clickCounter.innerHTML) + +(autoBonus);
    if(click === denominator || click >= denominator) {
      denominator *= 2.5;
      click = 0;
      lvl.innerHTML = lvlValue++;
    }
    setTimeout(setLocalStorage(), 1000);
    
  }, 1000);