import EmailAnimation from 'assets/lottie/email.json';
import FooterSvg from 'components/FooterSvg';
import LottieContainer from 'core/LottieContainer';
import isMobileView from 'hooks/isMobileView';

const CheckYourMail = () => {
  const isMobile = isMobileView();

  return (
    <div className='h-100 d-flex justify-content-center align-items-center'>
      <div className='container'>
        <LottieContainer
          json={EmailAnimation}
          width={isMobile ? 200 : 300}
          height={isMobile ? 200 : 300}
        />

        <h2 className='text-center'>Check Your Mail</h2>
        <p className='text-center'>We have sent you an email</p>
      </div>

      <FooterSvg />
    </div>
  );
};

export default CheckYourMail;
