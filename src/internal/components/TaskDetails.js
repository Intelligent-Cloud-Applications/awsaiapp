import { useParams } from 'react-router-dom';
import TestingAndDefectFixing from './TestingAndDefectFixing';


const TaskDetails = () => {
  const { taskId } = useParams();

  return (
      <TestingAndDefectFixing taskGidProp={taskId} />
  );
};

export default TaskDetails;
