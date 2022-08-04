import { useState, useEffect } from 'react';
import { Customers } from '../src/components/Customers';
import { Form } from '../src/components/Form';

export default function Home() {
  const [mockCustomersData, setMockCustomersData] = useState([]);
  const [customerData, setCustomerData] = useState();

  const deleteCustomer = (id) => {
    setMockCustomersData((prevData) =>
      prevData.filter((customer) => customer.id !== id)
    );
  };

  return (
    <div className='flex'>
      <Form
        setMockCustomersData={setMockCustomersData}
        mockCustomersData={mockCustomersData}
        customerData={customerData}
        setCustomerData={setCustomerData}
      />
      <Customers
        mockCustomersData={mockCustomersData}
        deleteCustomer={deleteCustomer}
        setCustomerData={setCustomerData}
      />
    </div>
  );
}
