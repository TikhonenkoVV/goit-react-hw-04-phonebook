import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './Contact-form/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './Contact-list/ContactList';
import { Container, TitleMajor, TitleMinor } from './App.styled';

const initialContacts = [
    { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
    { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
    { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
    { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
    state = {
        contacts: initialContacts,
        filter: '',
    };

    onFormSubmit = data => {
        const isNameExist = this.state.contacts.find(
            value => value.name.toLowerCase() === data.name.toLowerCase()
        );
        const isNumberExist = this.state.contacts.find(
            value => value.number === data.number
        );
        if (isNameExist) {
            alert(`${data.name} is already in contacts.`);
            return;
        }
        if (isNumberExist) {
            alert(
                `${data.number} is already in contacts as ${isNumberExist.name}.`
            );
            return;
        }
        this.setState(prevState => ({
            contacts: [...prevState.contacts, { ...data, id: nanoid() }],
        }));
    };

    getFilteredContacts = () => {
        const { contacts, filter } = this.state;
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter)
        );
    };

    changeFilter = e => {
        this.setState({ filter: e.target.value });
    };

    deleteContact = contactId => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(
                contact => contact.id !== contactId
            ),
        }));
    };

    render() {
        const { filter } = this.state;
        return (
            <Container>
                <TitleMajor>Phonebook</TitleMajor>
                <ContactForm onSubmit={this.onFormSubmit} />

                <TitleMinor>Contacts</TitleMinor>
                <Filter value={filter} onFilter={this.changeFilter} />
                <ContactList
                    list={this.getFilteredContacts()}
                    delContact={this.deleteContact}
                />
            </Container>
        );
    }
}
