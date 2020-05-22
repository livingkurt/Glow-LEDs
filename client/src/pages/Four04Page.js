import React from 'react';
import { Title, Label } from '../components/UtilityComponents';
import { FlexContainer } from '../components/ContainerComponents';


function Four04Page(props) {


  return <FlexContainer h_center column t_center>
    <Title styles={{ margin: "20px auto" }}>404 Page Not Found</Title>
    <Label>Sorry About that</Label>
  </FlexContainer>
}
export default Four04Page;