import React from 'react';
import { 
	Row, 
	Col, 
	Input, 
	Label,
    CustomInput,
    Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export interface IMetapathItemProps {
    metapath: any,

    handleSlider: any,
    // // functions
    // handleSwitch: any,
    // handleDropdown: any,
    // handleLogicDropdown: any,
    // handleInput: any,
    // handleAddition: any,
    // handleRemoval: any,
}

export class MetapathItem extends React.Component<IMetapathItemProps> {

    marks:any = {
        0: '0',
        25: '0.25',
        50: '0.5',
        75: '0.75',
        100: '1',
    };
    constructor(props) {
        super(props);
    }

    handleSliderChange(e) {
        console.warn(e);
    }
	render() {
        const temporal = this.props.metapath.includes('A');
        const spatial = this.props.metapath.includes('L');

        return (
            <Row form key={this.props.metapath}>
                <Col md='3'>
                    <h5>{ this.props.metapath }</h5>
                </Col>
                <Col md='4'>
                    <Slider min={0} marks={this.marks} included={false} defaultValue={50} onChange={this.handleSliderChange.bind(this)} />
                </Col>
                <Col md={{offset: 1, size: 4}}>
                    <Col md='6'>
                    {
                        (temporal) && <Label check>
                                <Input type="checkbox" /> Combine temporal
                            </Label>   
                    }
                    </Col>
                    <Col md='6'>
                    {
                        (spatial) && <Label check>
                                <Input type="checkbox" /> Combine spatial
                            </Label>
                    }
                    </Col>
                </Col>
                
            </Row>
        );
	}
};

export default MetapathItem;



