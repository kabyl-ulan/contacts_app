import React, { useState } from "react";

//local
import { PUBLIC_API } from "../api";
import Modal from "./ui/Modal";
import RequestContact from "./RequestContact";

const NewContact = ({ el, setContact }) => {
  const { name, surname, phone, id } = el;

  const newName =
    name.length > 0 ? name[0].toUpperCase() + name.slice(1) : name;
  const newSurname =
    surname.length > 0 ? surname[0].toUpperCase() + surname.slice(1) : surname;

  const [isOpen, setOpen] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  const deleteContacts = async (id) => {
    try {
      setLoading(true);
      await PUBLIC_API.delete(`contacts/users/${id}`);
      setContact((state) => state.filter((el) => el.id !== id));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  const initial =
    name.length > 0 && surname.length > 0
      ? name[0].toUpperCase() + surname[0].toUpperCase()
      : "";

  return (
    <li>
      <div className="con-item">
        <div className="circle">
          <span>{initial}</span>
        </div>
        <div className="user">
          <div className="user--name">{newName}</div>
          <div className="user--surname">{newSurname}</div>
          <a href={`tel:${phone}`} className="user--phone">
            <span>тел: </span>
            {phone}
          </a>
        </div>
      </div>
      <div className="buttons">
        <button
          className="buttons__update"
          disabled={isLoading}
          onClick={handleClick}
        >
          Изменить
        </button>
        <button
          className="buttons__delete"
          disabled={isLoading}
          onClick={() => deleteContacts(id)}
        >
          {!!isLoading ? "Удаление..." : "Удалить"}
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        handleClick={handleClick}
        children={
          <RequestContact setContact={setContact} setOpen={setOpen} el={el} />
        }
      />
    </li>
  );
};

export default NewContact;
