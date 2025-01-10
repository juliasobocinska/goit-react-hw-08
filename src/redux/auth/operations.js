import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// Ustawienie podstawowego URL dla axiosa
axios.defaults.baseURL = 'https://connections-api.goit.global/';

// Utility do dodania JWT do nagłówków
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility do usunięcia JWT z nagłówków
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Powiadomienia
const showSuccessToast = (message) => toast.success(message);
const showErrorToast = (message) => toast.error(message);

// Rejestracja nowego użytkownika
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/signup', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setAuthHeader(res.data.token);
      showSuccessToast('Successfully registered!');
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Registration failed. Please try again.';
      // Upewnij się, że komunikat jest po angielsku
      if (errorMessage.includes('Email jest już w użyciu')) {
        showErrorToast('Email is already in use');
      } else {
        showErrorToast(errorMessage);
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Logowanie użytkownika
export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/login', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setAuthHeader(res.data.token);
      showSuccessToast('Login successful!');
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please check your credentials.';
      // Upewnij się, że komunikat jest po angielsku
      if (errorMessage.includes('Błędne dane logowania')) {
        showErrorToast('Incorrect login details');
      } else {
        showErrorToast(errorMessage);
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Wylogowanie użytkownika
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
    showSuccessToast('Logged out successfully!');
    return;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Logout failed. Please try again.';
    showErrorToast(errorMessage);  // Upewnij się, że komunikat jest po angielsku
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// Pobieranie informacji o użytkowniku
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      const errorMessage = 'Unable to fetch user: no token found';
      showErrorToast(errorMessage);  // Upewnij się, że komunikat jest po angielsku
      return thunkAPI.rejectWithValue(errorMessage);
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/me');
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to fetch user. Please try again.';
      showErrorToast(errorMessage);  // Upewnij się, że komunikat jest po angielsku
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Pobieranie wszystkich kontaktów
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/contacts');
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to fetch contacts. Please try again.';
      showErrorToast(errorMessage);  // Upewnij się, że komunikat jest po angielsku
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Dodawanie nowego kontaktu
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const res = await axios.post('/contacts', contact, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      showSuccessToast('Contact added successfully!');
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to add contact. Please try again.';
      showErrorToast(errorMessage); 
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Edytowanie kontaktu
export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ contactId, updatedContact }, thunkAPI) => {
    try {
      const res = await axios.patch(`/contacts/${contactId}`, updatedContact, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Pomyślne zakończenie
      showSuccessToast('Contact updated successfully!'); 
      return res.data; 
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update contact. Please try again.';
      
      // Pokazujemy toast w przypadku błędu
      showErrorToast(errorMessage);  
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Usuwanie kontaktu
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      console.log(`Attempting to delete contact with ID: ${contactId}`);

      const res = await axios.delete(`/contacts/${contactId}`);

      console.log('Delete response:', res.data);

      showSuccessToast('Contact deleted successfully!');
      return res.data;
    } catch (error) {
      console.error(
        'Delete contact error:',
        error.response?.data || error.message
      );
      const errorMessage =
        error.response?.data?.message || 'Failed to delete contact. Please try again.';
      showErrorToast(errorMessage);  
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Dodawanie domyślnych kontaktów
export const addDefaultContacts = createAsyncThunk(
  'contacts/addDefaultContacts',
  async (_, thunkAPI) => {
    const defaultContacts = [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];

    try {
      const response = await axios.get('/contacts');
      const existingContacts = response.data;

      // Dodajemy tylko te domyślne kontakty, których jeszcze nie ma
      for (const contact of defaultContacts) {
        const exists = existingContacts.some(
          (existingContact) => existingContact.number === contact.number
        );

        if (!exists) {
          await axios.post('/contacts', contact); 
        }
      }

      showSuccessToast('Default contacts added successfully!');
      return defaultContacts; 
    } catch (e) {
      const errorMessage = e.message || 'Failed to add default contacts. Please try again.';
      showErrorToast(errorMessage);  
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
