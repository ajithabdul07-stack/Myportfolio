import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, Info } from 'lucide-react';

export default function PatientManagement() {
  const [patients, setPatients] = useState([
    { id: 1, name: 'Ajith Kumar', type: 'inpatient', age: 45, disease: 'Hypertension', room: '101', bill: 5000, date: '2024-01-15' },
    { id: 2, name: 'Vidhya', type: 'outpatient', age: 32, disease: 'Flu', room: 'N/A', bill: 500, date: '2024-01-16' },
    { id: 3, name: 'Yogalakshmi', type: 'inpatient', age: 58, disease: 'Diabetes', room: '205', bill: 8500, date: '2024-01-14' },
  ]);
  
  const [selectedTab, setSelectedTab] = useState('inpatient');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'inpatient',
    age: '',
    disease: '',
    room: '',
    bill: '',
    date: new Date().toISOString().split('T')[0]
  });

  const filteredPatients = patients.filter(p => p.type === selectedTab);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'bill' ? (value ? parseInt(value) : '') : value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'inpatient',
      age: '',
      disease: '',
      room: '',
      bill: '',
      date: new Date().toISOString().split('T')[0]
    });
    setEditingId(null);
  };

  const handleAddPatient = () => {
    if (!formData.name || !formData.age || !formData.disease || !formData.bill) {
      alert('Please fill all required fields');
      return;
    }

    if (formData.type === 'inpatient' && !formData.room) {
      alert('Room number is required for inpatients');
      return;
    }

    if (editingId) {
      setPatients(patients.map(p =>
        p.id === editingId ? { ...formData, id: editingId } : p
      ));
    } else {
      const newPatient = {
        ...formData,
        id: Math.max(...patients.map(p => p.id), 0) + 1
      };
      setPatients([...patients, newPatient]);
    }

    resetForm();
    setShowForm(false);
  };

  const handleEdit = (patient) => {
    setFormData(patient);
    setEditingId(patient.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  const openNewForm = () => {
    resetForm();
    setShowForm(true);
  };

  const totalBill = filteredPatients.reduce((sum, p) => sum + p.bill, 0);
  const totalPatients = filteredPatients.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">

      <header className="sticky top-0 z-40 bg-white shadow-lg border-b-4 border-green-500">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl">+</span>
            </div>
            <h1 className="text-3xl font-bold text-green-600">Hospital Management</h1>
          </div>
          
          <button
            onClick={() => setShowAbout(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition"
          >
            <Info size={20} />
            <span className="hidden sm:inline">About</span>
          </button>
        </div>
      </header>

    
      {showAbout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 border-2 border-green-300">
            <h2 className="text-3xl font-bold text-green-600 mb-6">About MediCare</h2>
            
            <div className="space-y-5 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg text-green-600 mb-2">Project Description</h3>
                <p className="text-sm leading-relaxed">A comprehensive patient management system for hospitals supporting both inpatient and outpatient records with full CRUD operations.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-green-600 mb-2">Technologies Used</h3>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li><strong>Django:</strong> UI framework</li>
                  <li><strong>Tailwind CSS:</strong> Styling</li>
                  <li><strong>Lucide React:</strong> Icons</li>
                  <li><strong>Mysqlite:</strong>Database</li>
                  <li><strong>CRUD Operations:</strong> Create, Read, Update, Delete</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-green-600 mb-2">Features</h3>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Inpatient & Outpatient tabs</li>
                  <li>Add new patient records</li>
                  <li>Edit existing patient details</li>
                  <li>Delete patient records</li>
                  <li>Manage medical bills</li>
                  <li>View statistics & totals</li>
                  <li>Room management for inpatients</li>
                  <li>Date tracking</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowAbout(false)}
              className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
  
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedTab('inpatient')}
            className={`px-8 py-3 rounded-lg font-bold text-lg transition ${
              selectedTab === 'inpatient'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-green-600 border-2 border-green-200 hover:border-green-600'
            }`}
          >
            Inpatients
          </button>
          <button
            onClick={() => setSelectedTab('outpatient')}
            className={`px-8 py-3 rounded-lg font-bold text-lg transition ${
              selectedTab === 'outpatient'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-green-600 border-2 border-green-200 hover:border-green-600'
            }`}
          >
            Outpatients
          </button>
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg border-2 border-green-200 p-6">
            <p className="text-gray-600 font-semibold mb-2">Total Patients</p>
            <p className="text-4xl font-bold text-green-600">{totalPatients}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg border-2 border-green-200 p-6">
            <p className="text-gray-600 font-semibold mb-2">Total Bills</p>
            <p className="text-4xl font-bold text-green-600">₹{totalBill.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg border-2 border-green-200 p-6">
            <p className="text-gray-600 font-semibold mb-2">Average Bill</p>
            <p className="text-4xl font-bold text-green-600">₹{totalPatients > 0 ? Math.round(totalBill / totalPatients).toLocaleString() : 0}</p>
          </div>
        </div>

   
        <div className="mb-8">
          <button
            onClick={openNewForm}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-bold transition shadow-lg"
          >
            <Plus size={24} />
            Add New Patient
          </button>
        </div>

 
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 border-2 border-green-300 my-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-green-600">
                  {editingId ? 'Edit Patient' : 'Add New Patient'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-green-600 transition"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-600"
                      placeholder="Enter patient name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Type *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-600"
                    >
                      <option value="inpatient">Inpatient</option>
                      <option value="outpatient">Outpatient</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-600"
                      placeholder="Enter age"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Disease *</label>
                    <input
                      type="text"
                      name="disease"
                      value={formData.disease}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-600"
                      placeholder="Enter disease/condition"
                    />
                  </div>

                  {formData.type === 'inpatient' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Room Number *</label>
                      <input
                        type="text"
                        name="room"
                        value={formData.room}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-600"
                        placeholder="Enter room number"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bill Amount *</label>
                    <input
                      type="number"
                      name="bill"
                      value={formData.bill}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-600"
                      placeholder="Enter bill amount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-600"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleAddPatient}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    {editingId ? 'Update Patient' : 'Add Patient'}
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-bold transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg border-2 border-green-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="px-6 py-4 text-left font-bold">Name</th>
                  <th className="px-6 py-4 text-left font-bold">Age</th>
                  <th className="px-6 py-4 text-left font-bold">Disease</th>
                  {selectedTab === 'inpatient' && <th className="px-6 py-4 text-left font-bold">Room</th>}
                  <th className="px-6 py-4 text-left font-bold">Bill (₹)</th>
                  <th className="px-6 py-4 text-left font-bold">Date</th>
                  <th className="px-6 py-4 text-left font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500 font-semibold">
                      No patients found
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient, idx) => (
                    <tr key={patient.id} className={`border-t-2 border-green-100 ${idx % 2 === 0 ? 'bg-green-50' : 'bg-white'} hover:bg-green-100 transition`}>
                      <td className="px-6 py-4 font-semibold text-gray-800">{patient.name}</td>
                      <td className="px-6 py-4 text-gray-700">{patient.age}</td>
                      <td className="px-6 py-4 text-gray-700">{patient.disease}</td>
                      {selectedTab === 'inpatient' && <td className="px-6 py-4 text-gray-700 font-semibold">{patient.room}</td>}
                      <td className="px-6 py-4 font-bold text-green-600">₹{patient.bill.toLocaleString()}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{new Date(patient.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 flex gap-3">
                        <button
                          onClick={() => handleEdit(patient)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(patient.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}