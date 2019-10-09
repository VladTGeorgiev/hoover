import React from 'react';
import { Form, Divider, Label } from 'semantic-ui-react'

const DirtForm = ({ dirtX, dirtY, onUserInputChange, onUserInputChangeY}) => {

    const dirtNumbers = dirtX.map((value, i) => (
        <div>
            <Label>Dirt position: {[i+1]}</Label>
            <Divider hidden fitted/>
        </div>
    ))

    const dirtXCollection = dirtX.map((value, i) => (
        <div>
            <Form.Input 
                fluid icon='arrow right' 
                iconPosition='left' 
                placeholder='X-axis' 
                type="number" 
                name="dirtX" 
                value={value} 
                onChange={e => onUserInputChange(e, i)} />
            <Divider hidden fitted/>
        </div>
    ))

    const dirtYCollection = dirtY.map((value, i) => (
        <div>
            <Form.Input 
                fluid 
                icon='arrow up' 
                iconPoCollectionition='left' 
                placeholder='Y-axis' 
                type="number" 
                name="dirtY" 
                value={value} 
                onChange={e => onUserInputChangeY(e, i)}/>
            <Divider hidden fitted/>
        </div>
    ))

    return (
        <div>
            <div className='dirt'>
                <div className='dirtNumbers'>{dirtNumbers}</div>
                <div className='dirtX'>{dirtXCollection}</div>
                <div className='dirtY'>{dirtYCollection}</div>
            </div>
        </div>
    )
}

export default DirtForm;