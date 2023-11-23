import React, { useState } from "react";

//local
import { PUBLIC_API } from "../api";
import Input from "./ui/Input";

function AddContact({ setContact, contact }) {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    phone: "",
  });

  const handleChang = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addContacts = async (e) => {
    e.preventDefault();
    const { data } = await PUBLIC_API.post("contacts/users", { ...user });
    setContact([...contact, data]);
    setUser({ name: "", surname: "", phone: "" });
  };

  return (
    <form onSubmit={addContacts} className="contacts__add">
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
      <button type="submit" className="btn">
        Добавить
      </button>
    </form>
  );
}

export default AddContact;
