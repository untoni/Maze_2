// Import stylesheets
import "./style.css";

// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>JS Starter</h1>`;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let nX = [0, 1, 0, -1];  
let nY = [1, 0, -1, 0];

let xx;  //Локальная переменная для того чтобы делать какие-то операции с Х
let yy;  //Локальная переменная для того чтобы делать какие-то операции с У
let rost = 9;   //Ширина и высота масива, через который будет отображаться лабиринт
let xE = 3;  //Координаты выхода по Х, дословно xExit
let yE = (rost - 1) / 2 - 1;  //Координаты выхода по У, дословно уExit
let xI = 2;  //Координати входа по Х
let yI = 0;  //Координаты входа по У
let xW = xI;   //Начальная точка построения "главного пути" лабиринта по Х, начинаеться из точки входа
let yW = yI;   //Начальная точка построения "главного пути" лабиринта по У, начинаеться из точки входа
let exit = 0;  //Нашелся ли выход
let k;   //Сколько свободных пикселей осталось
let t;   //Сколько открытых путей вокруг пикселя на конце "главного пути", используеться не только для этого
let p = [];  //Масив для построения главного пути, который всегда ведет к выходу
let p2 = [];  //Масив с главными точками лабиринта
let pC = [];  //Масив с каждым пикселем лабиринта
let proba = [];  //Одноразовый мосив, нужен чтобы построить шаблоны для масивов лабиринта
let x = [];  //Масив точек которые участвывали в "заливке" для нахождения пути в этой итерации по Х
let y = [];  //Масив точек которые участвывали в "заливке" для нахождения пути в этой итерации по У
let x1 = [];  //Почти тоже самое что и масив "х", нужен как замена для "х" 
let y1 = [];  //По аналогии "х1", только для у
let pW = [];  //Для того чтобы мы знали в какую сторону простроить путь

arrayMax(rost);
arrayMin((rost - 1) / 2);

function arrayMax(r) {
  for (let i = 0; i < r; i++) {
    proba.push(0);
  }
  for (let m = 0; m < r; m++) {
    pC.push(proba);
  }
  for (let i = 1; i < r; i++) {
    for (let j = 1; j < r; j++) {
      if ((!i > 1 && !i < r) || (!j > 1 && !j < r)) {
        
        pC[i][j] = 1;
      }
    }
  }
}

function arrayMin(r) {
  let proba1 = []
  for (let i = 0; i < r; i++) {
    proba1.push(0);
  }
  for (let i = 0; i < r; i++) {
    p2.push(proba1);
  }
}

function arrayP(r) {
  let probaQ = []
  for (let i = 0; i < r; i++) {
    probaQ.push(0);
  }
  for (let i = 0; i < r; i++) {
    p.push(probaQ);

  }
  
}
//Строим лабиринт
do {
  //Строим главную тропу лабиринта, которая ведет к выходу
  t = -1;
  for (let u = 0; u < 4; u++) {
    xx = xW + nX[u];
    yy = yW + nY[u];
    console.log(xx)
    if (p2[yy][xx] === 0) {
      if (xx === xE && yy === yE) {
        exit = 1;
      } //else {
        findWay(xx, yy, u, xE, yE); //Смотрим есть ли проход
     // }
    }
  }
  //if (exit === 0) {
    t = Math.random(t);
    t = pW[t];
    pC[nY[t] + 2 * yW][nX[t] + 2 * xW] = 1;
    xW = xW + nX[t];
    yW = yW + nY[t];
    pC[2 * yW][2 * xW] = 1;
    p2[yW][xW] = 1;
  //}
} while (exit === 1);

function findWay(xS, yS, u, xE, yE) {
  //Определяем есть ли проход
  x.push(xS);
  y.push(yS);
  //arrayP((rost - 1) / 2);
  p = p2
  do {
    //повторяем пока не закончиться места для проверки
    k = 0;
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < 4; j++) {
        let xx = x[i] + nX[j];
        let yy = y[i] + nY[j];
        if (p[yy][xx] === 0) {
          x1.push(xx);
          y1.push(yy);
          p[yy][xx] = 1;
          k++;
        }
      }
    }
    x.lenght = 0;
    y.lenght = 0;
    x = x1;
    y = y1;
  } while (k === 0 || p[yE][xE] === 1);
  if (p[yE][xE] === 1) {
    //Если когда закончилось место, мы дошли до выхода, сообщяем об этом
    t++;
    pW.push(u);
  }
}
//Отрисовываем на экран
for (let i = 0; i < rost; i++) {
  for (let j = 0; j < rost; j++) {
    if (pC[i][j] === 1) {
      ctx.strokeStyle = "#000000";
      ctx.clearRect(j * 10, i * 10, 10, 10);
    }
  }
}
