/* eslint-disable react/display-name */
import Image from 'next/image';
import React from 'react';

import editIcon from '../../assets/icons/Edit.svg';
import removeIcon from '../../assets/icons/Trash.svg';
import { AvatarGen } from '../AvatarGen';

export const CustomersItem = (props) => {
  const handleEdit = () => {
    props.setCustomerData(props.customer);
  };

  return (
    <div className='flex w-full mb-[12px]'>
      <div className='flex gap-[8px] min-w-[307px]'>
        <span className='w-[32px] h-[32px]'>
          <AvatarGen value={props.customer.email} />
        </span>
        <p className='flex justify-center items-center capitalize font-inter text-[16px] text-[#0F172A] font-semibold'>
          {`${props.customer.firstName} ${props.customer.lastName}`}
        </p>
      </div>
      <div className='capitalize min-w-[307px] flex items-center font-semibold'>
        {props.customer.company}
      </div>
      <div className=' min-w-[307px] flex items-center font-semibold'>
        {props.customer.email}
      </div>
      <div className='flex items-center justify-center mr-[30px] w-[49px]'>
        <div
          className={`w-full h-[24px] rounded-[4px] ${
            props.customer.customerRole === 'administrator'
              ? 'bg-[#0EA5E9]'
              : 'bg-[#E2E8F0]'
          }`}
        />
      </div>
      <div className='w-[58px] flex items-center justify-between'>
        <span
          className='w-[24px] h-[24px] cursor-pointer'
          onClick={() => handleEdit(props.customer)}
        >
          <Image src={editIcon} alt='icon does not exist' />
        </span>
        <span
          className='w-[24px] h-[24px] cursor-pointer'
          onClick={() => props.deleteCustomer(props.customer.id)}
        >
          <Image src={removeIcon} alt='icon does not exist' />
        </span>
      </div>
    </div>
  );
};
