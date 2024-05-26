import Hanging from 'assets/lottie/hanging.json';
import LottieContainer from 'core/LottieContainer';
import { ScaleLoader } from 'react-spinners';

type Props = {
  useLottie?: boolean;
};

const ComponentLoader = ({ useLottie }: Props) => (
  <div className='d-flex justify-content-center align-items-center'>
    {useLottie ? (
      <div
        className='d-flex align-items-center'
        style={{ flexDirection: 'column' }}
      >
        <LottieContainer json={Hanging} width={200} height={200} />
        <p style={{ fontWeight: 900 }}>Loading...</p>
      </div>
    ) : (
      <ScaleLoader color='#0079bf' loading />
    )}
  </div>
);

export default ComponentLoader;
