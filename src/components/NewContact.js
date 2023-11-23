import React, { useState } from "react";

import ModalWindow from "./ModalWindow";
const NewContact = ({ el, deleteContacts, updateContact }) => {
  const { name, surname, phone, id } = el;

  const newName =
    name.length > 0 ? name[0].toUpperCase() + name.slice(1) : name;
  const newSurname =
    surname.length > 0 ? surname[0].toUpperCase() + surname.slice(1) : surname;

  const [click, setClick] = useState(false);

  const clickChang = () => {
    setClick(!click);
  };

  const clickExit = () => {
    setClick(false);
  };

  const initial =
    name.length > 0 && surname.length > 0
      ? name[0].toUpperCase() + surname[0].toUpperCase()
      : "";

  return (
    <li className="contacts-li">
      <div className="newcontacts">
        <div className="con-item">
          <div
            className="circle"
            style={{
              background: `white`,
            }}
          >
            <span className="initial">{initial}</span>
          </div>
          <div className="user">
            <div className="user-name">{newName}</div>
            <div className="user-surname">{newSurname}</div>
            <a href={`tel:${phone}`} className="user-phone">
              <span className="tel">тел: </span>
              {phone}
            </a>
          </div>
        </div>
        <div className="buttons">
          <button className="btn-update" onClick={clickChang}>
            {!click ? "Изменить" : "Закрыть"}
          </button>
          <button className="btn-delete" onClick={() => deleteContacts(id)}>
            Удалить
          </button>
        </div>
      </div>
      <ModalWindow
        click={click}
        clickExit={clickExit}
        updateContact={updateContact}
        el={el}
      />
    </li>
  );
};

export default NewContact;
