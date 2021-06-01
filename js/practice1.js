'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const promoAdv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list');



    // УДАЛЯЕМ БЛОК С РЕКЛАМОЙ
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };
    deleteAdv(promoAdv);

    // ИЗМЕНЯЕМ ЖАНР ГЛАВНОГО ФИЛЬМА С КОМЕДИЯ НА ДРАМА
    // + МЕНЯЕМ СРАЗУ И ФОНОВОЕ ИЗОБРАЖЕНИЕ

    const makeChanges = () => {
        genre.textContent = 'Драма';
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };
    makeChanges();

    // ФОРМИРУЕМ СПИСОК ФИЛЬМОВ НА САЙТЕ ИЗ ДАННЫХ ОБЬЕКТА 
    // СОРТИРУЕМ ПО АЛЬФАВИТУ
    const sortArr = (arr) => {
        arr.sort();
    };
    sortArr(movieDB.movies);

    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
          <li class="promo__interactive-item">${i + 1} ${film}
            <div class="delete"></div>
          </li>
            `;
    });
// УДАЛЯЕМ ПО КЛИКУ КОРЗИНКИ ФИЛЬМ 
    document.querySelectorAll('.delete').forEach((btn, i) => {
        btn.addEventListener('click', () => {
             btn.parentElement.remove();
            movieDB.movies.splice(i, 1);
            createMovieList(films, parent);
         });
     });
    }
    createMovieList(movieDB.movies, movieList);

    // ДОБАВЛЯЕМ НОВЫЙ ФИЛЬМ ПОСЛЕ НАЖАТИЯ КНОПКИ
    const addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');
    // ДОБАВЛЯЕМ НОВЫЙ ФИЛЬМ ПОСЛЕ НАЖАТИЯ КНОПКИ
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let newFilm = addInput.value;
        const favorite = checkbox.checked;
// ПРОВЕРЯЕМ ЧТОБЫ НЕ БЫЛО ПУСТОЙ СТРОКИ 
        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            };

            if (favorite) {
                console.log("Добавляем любимый фильм");
            };

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            createMovieList(movieDB.movies, movieList);
        };
        event.target.reset();
    });


// END OF DEFAULT
});