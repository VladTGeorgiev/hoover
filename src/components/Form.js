import React from 'react';
import { Button, Form, Grid, Image, Header, Segment, Divider } from 'semantic-ui-react'
import DirtForm from './DirtForm.js'
import areaLogo from '../media/cartesian-coordinate-system.png'
import hooverStartingPosition from '../media/map.png'
import directions from '../media/destination.png'
import dirt from '../media/spot.png'

class InputData extends React.Component {

    state = {
        roomX: '',
        roomY: '',
        hooverX: '',
        hooverY: '',
        directions: '',
        dirtX: [],
        dirtY: []
    }

    addInputField = () => {
        this.setState({
            dirtX: [...this.state.dirtX, ''],
            dirtY: [...this.state.dirtY, '']
        })
    }

    onUserInputChange = (e, i) => {
        let dirtX = [...this.state.dirtX]
    
        dirtX[i] = e.target.value
    
        this.setState({
          dirtX,
        })
    }

    onUserInputChangeY = (e, i) => {
        let dirtY = [...this.state.dirtY]

        dirtY[i] = e.target.value

        this.setState({
            dirtY
        })
    }

    render (){
        
        const { dirtX, dirtY } = this.state

        return (
            <div>
                <Grid verticalAlign='top'>
                    <Grid.Column style={{ minWidth: 450}}>
                        <Form 
                            size='large' 
                            className='log-in' 
                            onSubmit={()=>this.props.submit(this.state)}>
                                <Header 
                                    as='h1' 
                                    color='teal' 
                                    textAlign='center'>
                                        <Divider hidden/>
                                            <div className='comfortaa'>Hoover's Journey</div>
                                </Header>
                                <Divider hidden/>
                                <Header 
                                    as='h2' 
                                    color='teal' 
                                    textAlign='center'>
                                        <Divider hidden/>
                                            <Image 
                                            src={areaLogo} 
                                            size='massive'/>
                                            <div className='comfortaa'>Area Dimentions</div>
                                </Header>
                                <Segment stacked>
                                    <Form.Input 
                                        focus
                                        fluid 
                                        required 
                                        icon='arrow right' 
                                        iconPosition='left' 
                                        placeholder='X-axis' 
                                        type="number" 
                                        value={this.state.roomX} onChange={e => this.setState({roomX: e.target.value})} />
                                    <Form.Input 
                                        fluid 
                                        required 
                                        icon='arrow up' 
                                        iconPosition='left' 
                                        placeholder='Y-axis' 
                                        type="number" 
                                        value={this.state.roomY} 
                                        onChange={e => this.setState({roomY: e.target.value})}/>
                                </Segment>
                                <Divider hidden/>
                                <Header as='h2' color='teal' textAlign='center'>
                                    <Divider hidden/>
                                        <Image 
                                            src={hooverStartingPosition} 
                                            size='massive'/>
                                        <div className='comfortaa'>Hoover's start position</div>
                                </Header>
                                    <Segment stacked>
                                        <Form.Input 
                                            fluid 
                                            required 
                                            icon='arrow right' 
                                            iconPosition='left' 
                                            placeholder='X-axis' 
                                            type="number" 
                                            value={this.state.hooverX} 
                                            onChange={e => this.setState({hooverX: e.target.value})} />
                                        <Form.Input 
                                            fluid 
                                            required 
                                            icon='arrow up' 
                                            iconPosition='left' 
                                            placeholder='Y-axis' 
                                            type="number" 
                                            value={this.state.hooverY} 
                                            onChange={e => this.setState({hooverY: e.target.value})}/>
                                        </Segment>
                                <Divider hidden/>
                                <Header as='h2' color='teal' textAlign='center'>
                                    <Divider hidden/>
                                        <Image 
                                            src={directions} 
                                            size='massive'/>
                                        <div className='comfortaa'>Travel instructions</div>
                                </Header>
                                    <Segment stacked>
                                        <Form.Input 
                                            fluid 
                                            required 
                                            icon='compass' 
                                            iconPosition='left' 
                                            placeholder='Cardinal directions' 
                                            type="text"
                                            value={this.state.directions} 
                                            onChange={e => this.setState({directions: e.target.value})} />
                                    </Segment>
                                <Divider hidden/>
                                <Header as='h2' color='teal' textAlign='center'>
                                    <Divider hidden/>
                                        <Image 
                                            src={dirt} 
                                            size='massive'/>
                                            <div className='comfortaa'>Dirt positions</div>
                                </Header>
                                    <DirtForm 
                                        dirtX={dirtX} 
                                        dirtY={dirtY} 
                                        onUserInputChange={this.onUserInputChange} 
                                        onUserInputChangeY={this.onUserInputChangeY}/>
                                <Divider hidden/>
                                <Button 
                                    color='teal' 
                                    fluid 
                                    size='massive' 
                                    type='submit'
                                    className='comfortaa'>Submit
                                </Button>
                            <Divider hidden/>
                        </Form>
                            <Button 
                                color='yellow' 
                                size='medium' 
                                onClick={this.addInputField}>Add dirt patches
                            </Button>
                            <Divider hidden/>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default InputData;