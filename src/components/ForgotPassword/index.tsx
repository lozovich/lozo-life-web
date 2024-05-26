/* eslint-disable prettier/prettier */

import FooterSvg from 'components/FooterSvg';
import { STEPS } from 'config/app';
import { useCallback, useState } from 'react';
import EmailInput from './components/EmailInput';
import OtpInputs from './components/OtpInputs';
import PasswordContainer from './components/PasswordContainer';
import './style.scss';

const ForgotPassword = () => {

    const [steps, setSteps] = useState<STEPS>(STEPS.email);
    const [stepProgress, setProgress] = useState({
        email: false,
        otp: false,
        password: false
    });

    const [email, setEmail] = useState('');

    const updateEmail = useCallback(e => {
        setEmail(e.target.value);
    }, []);

    const updateStep = useCallback((step: STEPS) => {
        setSteps(step);
    }, []);

    return (
        <div className='forgotPassword'>
            <h1>Rello</h1>
            <p>Forgot Password</p>

            <div className='loginPage__body'>
                <div className='box__container w-100'>
                    <EmailInput className={steps === STEPS.email ? 'active' : ''} updateStep={updateStep} onChange={updateEmail} value={email} setProgress={setProgress} />
                    <OtpInputs className={steps === STEPS.otp ? 'active' : ''} updateStep={updateStep} email={email} setProgress={setProgress} />
                    <PasswordContainer className={steps === STEPS.password ? 'active' : ''} updateStep={updateStep} email={email} setProgress={setProgress} />
                </div>
            </div>

            <FooterSvg />
        </div>
    );
};

export default ForgotPassword;
