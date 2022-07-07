import './App.css';
import {useEffect, useState} from "react";
import NewContact from "./components/NewContact";
import axios from "axios";

function App() {

    //https://62c6729074e1381c0a5f4b52.mockapi.io/contacts/users

    const [contact, setContact] = useState([])

    const [error, setError] = useState('')
    const [nameError, setNameError] = useState('')
    const [surnameError, setSurnameError] = useState('')
    const [phoneError, setPhoneError] = useState('')

    const [user, setUser] = useState({
        name: '',
        surname: '',
        phone: '',
    })

    const handleChang = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const addContacts = () => {
        // if (user.name.trim() && user.surname.trim() && user.phone.trim()) {
        if (user.name.length <= 3) {
            setNameError('Заполните поле!')
            setError('')
        } else if (user.surname.length <= 3) {
            setSurnameError('Заполните поле!')
            setError('')
        } else if (user.phone.length <= 3) {
            setPhoneError('Заполните поле!')
            setError('')
        } else {
            const foundContact = contact.some(el => {
                return el.name === user.name && el.phone === user.phone && el.surname === user.surname
            })
            if (foundContact) {
                setUser({
                    name: '',
                    surname: '',
                    phone: '',
                })
                setError('Такой контакт уже существует!!!')
                setNameError('')
                setSurnameError('')
                setPhoneError('')
            } else {
                // const newContact = {
                //     id: contact.length ? contact[contact.length - 1].id + 1 : 1,
                //     ...user
                // }
                //
                // setContact([...contact, newContact])

                axios.post(`https://62c6729074e1381c0a5f4b52.mockapi.io/contacts/users`, {
                    // id: contact.length ? contact[contact.length - 1].id + 1 : 1,
                    ...user
                })
                    .then(({data}) => {
                        setContact([...contact, data])
                    })

                setUser({
                    name: '',
                    surname: '',
                    phone: '',
                })

                setError('')
                setNameError('')
                setSurnameError('')
                setPhoneError('')
            }
        }
    }


    const updateContact = (id, user) => {
        // setContact(state => state.map(el => {
        //     return el.id === id ? {...el, ...user} : el
        // }))

        axios.put(`https://62c6729074e1381c0a5f4b52.mockapi.io/contacts/users/${id}`, {
            ...user
        })
            .then(({data}) => {
                setContact(state => state.map(el => el.id === id ? data : el))
                console.log(data)
            })
    }

    const deleteContacts = (id) => {
        setContact(state => state.filter(el => el.id !== id))
        axios.delete(`https://62c6729074e1381c0a5f4b52.mockapi.io/contacts/users/${id}`)
            .then(({data}) => {
                console.log(data)
            })
    }

    const getTodo = async () => {
        const url = await axios(`https://62c6729074e1381c0a5f4b52.mockapi.io/contacts/users`)
        const {data} = await url
        setContact(data)
        return;
    }

    useEffect(() => {
        getTodo()
    }, [])

    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <div className={'title'}>
                        <h1 className={'theme'}>Контакты</h1>
                    </div>
                    <div>
                        <div className="contacts__add">
                            <div>
                                <div className={'input'}>
                                    <input type="text"
                                           onChange={handleChang}
                                           name='name'
                                           value={user.name}
                                           placeholder={'Имя'}
                                           className={'input-text'}/>
                                </div>
                                <span className={'error'}>
                                       {nameError}
                                 </span>
                            </div>

                            <div>
                                <div className={'input'}>
                                    <input type="text"
                                           onChange={handleChang}
                                           name='surname'
                                           value={user.surname}
                                           placeholder={'Фамилия'}
                                           className={'input-text'}/>
                                </div>
                                <span className={'error'}>
                                       {surnameError}
                                 </span>
                            </div>
                            <div>
                                <div className={'input'}>
                                    <input type="number"
                                           onChange={handleChang}
                                           value={user.phone}
                                           name='phone'
                                           placeholder={'Телефон'}
                                           className={'input-text'}/>
                                </div>
                                <span className={'error'}>
                                       {phoneError}
                            </span>
                            </div>
                            <button className={'btn'}
                                    onClick={addContacts}>
                                Добавить
                            </button>
                        </div>
                        <span className={'error sush-error'}>
                            {error}
                        </span>
                    </div>

                    <hr/>
                    <div className="">
                        <h3 className={'add_title'}>Добавленные контакты</h3>
                        <hr/>
                        <ul className={'contacts-ul'}>
                            {
                                contact.map(el => <NewContact
                                    el={el}
                                    key={el.id}
                                    deleteContacts={deleteContacts}
                                    updateContact={updateContact}
                                />)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
