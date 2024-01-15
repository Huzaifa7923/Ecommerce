import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return <Spinner animation="grow"
  role='status'
  style={{
    width : '100px',
    height : '100px',
    margin : 'auto',
    display : 'block',
  }} />;
}

export default Loader;