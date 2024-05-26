import { inviteApi } from 'api';
import Button from 'components/button';
import DropDown from 'core/DropDown';
import ProfileImageContainer from 'core/ProfileImageContainer';
import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { CircleLoader } from 'react-spinners';
import { StoreType } from 'store';

const LeftSubHeaderSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { data } = useSelector((store: StoreType) => store.BoardReducer);
  const { members } = useSelector((store: StoreType) => store.MemberReducer);
  const { list } = useSelector((store: StoreType) => store.HomeReducer);
  const currentWorkSpace = useMemo(
    () => list.find((workspace) => workspace._id === data?.workspace),
    [data?.workspace, list]
  );

  const handleShare = useCallback(
    async (onClose, e) => {
      // eslint-disable-next-line no-useless-return
      if (!email) return;

      setLoading(true);

      await inviteApi({
        email,
        boardId: data?._id
      }).catch((err) => setLoading(false));

      setLoading(false);
      onClose(e);
      setEmail('');
    },
    [data?._id, email]
  );

  return (
    <section className='left_sub_header'>
      <div className='white__card boardIcon'>
        <i className='bi bi-kanban-fill ' style={{ marginRight: '5px' }} />
        <p>Board</p>
      </div>

      <h3 className='board__name'>{data?.name}</h3>
      <div className='vr' />

      <div className='white__card'>{currentWorkSpace?.name} Workspace</div>
      <div className='vr' />

      <div className='memberList'>
        {members &&
          members.map((member) => (
            <ProfileImageContainer
              key={member._id}
              firstName={member.user.firstName}
              lastName={member.user.lastName}
              profileImage={member.user.profileImage ?? ''}
            />
          ))}
      </div>
      <div className='vr' />
      <DropDown
        buttonId='share_button_id'
        buttonText='Share'
        title='Share'
        icon={<i className='bi bi-share-fill' />}
        buttonStyle={{
          backgroundColor: 'white',
          borderRadius: '5px'
        }}
        buttonClass='share__button'
        stopPropagation
        render={(onClose) => (
          <>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              placeholder='Enter email'
              className='my-2'
            />
            <Button
              type='button'
              className='my-1 bg__primary text-white d-flex align-items-center'
              onClick={(e) => handleShare(onClose, e)}
            >
              <>
                {loading && <CircleLoader color='white' size={10} />}
                <span style={loading ? { marginLeft: '10px' } : {}}>Send</span>
              </>
            </Button>
          </>
        )}
      />
    </section>
  );
};

export default LeftSubHeaderSection;
