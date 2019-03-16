/* Попап */
var link = document.querySelector(".map-btn");
	var popup = document.querySelector(".popup-form-container");
    var close = document.querySelector(".close-cross");
    var form = popup.querySelector("form");
    var login = popup.querySelector("[name = name]");
    var email = popup.querySelector("[name=email]");
    
    var isStorageSupport = true;
  var storage = "";
  
  try {
    storage = localStorage.getItem("login");
  } catch (err) {
    isStorageSupport = false;
  }
    
	link.addEventListener("click", function(evt){
		evt.preventDefault();
		popup.classList.add("show");
        
       if (storage) {
      login.value = storage;
      email.focus();
    } else {
      login.focus();
    }
	});
    
    close.addEventListener("click", function(evt){
		evt.preventDefault();
        popup.classList.remove("show");
        popup.classList.remove("modal-error");
    });
    
     form.addEventListener("submit", function (evt) {
    if (!login.value || !email.value) {
      evt.preventDefault();
      popup.classList.remove("modal-error");
      popup.offsetWidth = popup.offsetWidth;
      popup.classList.add("modal-error");
         } else {
      if (isStorageSupport) {
        localStorage.setItem("login", login.value);
      }
    }
  });
    
     window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (popup.classList.contains("show")) {
        popup.classList.remove("show");
        popup.classList.remove("modal-error");
      }
    }
  });

/* Карта */

/*var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [59.938639738117445, 30.32306045998567], // Москва
        zoom: 17
    }, {
        searchControlProvider: 'yandex#search'
    });

}*/
ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [59.93913800574294,30.321521561386636],
            zoom: 17
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

    

        myPlacemarkWithContent = new ymaps.Placemark([59.93874546240775,30.323177881614683], {
        
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: '../img/map-marker.png',
            // Размеры метки.
            iconImageSize: [231, 190],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-54, -193],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        });

    myMap.geoObjects
        .add(myPlacemarkWithContent);
});
