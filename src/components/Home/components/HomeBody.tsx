import { useHistory, useLocation } from 'react-router-dom';
import { HomeDataType } from 'store/reducers/home.reducer';

type Props = {
  list: HomeDataType[];
};

const HomeBody = ({ list }: Props) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <>
      {list &&
        list.map((val) => (
          <div key={val._id}>
            <h3 className='container__title'>WorkSpace {val.name}</h3>

            <div className='d-flex mb-3 flex-wrap'>
              {val?.boards &&
                val.boards.map((board) => (
                  <div
                    key={board._id}
                    className='board__container'
                    onClick={() => history.push(`/board/${board._id}`)}
                    style={{ backgroundColor: board.backgroundColor }}
                  >
                    <p className='board__title'>{board.name}</p>
                  </div>
                ))}

              <div
                className='board__container add'
                onClick={() =>
                  history.push({
                    pathname: '/create-board',
                    state: { background: location, workspaceId: val._id }
                  })
                }
              >
                <p>Create new board</p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default HomeBody;
