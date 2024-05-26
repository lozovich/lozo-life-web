import ScanAnimation from 'assets/lottie/scan.json';
import LottieContainer from 'core/LottieContainer';
import { PropagateLoader } from 'react-spinners';

type Props = {
  useLottie?: boolean;
};

const PageLoader = ({ useLottie }: Props) => (
  <div
    className='d-flex justify-content-center align-items-center'
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'white',
      zIndex: 2000,
      pointerEvents: 'none'
    }}
  >
    {useLottie ? (
      <LottieContainer json={ScanAnimation} width={200} height={200} />
    ) : (
      <PropagateLoader color='black' loading size={10} />
    )}
  </div>
);

export default PageLoader;
