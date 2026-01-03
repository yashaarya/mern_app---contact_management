import { useState, useEffect } from 'react';
import { getContacts } from '../services/api';

const ContactList = ({ refreshTrigger }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, [refreshTrigger]);

  const fetchContacts = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getContacts();
      setContacts(data.contacts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact List</h2>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact List</h2>
        <p className="text-red-500 text-center py-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact List</h2>

      {contacts.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No contacts yet. Add one above!
        </p>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {contact.name}
              </h3>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Email:</span> {contact.email}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Phone:</span> {contact.phone}
              </p>
              {contact.message && (
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Message:</span> {contact.message}
                </p>
              )}
              <p className="text-gray-400 text-sm mt-2">
                Added: {new Date(contact.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
