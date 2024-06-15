import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    Id: '',
    County: '',
    City: '',
    Postal_Code: '',
    Model_Year: '',
    Make: '',
    Model: '',
    Electric_Range: '',
    Logislative_District: '',
    DOL_Vehicle_ID: '',
    Census_Tract_2020: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/api/upload', formData)
      .then(response => {
        console.log('Form data submitted successfully:', response.data);
      })
      .catch(error => {
        console.error('There was an error submitting the form:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto' }}>
      <div>
        <label>Id:</label>
        <input type="text" name="Id" value={formData.Id} onChange={handleChange} required />
      </div>
      <div>
        <label>County:</label>
        <input type="text" name="County" value={formData.County} onChange={handleChange} required />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="City" value={formData.City} onChange={handleChange} required />
      </div>
      <div>
        <label>Postal Code:</label>
        <input type="number" name="Postal_Code" value={formData.Postal_Code} onChange={handleChange} required />
      </div>
      <div>
        <label>Model Year:</label>
        <input type="date" name="Model_Year" value={formData.Model_Year} onChange={handleChange} required />
      </div>
      <div>
        <label>Make:</label>
        <input type="text" name="Make" value={formData.Make} onChange={handleChange} required />
      </div>
      <div>
        <label>Model:</label>
        <input type="text" name="Model" value={formData.Model} onChange={handleChange} required />
      </div>
      <div>
        <label>Electric Range:</label>
        <input type="number" name="Electric_Range" value={formData.Electric_Range} onChange={handleChange} required />
      </div>
      <div>
        <label>Logislative District:</label>
        <input type="number" name="Legislative_District" value={formData.Logislative_District} onChange={handleChange} required />
      </div>
      <div>
        <label>DOL Vehicle ID:</label>
        <input type="number" name="DOL_Vehicle_ID" value={formData.DOL_Vehicle_ID} onChange={handleChange} required />
      </div>
      <div>
        <label>Census Tract 2020:</label>
        <input type="number" name="Census_Tract_2020" value={formData.Census_Tract_2020} onChange={handleChange} required />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default FormComponent;
