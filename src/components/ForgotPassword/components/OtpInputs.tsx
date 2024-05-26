/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable prettier/prettier */
import { generateOtpApi, verifyOtpApi } from 'api';
import Button from 'components/button';
import { STEPS } from 'config/app';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';



type Props = {
    className?: string;
    updateStep: (step: STEPS) => void;
    email: string;
    setProgress: React.Dispatch<React.SetStateAction<{
        email: boolean;
        otp: boolean;
        password: boolean;
    }>>

}

const OtpInputs = ({ className, updateStep, email, setProgress }: Props) => {

    const input1Ref = useRef<HTMLInputElement>(null);
    const input2Ref = useRef<HTMLInputElement>(null);
    const input3Ref = useRef<HTMLInputElement>(null);
    const input4Ref = useRef<HTMLInputElement>(null);
    const input5Ref = useRef<HTMLInputElement>(null);
    const input6Ref = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);


    const [errors, setErrors] = useState({
        one: false, two: false, three: false, four: false, five: false, six: false
    });

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {



        const one = input1Ref?.current;
        const two = input2Ref?.current;
        const three = input3Ref?.current;
        const four = input4Ref?.current;
        const five = input5Ref?.current;
        const six = input6Ref?.current;


        const refs = [one, two, three, four, five, six];
        const { value } = e.target;
        const { name } = e.target;


        if (value.length >= 1) {
            const nextRef = refs[+name + 1];

            nextRef?.focus();
        }
        else if (!value) {
            const prevRef = refs[+name - 1];


            prevRef?.focus();
        }



    }, []);

    const validationCheck = useCallback(() => {

        setErrors({
            one: false, two: false, three: false, four: false, five: false, six: false
        });
        let flag = false;

        const one = input1Ref?.current;
        const two = input2Ref?.current;
        const three = input3Ref?.current;
        const four = input4Ref?.current;
        const five = input5Ref?.current;
        const six = input6Ref?.current;


        const refs = [one, two, three, four, five, six];


        refs.forEach((ref, i) => {

            if (!ref?.value) {
                flag = true;
                if (i === 0) {
                    setErrors(prevState => ({
                        ...prevState,
                        one: true

                    }));
                }
                else if (i === 1) {
                    setErrors(prevState => ({
                        ...prevState,
                        two: true

                    }));
                }
                else if (i === 2) {
                    setErrors(prevState => ({
                        ...prevState,
                        three: true

                    }));
                }

                else if (i === 3) {
                    setErrors(prevState => ({
                        ...prevState,
                        four: true

                    }));
                }

                else if (i === 4) {
                    setErrors(prevState => ({
                        ...prevState,
                        five: true

                    }));
                }
                else if (i === 5) {
                    setErrors(prevState => ({
                        ...prevState,
                        six: true

                    }));
                }
            }

        });

        return flag;

    }, []);


    const handleSubmit = useCallback(() => {

        if (loading) return;

        const hasError = validationCheck();
        if (hasError) return;

        const one = input1Ref?.current?.value ?? '';
        const two = input2Ref?.current?.value ?? '';
        const three = input3Ref?.current?.value ?? '';
        const four = input4Ref?.current?.value ?? '';
        const five = input5Ref?.current?.value ?? '';
        const six = input6Ref?.current?.value ?? '';

        const otp = one + two + three + four + five + six;
        setLoading(true);
        verifyOtpApi({ email, otp }).then(() => {

            setProgress(prevState => ({
                ...prevState,
                otp: true
            }));

            setLoading(false);
            updateStep(STEPS.password);
        }).catch(err => setLoading(false));



    }, [email, loading, setProgress, updateStep, validationCheck]);


    const resendOtp = useCallback(() => {

        if (!email) return;

        setResendLoading(true);
        generateOtpApi({ email }).then(() => {
            toast.success('Otp Re-Sent!');


            setResendLoading(false);

        })
            .catch(err => {
                setResendLoading(false);
            });
    }, [email]);



    useEffect(() => {

        if (input1Ref.current) input1Ref.current.focus();

    }, []);


    return (
        <div className={`otp box ${className}`}>
            <p className='login__title mb-3'>Please Enter the OTP</p>

            <div className='d-flex mb-3'>
                <input name='0' type='number' maxLength={1} ref={input1Ref} onChange={handleChange} className={`${errors.one ? 'error__border' : ''}`} />
                <input name='1' type='number' maxLength={1} ref={input2Ref} onChange={handleChange} className={`${errors.two ? 'error__border' : ''}`} />
                <input name='2' type='number' maxLength={1} ref={input3Ref} onChange={handleChange} className={`${errors.three ? 'error__border' : ''}`} />
                <input name='3' type='number' maxLength={1} ref={input4Ref} onChange={handleChange} className={`${errors.four ? 'error__border' : ''}`} />
                <input name='4' type='number' maxLength={1} ref={input5Ref} onChange={handleChange} className={`${errors.five ? 'error__border' : ''}`} />
                <input name='5' type='number' maxLength={1} ref={input6Ref} onChange={handleChange} className={`${errors.six ? 'error__border' : ''}`} />
            </div>

            <Button
                className='bg-success text-white w-100 mb-2 login__submit'
                type='button'
                onClick={handleSubmit}
                loaderColor='light'
                loading={loading}
                disabled={loading}
            >
                Submit
            </Button>

            <p onClick={resendOtp} className='login__title'>
                <span style={{ marginRight: '10px' }}>Render Otp ?
                </span>
                {resendLoading && <div style={{ fontSize: '0.6rem', width: '10px', height: '10px' }} className='spinner-border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </div>}
            </p>
        </div>
    );
};

export default OtpInputs;
