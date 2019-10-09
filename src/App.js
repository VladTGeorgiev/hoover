import React from 'react';
import './App.css';
import { Grid, Icon, Divider, Label, Header, Segment, Container } from 'semantic-ui-react'
import InputData from './components/Form.js'

class App extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  formSubmitted = (input) => {
    this.setState({ data: input })
  }

  render (){

    const hooverTravel = (directionsArray) => {

      let roomXDimention = parseInt(this.state.data.roomX)
      let roomYDimention = parseInt(this.state.data.roomY)
      let hooverXPosition = parseInt(this.state.data.hooverX)
      let hooverYPosition = parseInt(this.state.data.hooverY)
          let allHooverPositionsArray = [];
  
          directionsArray.forEach(element => {
            let currentHooverPosition = [];
            switch(element) {
                case 1:
                    if(roomYDimention > hooverYPosition) {
                        hooverYPosition = hooverYPosition + 1
                        currentHooverPosition.push(hooverXPosition, hooverYPosition)
                        allHooverPositionsArray.push(currentHooverPosition)
                        return currentHooverPosition
                    } else {
                        currentHooverPosition.push(hooverXPosition, hooverYPosition)
                        allHooverPositionsArray.push(currentHooverPosition)
                        return currentHooverPosition
                    };
                case 2:
                    if(hooverYPosition !== 0)
                        hooverYPosition = hooverYPosition - 1
                        currentHooverPosition.push(hooverXPosition, hooverYPosition)
                        allHooverPositionsArray.push(currentHooverPosition)
                        return currentHooverPosition
                case 3:
                    if(roomXDimention > hooverXPosition) {
                        hooverXPosition = hooverXPosition + 1
                        currentHooverPosition.push(hooverXPosition, hooverYPosition)
                        allHooverPositionsArray.push(currentHooverPosition)
                        return currentHooverPosition
                    } else {
                        currentHooverPosition.push(hooverXPosition, hooverYPosition)
                        allHooverPositionsArray.push(currentHooverPosition)
                        return currentHooverPosition
                    };
                case 4:
                    if(hooverXPosition !== 0)
                        hooverXPosition = hooverXPosition - 1
                        currentHooverPosition.push(hooverXPosition, hooverYPosition)
                        allHooverPositionsArray.push(currentHooverPosition)
                        return currentHooverPosition
            }
            allHooverPositionsArray.push(currentHooverPosition);
        });
        uniqueHooverPositions(allHooverPositionsArray);
      }
  
    const uniqueHooverPositions = (allHooverPositionsArray) => {
      const lastHooverPosition = allHooverPositionsArray.slice(-1)[0]
      const cache = [];
      const uniqueHooverPositions = [];
      for( let i = 0; i < allHooverPositionsArray.length; i++ ) {
          const item = allHooverPositionsArray[i];
          const rep = item.toString();
          if (!cache[rep]) {
              cache[rep] = true;
              uniqueHooverPositions.push(item);
          }
      }
      dirtPatches(uniqueHooverPositions, lastHooverPosition);
    }

    const dirtPatches = (uniqueHooverPositions, lastHooverPosition) => {
      const X = this.state.data.dirtX;
      const Y = this.state.data.dirtY;
      const dirtPatchesArray = [];
      for (let i = 0; i < X.length; i++) {
        dirtPatchesArray.push([parseInt(X[i]),parseInt(Y[i])])
      }
      compareDirtPatchesWithHooverTravel(dirtPatchesArray, uniqueHooverPositions, lastHooverPosition);
    }

    const compareDirtPatchesWithHooverTravel = (dirtPatchesArray, uniqueHooverPositions, lastHooverPosition) => {
      let numberOfDirtPatchesCleaned = 0;
      for(let i = 0; i < uniqueHooverPositions.length; i++){
          for(let y = 0; y < dirtPatchesArray.length; y++){
            if(uniqueHooverPositions[i][0] === dirtPatchesArray[y][0] && uniqueHooverPositions[i][1] === dirtPatchesArray[y][1]){
              numberOfDirtPatchesCleaned = numberOfDirtPatchesCleaned + 1
            }
          }
      }
      result(lastHooverPosition, numberOfDirtPatchesCleaned)
    };

    let output = [];
    const result = (lastHooverPosition, numberOfDirtPatchesCleaned) => {
      const finalHooverXPosition = lastHooverPosition[0];
      const finalHooverYPosition = lastHooverPosition[1];
      const cleanedDirtPatches = (numberOfDirtPatchesCleaned.toString());
      output.push(finalHooverXPosition, finalHooverYPosition, cleanedDirtPatches);
    };

    const transformCardinalsIntoNumbers = (directions, cardinal, number) => {
      while(directions.indexOf(cardinal) !== -1){
          const index = directions.indexOf(cardinal);
          directions[index] = number
      };
    };

    const getDrivingInstructions = () => {
      const directionsInput = this.state.data.directions.toUpperCase()
      const regex = /[NESW]+/g;
      const directionsString = directionsInput.match(regex)
      const directionsArray = directionsString.toString().replace(/,/g, '').split('')
      const n = 'N';
      transformCardinalsIntoNumbers(directionsArray, n, 1);
      const s = "S";
      transformCardinalsIntoNumbers(directionsArray, s, 2);
      const e = "E";
      transformCardinalsIntoNumbers(directionsArray, e, 3);
      const w = "W";
      transformCardinalsIntoNumbers(directionsArray, w, 4);
      hooverTravel(directionsArray);
    }

    const evaluateData = () => {
      if (this.state.data.directions !== undefined) return getDrivingInstructions()
    }
  
    evaluateData()
    
    return (
      <div className="App">
        <header className="App-header">
        <Divider hidden/>
          <Segment inverted color='teal'>
            <Container>
              <div className="App-header">
                <InputData
                  submit={this.formSubmitted}/>
              </div>
            </Container>
          </Segment>
        </header>
            <Grid 
              verticalAlign='top' 
              className='App-header'>
                <Grid.Column >
                      {/* <Divider hidden/> */}
                      <Header 
                                    as='h1' 
                                    color='teal' 
                                    textAlign='center'>
                                        <Divider hidden/>
                                            <div className='comfortaa'>Evaluation</div>
                                </Header>
                      <Divider hidden/>
                      <Label 
                        size='massive' 
                        color='olive'>Final position of the hoover: 
                      </Label>
                        {output === undefined ? null : (<div>
                                                          <Divider hidden fitted/>
                                                          <Divider hidden fitted/>
                                                          <Divider hidden fitted/>
                                                          <Label
                                                            size="massive">
                                                              <Icon name='arrow up'/>X-axis: {output[0]}
                                                          </Label>
                                                          <Label
                                                            size="massive">
                                                              <Icon name='arrow right'/>Y-axis: {output[1]}
                                                          </Label>
                                                        </div>)}
                      <Divider hidden/>
                      <Label 
                        size="massive" 
                        color='olive'>Number of dirt patches cleaned: 
                      </Label>
                        {output === undefined ? null : <div>
                                                          <Divider hidden fitted/>
                                                          <Divider hidden fitted/>
                                                          <Divider hidden fitted/>
                                                          <Label
                                                            size="massive">
                                                              <Icon name='thumbs up outline'/> {output[2]}
                                                          </Label>
                                                        </div>}
                </Grid.Column>
            </Grid>
      </div>
    );
  }
}

export default App;
