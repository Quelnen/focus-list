import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/feature/tasks/tasksSlice';
import { RootState } from '../../store/index';
import styles from './TaskFilter.module.scss';

function TaskFilter() {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.tasks.filter);

  const onChangeFilter = (newFilter: 'all' | 'active' | 'done') => {
    dispatch(setFilter(newFilter));
  };

  return (
    <div className={styles.filter}>
      <button
        className={filter === 'all' ? styles.active : ''}
        onClick={() => onChangeFilter('all')}
      >
        Все
      </button>
      <button
        className={filter === 'active' ? styles.active : ''}
        onClick={() => onChangeFilter('active')}
      >
        В процессе
      </button>
      <button
        className={filter === 'done' ? styles.active : ''}
        onClick={() => onChangeFilter('done')}
      >
        Выполнено
      </button>
    </div>
  );
}

export { TaskFilter };
