import LeftSubHeaderSection from './components/LeftSubHeaderSection';
import RightSubHeaderSection from './components/RightSubHeaderSection';
import './style.scss';

const SubHeader = () => (
  <div className='sub-header'>
    <LeftSubHeaderSection />

    <RightSubHeaderSection />
  </div>
);

export default SubHeader;
