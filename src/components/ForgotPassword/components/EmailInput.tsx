/* eslint-disable prettier/prettier */

import { generateOtpApi } from 'api';
import Button from 'components/button';
import { STEPS } from 'config/app';
import { InputHTMLAttributes, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import validator from 'validator';

type Props = {
    className?: string;
    updateStep: (step: STEPS) => void;
    onChange: (e: InputHTMLAttributes<HTMLInputElement>) => void;
    value: string;
    setProgress: React.Dispatch<React.SetStateAction<{
        email: boolean;
        otp: boolean;
        password: boolean;
    }>>
}

const EmailInput = ({ className = '', updateStep, onChange, value, setProgress }: Props) => {


    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const validationCheck = useCallback(() => {

        setError(false);
        let flag = false;

        if (!validator.isEmail(value)) {

            setError(true);
            flag = true;
        }

        return flag;

    }, [value]);


    const handleSubmit = useCallback(() => {

        const hasError = validationCheck();

        if (hasError) return;

        setLoading(true);
        generateOtpApi({ email: value }).then(() => {
            toast.success('Otp Sent!');

            setProgress(prevState => ({
                ...prevState,
                email: true
            }));
            setLoading(false);
            updateStep(STEPS.otp);
        })
            .catch(err => {
                setLoading(false);
            });
    }, [setProgress, updateStep, validationCheck, value]);


    return (
        <div className={`w-100 box ${className}`}>
            <p className='login__title mb-3'>Forgot Password</p>
            <input
                name='email'
                disabled={loading}
                type='email'
                className={`mb-3 ${error ? 'error__border' : ''}`}
                placeholder='Enter email address'
                value={value}
                onChange={onChange}
            />

            <Button
                className='bg-success text-white w-100 mb-3 login__submit'
                type='button'
                onClick={handleSubmit}
                loaderColor='light'
                loading={loading}
                disabled={loading}
            >
                <>
                    <span style={{ marginRight: '10px' }}>Get Code</span> <i className='bi bi-arrow-right-circle' /></>
            </Button>
        </div>
    );
};

export default EmailInput;
