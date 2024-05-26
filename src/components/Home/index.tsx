import FooterSvg from 'components/FooterSvg';
import ComponentLoader from 'components/Loader/ComponentLoader';
import { useSelector } from 'react-redux';
import { StoreType } from 'store';
import EmptyHome from './components/EmptyHome';
import HomeBody from './components/HomeBody';
import './style.scss';

const Home = () => {
  const { list, loading } = useSelector(
    (store: StoreType) => store.HomeReducer
  );

  return (
    <section className='home'>
      <div className='container'>
        {loading && <ComponentLoader />}

        {list.length <= 0 && !loading ? (
          <EmptyHome />
        ) : (
          <HomeBody list={list} />
        )}
      </div>
      <FooterSvg />
    </section>
  );
};

export default Home;
