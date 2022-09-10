import React from 'react';
import AreaSelector from './AreaSelector';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';

const Map = () => {
  return (
    <React.Fragment>
      <AppBar style={{ position: 'relative', backgroundColor: 'white' }}>
      </AppBar>
      {/* <Container maxWidth="sm" style={{ backgroundColor: 'white' }}>
        
      </Container> */}
      <AreaSelector />
    </React.Fragment>
  );
}

export default Map;
