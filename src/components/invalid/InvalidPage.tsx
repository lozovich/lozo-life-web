import { Link } from 'react-router-dom';

const InvalidPage = () => (
  <div className='d-flex justify-content-center align-items-center invalid'>
    <img src='/void.svg' alt='VoidImage' />
    <Link to='/'>
      <button type='button'>Back to home</button>
    </Link>
  </div>
);

export default InvalidPage;
