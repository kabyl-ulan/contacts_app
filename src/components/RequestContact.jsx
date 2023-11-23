import React, { useState } from "react";

//local
import { PUBLIC_API } from "../api";
import Input from "./ui/Input";

function RequestContact({ setContact, setOpen, el }) {
  const [user, setUser] = useState({
    name: el?.name ? el.name : "",
    surname: el?.surname ? el.surname : "",
    phone: el?.phone ? el.phone : "",
  });

  const [isLoading, setLoading] = useState(false);

  const handleChang = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const clearFunc = () => {
    setUser({ name: "", surname: "", phone: "" });
    setLoading(false);
    setOpen(false);
  };

  const updateContact = async (id) => {
    try {
      const { data } = await PUBLIC_API.put(`contacts/users/${id}`, {
        ...user,
      });
      setContact((state) => state.map((el) => (el.id === id ? data : el)));
      clearFunc();
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  const addContacts = async () => {
    try {
      const { data } = await PUBLIC_API.post("contacts/users", { ...user });
      setContact((prevContacts) => [...prevContacts, data]);
      clearFunc();
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    el ? updateContact(el.id) : addContacts();
  };

  return (
    <form onSubmit={onSubmit} className="contacts__add">
      <Input
        onChange={handleChang}
        name="name"
        value={user.name}
        placeholder="Имя"
        required={true}
      />
      <Input
        onChange={handleChang}
        name="surname"
        value={user.surname}
        placeholder="Фамилия"
        required={true}
      />
      <Input
        type="number"
        onChange={handleChang}
        value={user.phone}
        name="phone"
        placeholder="Телефон"
        required={true}
      />
      <button type="submit" disabled={!!isLoading} className="btn">
        {!!isLoading
          ? el
            ? "Сохранение..."
            : "Добавление..."
          : el
          ? "Сохранить"
          : "Добавить"}
      </button>
    </form>
  );
}

export default RequestContact;
