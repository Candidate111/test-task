import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import eye from '../../assets/icons/Eye.svg';
import eyeOff from '../../assets/icons/EyeOff.svg';
import { useForm } from 'react-hook-form';
import { mailValidator } from '../../utils/mailValidator';

export const Form = ({
  mockCustomersData,
  setMockCustomersData,
  customerData,
  setCustomerData,
}) => {
  const [passIsVisible, setPassIsVisible] = useState(false);
  const [customerRole, setCustomerRole] = useState('user');
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setFocus,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      inpValues: {
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        password: '',
      },
    },
  });

  useEffect(() => {
    if (customerData) {
      setValue(
        'inpValues',
        {
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          company: customerData.company,
          email: customerData.email,
          password: customerData.password,
        },
        {
          shouldValidate: true,
        }
      );
      setCustomerRole(customerData.customerRole);
      setFocus('inpValues.firstName');
    }
  }, [customerData, setValue, setFocus, setError]);

  const handlePassVisibility = () => {
    setPassIsVisible((prevState) => !prevState);
  };

  const handleRole = (e) => {
    e.preventDefault();
    if (e.target.textContent.toLowerCase() === 'user') setCustomerRole('user');
    if (e.target.textContent.toLowerCase() === 'administrator')
      setCustomerRole('administrator');
  };

  const handleForm = ({ inpValues }) => {
    if (customerData) {
      setMockCustomersData(
        mockCustomersData.map((customer) => {
          if (customerData.id === customer.id) {
            return { ...inpValues, id: customerData.id };
          }
          return customer;
        })
      );
      setCustomerData('');
      setCustomerRole('user');
      reset();
      return;
    }

    const newCustomer = {
      customerRole,
      id: Date.now(),
      ...inpValues,
      email: inpValues.email.toLowerCase(),
    };
    setMockCustomersData((prevData) => [...prevData, newCustomer]);
    setCustomerRole('user');
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className='flex w-[512px] flex-col p-[40px] border-r-[#F5F5F5] border-r-[2px]'
    >
      <h3 className='capitalize text-TC mb-[40px] font-inter text-[20px] font-bold'>
        add customer
      </h3>
      <div className='flex mb-[24px] justify-between'>
        <label htmlFor='name' className='flex flex-col min-h-[106px]'>
          <span className='mb-[10px] font-inter text-[#475569]'>
            First Name
          </span>
          <input
            {...register('inpValues.firstName', {
              required: 'The first name is required',
            })}
            id='name'
            type='text'
            className='mb-[10px] font-inter py-[8px] px-[12px] max-w-[204px] border-[#E2E8F0] border-[1px] rounded-[8px]  focus:border-[#E2E8F0]
            focus:outline focus:outline-[#7DD3FC] focus:outline-[3px] focus:border-[1px]'
          />
          {errors?.inpValues?.firstName && (
            <small className='text-[#F87171]'>
              {errors.inpValues.firstName.message}
            </small>
          )}
        </label>

        <label htmlFor='lastName' className='flex flex-col min-h-[106px]'>
          <span className='mb-[10px] font-inter text-[#475569]'>Last Name</span>
          <input
            {...register('inpValues.lastName', {
              required: 'The last name is required',
            })}
            id='lastName'
            type='text'
            className='mb-[10px] font-inter py-[8px] px-[12px] max-w-[204px] border-[#E2E8F0] border-[1px] rounded-[8px]  focus:border-[#E2E8F0]
            focus:outline focus:outline-[#7DD3FC] focus:outline-[3px] focus:border-[1px]'
          />
          {errors?.inpValues?.lastName && (
            <small className='text-[#F87171]'>
              {errors.inpValues.lastName.message}
            </small>
          )}
        </label>
      </div>
      <label
        htmlFor='company'
        className='v-full flex flex-col mb-[24px] min-h-[106px]'
      >
        <span className='capitalize mb-[10px] font-inter text-[#475569]'>
          company
        </span>
        <input
          {...register('inpValues.company', {
            required: 'The company name is required',
          })}
          type='text'
          className='mb-[10px] font-inter py-[8px] px-[12px] border-[#E2E8F0] border-[1px] rounded-[8px]  focus:border-[#E2E8F0]
          focus:outline focus:outline-[#7DD3FC] focus:outline-[3px] focus:border-[1px]'
        />
        {errors?.inpValues?.company && (
          <small className='text-[#F87171]'>
            {errors.inpValues.company.message}
          </small>
        )}
      </label>
      <div className='flex v-full gap-[4px] py-[5px] px-[4px] mb-[24px] bg-rdbc rounded-[8px]'>
        <button
          className={`capitalize basis-3/6 py-[4px] px-[6px] rounded-[4px] font-inter text-[16px] text-[#0F172A] transition-all duration-300
           ${
             customerRole === 'user' ? 'bg-[#FFF] shadow-boxSW' : 'bg-[#F1F5F9]'
           }`}
          onClick={handleRole}
        >
          user
        </button>
        <button
          className={`capitalize basis-3/6 py-[4px] px-[6px] rounded-[4px] font-inter text-[16px] text-[#0F172A]
          ${customerRole === 'administrator' ? 'bg-[#FFF]' : 'bg-[#F1F5F9]'}`}
          onClick={handleRole}
        >
          administrator
        </button>
      </div>
      <label
        htmlFor='email'
        className='flex flex-col v-full mb-[24px] min-h-[106px]'
      >
        <span className='mb-[10px] font-inter text-[#475569]'>Email</span>
        <input
          {...register('inpValues.email', {
            required: 'The email is required',
            pattern: {
              value: mailValidator(),
              message: 'Please enter a valid email',
            },
          })}
          id='email'
          type='text'
          className='mb-[10px] font-inter py-[8px] px-[12px] border-[#E2E8F0] border-[1px] rounded-[8px]  focus:border-[#E2E8F0]
          focus:outline focus:outline-[#7DD3FC] focus:outline-[3px] focus:border-[1px]'
        />
        {errors?.inpValues?.email && (
          <small className='text-[#F87171]'>
            {errors?.inpValues.email?.message}
          </small>
        )}
      </label>
      <label
        htmlFor='password'
        className='flex flex-col v-full mb-[24px] relative min-h-[106px]'
      >
        <span className='mb-[10px] font-inter text-[#475569]'>Password</span>
        <input
          {...register('inpValues.password', {
            required: 'The email is required',
            minLength: 8,
          })}
          id='password'
          type={!passIsVisible ? 'password' : 'text'}
          className='mb-[10px] font-inter py-[8px] px-[12px] border-[#E2E8F0] border-[1px] rounded-[8px] focus:border-[#E2E8F0]
          focus:outline focus:outline-[#7DD3FC] focus:outline-[3px] focus:border-[1px]'
        />
        <small
          className={`font-inter  text-[14px] ${
            errors?.inpValues?.password ? 'text-[red]' : 'text-[#94A3B8]'
          }`}
        >
          8+ characters
        </small>
        <span
          className='max-w-[24px] h-[24px] absolute bottom-10 right-[12px] cursor-pointer'
          onClick={handlePassVisibility}
        >
          <Image
            src={!passIsVisible ? eye : eyeOff}
            alt='picture does not exist'
          />
        </span>
      </label>
      <button
        disabled={!isValid}
        type='submit'
        className='flex justify-center items-center capitalize v-full py-[8px] px-[12px] font-inter text-[white] rounded-lg text-[16px] bg-[#0EA5E9] font-bold disabled:bg-[gray] disabled:cursor-not-allowed'
      >
        save
      </button>
    </form>
  );
};
