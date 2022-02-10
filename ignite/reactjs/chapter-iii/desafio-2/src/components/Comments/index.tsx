import { useUtterances } from '../../hooks/useUtterances';

const commentNodeId = 'comments';

function Comments(): any {
  useUtterances(commentNodeId, 'github-light');
  return (<div id={commentNodeId}></div>);
};

export default Comments;
