/* eslint-disable react/no-array-index-key */
/* eslint-disable prettier/prettier */

type Props = {
    taskCount?: number
}

const CardSkeletonLoader = ({ taskCount = 1 }: Props) => (
    <div className='skeleton'>
        <div className='skeleton__container'>
            {Array(taskCount).fill(0).map((_, i) => <div key={i} className='skeleton__item' >
                <div className='skeleton__content' />
                <div className='skeleton__content' />
                <div className='skeleton__content' />
                <div className='skeleton__content para' />
            </div>)}
        </div>
    </div>
);

export default CardSkeletonLoader;
