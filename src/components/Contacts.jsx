import React, { useEffect, useState } from "react";

//local
import { PUBLIC_API } from "../api";
import Modal from "./ui/Modal";
import Plus from "./Plus";
import NewContact from "./NewContact";
import RequestContact from "./RequestContact";

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

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <ul className="contacts">
            {contact.map((el) => (
              <NewContact el={el} key={el.id} setContact={setContact} />
            ))}
          </ul>
        </div>
      </section>
      <Plus handleClick={handleClick} />
      <Modal
        isOpen={isOpen}
        handleClick={handleClick}
        children={<RequestContact setContact={setContact} setOpen={setOpen} />}
      />
    </>
  );
}

export default Contacts;
