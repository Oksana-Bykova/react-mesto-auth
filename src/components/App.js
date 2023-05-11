import React from "react";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import { PopupWithForm } from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.jsx";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { EditProfilePopup } from "./EditProfilePopup.js";
import { EditAvatarPopup } from "./EditAvatarPopup.js";
import { AddPlacePopup } from "./AddPlacePopup.js";

function App() {
  //стейт переменные для открытия попапов, когда в них попадает тру(при нажатии на кнопку открытия попапа в компоненте Main - состояние isOpen тоже менятся на тру и попапу присваивается класс popup_opened)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  //стейт переменная для полноразмерной картинки при клике
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = React.useState(false);

  //стейт переменная для информации о текущем пользователе
  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  // 3 функцйии - обработчика для событий клика на кнопки -открытия попапов
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  //обработчик клика по крестику в попапе
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPhotoPopupOpen(false);
  }

  React.useEffect(() => {
    Promise.all([
      api
      .getProfileInformation(),
      api
      .getInitialCards()
    ])
    
      .then((data) => {
        setCurrentUser(data[0]);
        setCards(data[1]);
      })
      .catch((err) => console.log(err));

  
  }, []);

    

  //лайки для карточки
  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((item) => item._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((data) => {
      setCards((state) => state.map((c) => (c._id === card._id ? data : c)));
    })
    .catch((err) => console.log(err));
  }

  //удаление карточек
  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then((data) => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
    
    .catch((err) => console.log(err));
  }

  //обработка формы редактирования профиля
  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      
      .catch((err) => console.log(err));
    
  }

  //обработка формы изменения аватара
  function handleUpdateAvatar(data) {
    api
      .editPhotoProfile(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
    
  }

  //обработка формы добавления новой карточки
  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
    
  }


  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <div className="page">
            <Header />
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={setSelectedCard}
              hendler={setIsPhotoPopupOpen}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
            <Footer />
          </div>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            buttonName="Создать"
            onAddPlace={handleAddPlaceSubmit}
          />

          {/*Попап подтверждения удаления карточки*/}
          <PopupWithForm name="delete-card" title="Вы уверены?"></PopupWithForm>

          <ImagePopup
            name="photo-viewing"
            card={selectedCard}
            isOpen={isPhotoPopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
