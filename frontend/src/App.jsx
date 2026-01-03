import { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleContactAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Contact Management App
        </h1>

        <div className="space-y-8">
          <ContactForm onContactAdded={handleContactAdded} />
          <ContactList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}

export default App;
