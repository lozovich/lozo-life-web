import ProfileImageContainer from 'core/ProfileImageContainer';
import { TaskConstant } from 'store/reducers/task.reducer';

type Props = {
  task: TaskConstant;
};

const TaskMemberList = ({ task }: Props) => (
  <div className='taskMemberList'>
    {task?.members &&
      task?.members?.length > 0 &&
      task?.members?.map((member) => (
        <ProfileImageContainer
          firstName={member.firstName}
          lastName={member.lastName}
          profileImage={member.profileImage ?? ''}
          key={member?._id}
        />
      ))}
  </div>
);

export default TaskMemberList;
