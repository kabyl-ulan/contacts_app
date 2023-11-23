import React, { useEffect, useState } from "react";

//local
import NewContact from "./NewContact";
import { PUBLIC_API } from "../api";
import Plus from "./Plus";
import Modal from "./ui/Modal";
import AddContact from "./AddContact";

function Contacts() {
  const [contact, setContact] = useState([]);
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  const getTodo = async () => {
    const { data } = await PUBLIC_API.get("contacts/users");
    setContact(data);
    return;
  };

  const updateContact = async (id, user) => {
    await PUBLIC_API.put(`contacts/users/${id}`, { ...user }).then(
      ({ data }) => {
        setContact((state) => state.map((el) => (el.id === id ? data : el)));
      }
    );
  };

  const deleteContacts = async (id) => {
    setContact((state) => state.filter((el) => el.id !== id));
    await PUBLIC_API.delete(`contacts/users/${id}`);
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <ul className="contacts-ul">
            {contact.map((el) => (
              <NewContact
                el={el}
                key={el.id}
                deleteContacts={deleteContacts}
                updateContact={updateContact}
              />
            ))}
          </ul>
        </div>
      </section>
      <Plus handleClick={handleClick} />
      <Modal
        isOpen={isOpen}
        handleClick={handleClick}
        children={<AddContact />}
      />
    </>
  );
}

export default Contacts;
