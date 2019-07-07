
function $(selector) {
  var elements;
  if(selector instanceof HTMLElement){
    elements = [selector];
  }else{
    // something except HTMLElement(string, etc.)
    elements = document.querySelectorAll(selector);
    //console.log(elements);
  }


  return new jsPopup(elements);
}


function jsPopup(elements) {

  this.elements = elements;
  var s = this;

  this.on = function (ev, func) {
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].addEventListener(ev, func);
    }
    return this;
  };

  this.html = function (some_text) {
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].innerHTML = some_text;
    }
    return this;
  };

  this.open = function (item) {

    /*Создаем элементы DOM-дерева*/
    var overlay = document.createElement('div');
    var popup = document.createElement('div');
    var popup_window = document.querySelector('#popup-window');
    var btn = document.querySelector('.win_open');



    /*Добавляем классы элементам*/
    overlay.classList.add('overlay');
    popup.classList.add('popup');

    /*Размещаем элементы в блоке или на странице*/
    popup_window.appendChild(overlay);
    popup_window.appendChild(popup);
    var im = item;

      btn.style.opacity = 0;
      overlay.style.opacity = 1;
      popup.style.opacity = 1;
      overlay.classList.add('show');
      popup.classList.add('show');
      btn.classList.add('show');
      popup.innerHTML = im;
      btn.style.transition = 'opacity 2s';


    overlay.addEventListener('click', function () {
      overlay.style.opacity = 0;
      popup.style.opacity = 0;
      setTimeout(function(){
      overlay.classList.remove('show');
      popup.classList.remove('show');
      btn.style.opacity = 1;
      overlay.remove();
      popup.remove();
      },700);



    });
  };

  this.fade = function (time, callback) {

    var func = callback || function (){};
    for (var i = 0; i < elements.length; i++) {
      techFade(elements[i], time, 50, callback);
    }
    return this;
  };

  function techFade(elem, t, f, callback){
    // кадров в секунду (по умолчанию 50)
    var fps = f || 50;
    // время работы анимации (по умолчанию 500мс)
    var time = t || 500;
    // сколько всего покажем кадров
    var steps = time / (1000 / fps);
    // текущее значение opacity - изначально 0
    var op = 1;
    // изменение прозрачности за 1 кадр
    var d0 = op / steps;

    // устанавливаем интервал (1000 / fps)
    // например, 50fps -> 1000 / 50 = 20мс
    var timer = setInterval(function(){
      // уменьшаем текущее значение opacity
      op -= d0;
      // устанавливаем opacity элементу DOM
      elem.style.opacity = op;
      // уменьшаем количество оставшихся шагов анимации
      steps--;

      // если анимация окончена
      if(steps == 0){
        // убираем интервал выполнения
        clearInterval(timer);
        // и убираем элемент из потока документа
        elem.style.display = 'none';
        callback();
      }
    }, (1000 / fps));
  }
  this.addClassToArray = function (cls) {
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(cls);
    }
  };

  this.addClass= function (cls) {
    this.elements[0].classList.add(cls);
  };


}