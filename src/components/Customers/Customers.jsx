import React from 'react';
import { CustomersItem } from './CustomersItem';

export const Customers = ({
  mockCustomersData,
  deleteCustomer,
  setCustomerData,
}) => {
  return (
    <div className='flex flex-col p-[40px]'>
      <h3 className='capitalize text-TC mb-[40px] font-inter text-[20px] font-bold'>
        customers
      </h3>
      <div className='flex w-full mb-[12px]'>
        <div className=' capitalize font-inter text-[16px] font-medium text-[#94A3B8] min-w-[307px]'>
          name
        </div>
        <div className=' capitalize font-inter text-[16px] font-medium text-[#94A3B8] min-w-[307px]'>
          company
        </div>
        <div className='capitalize font-inter text-[16px] font-medium text-[#94A3B8] min-w-[307px]'>
          email
        </div>
        <div className='capitalize mr-[30px] font-inter text-[16px] font-medium text-[#94A3B8]'>
          admin
        </div>
        <div className='capitalize font-inter text-[16px] font-medium text-[#94A3B8]'>
          actions
        </div>
      </div>
      {mockCustomersData &&
        mockCustomersData.map((customer) => (
          <CustomersItem
            setCustomerData={setCustomerData}
            key={customer.id}
            deleteCustomer={deleteCustomer}
            customer={customer}
          />
        ))}
    </div>
  );
};
