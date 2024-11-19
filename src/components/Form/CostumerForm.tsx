import React, {useState} from 'react'
import axios from 'axios';

interface FormData {
  personName: string;
  personLastName: string;
  email: string;
  dateOfBirth: string; // You can also use Date if you plan to handle it as a Date object
  personDocumentType: string;
  personDocumentNumber: string;
  personPhoneNumber: string;
  personObservation?: string; // Optional field
  publicPlace: string;
  neighborhood: string;
  cep: string; // If the postal code could contain leading zeros
  cityId: number;
  stateId: number; // Assuming stateId is a number
}

const CostumerForm: React.FC = () => {
const [responseMessage,setResponseMessage] = useState<String>('');

  const[formData, setFormData] = useState<FormData>({
    personName: '',
    personLastName: '',
    email: '',
    dateOfBirth: '', 
    personDocumentType: '',
    personDocumentNumber: '',
    personPhoneNumber: '',
    personObservation: '', 
    publicPlace: '',
    neighborhood: '',
    cep: '',
    cityId: 0,
    stateId: 0,   
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value } = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault();
   
    const config: {
      headers: {
        'Content-Type': string;
        'Authorization': string;
      };
    } = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin'), // Basic Authentication
      },
    };

    try{
      console.log(formData)
      const response = await axios.post('http://localhost:8080/customers/register',{formData}, config);
      setResponseMessage(`City added successfully: ${JSON.stringify(response.data)}`);
    }catch(error){
         // Narrow the error type
          if (axios.isAxiosError(error)) {
            // Handle Axios errors
            setResponseMessage(`Error adding city: ${error.response?.data?.message || error.message}`);
          } else if (error instanceof Error) {
            // Handle generic errors
            setResponseMessage(`Error adding city: ${error.message}`);
          } else {
            // Fallback for unknown error types
            setResponseMessage('An unknown error occurred.');
          }      

          console.log(setResponseMessage);
  }
};
  return (
    <div className="min-h-screen text-gray-800">

      <main className="p-6">
        <form onSubmit={handleSubmit} className='mx-auto flex flex-col
        items-center justify-center 
        p-2 w-max  mx-aut
        bg-white rounded-md gap-2
        shadow-lg border border-black/10'>
          <input
            type="text"
            name="personName"
            value={formData.personName}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="personLastName"
            value={formData.personLastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <input
            type="text"
            name="personDocumentType"
            value={formData.personDocumentType}
            onChange={handleChange}
            placeholder="Document Type"
          />
          <input
            type="text"
            name="personDocumentNumber"
            value={formData.personDocumentNumber}
            onChange={handleChange}
            placeholder="Document Number"
          />
          <input
            type="text"
            name="personPhoneNumber"
            value={formData.personPhoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <input
            type='text'
            name="personObservation"
            value={formData.personObservation}
            onChange={handleChange}
            placeholder="Observations"
          />
          <input
            type="text"
            name="publicPlace"
            value={formData.publicPlace}
            onChange={handleChange}
            placeholder="Public Place"
          />
          <input
            type="text"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            placeholder="Neighborhood"
          />
          <input
            type="text"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            placeholder="Postal Code"
          />
          <input
            type="number"
            name="cityId"
            value={formData.cityId}
            onChange={handleChange}
            placeholder="City ID"
          />
          <input
            type="number"
            name="stateId"
            value={formData.stateId}
            onChange={handleChange}
            placeholder="State ID"
          />
          
          <button type="submit">Submit</button>
      </form>
      
    </main>
  </div>
  
  )
}

export default CostumerForm
 