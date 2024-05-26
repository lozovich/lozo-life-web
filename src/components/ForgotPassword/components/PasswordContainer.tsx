/* eslint-disable prettier/prettier */

import { resetPasswordApi } from 'api';
import Button from 'components/button';
import { STEPS } from 'config/app';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';

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

const PasswordContainer = ({ className = '', updateStep, email, setProgress }: Props) => {

    const history = useHistory();
    const [errors, setErrors] = useState({
        newPassword: false,
        confirmPassword: false
    });
    const [state, setState] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);

    const validationCheck = useCallback(() => {

        setErrors({
            newPassword: false,
            confirmPassword: false
        });
        let flag = false;

        if (state.newPassword !== state.confirmPassword) {
            setErrors({
                newPassword: true,
                confirmPassword: true
            });

            flag = true;

        }

        else if (!validator.isStrongPassword(state.newPassword)) {

            setErrors({
                newPassword: true,
                confirmPassword: true
            });
            flag = true;
        }

        return flag;

    }, [state.confirmPassword, state.newPassword]);


    const handleSubmit = useCallback(() => {

        const hasError = validationCheck();

        if (hasError) return;

        setLoading(true);
        resetPasswordApi({ email, password: state.newPassword }).then(() => {
            toast.success('Password Reset Successful');

            setProgress({
                email: false,
                otp: false,
                password: false
            });
            setLoading(false);
            history.push('/');

            setTimeout(() => updateStep(STEPS.email));
        })
            .catch(() => {
                setLoading(false);
            });
    }, [email, history, setProgress, state.newPassword, updateStep, validationCheck]);


    const onChange = useCallback((e) => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }, []);


    return (
        <div className={`password box ${className}`}>
            <p className='login__title mb-3'>Enter New Password</p>
            <input
                disabled={loading}
                type='text'
                name='newPassword'
                className={`mb-3 ${errors.newPassword ? 'error__border' : ''}`}
                placeholder='Enter new password'
                value={state.newPassword}
                onChange={onChange}
            />
            <input
                disabled={loading}
                type='password'
                name='confirmPassword'
                className={`mb-3 ${errors.confirmPassword ? 'error__border' : ''}`}
                placeholder='Confirm password'
                value={state.confirmPassword}
                onChange={onChange}
            />
            <Button
                className='bg-success text-white w-100 mb-3 login__submit'
                loaderColor='light'
                onClick={handleSubmit}
                loading={loading}
                disabled={loading}
            >
                Submit
            </Button>
        </div>
    );
};

export default PasswordContainer;
