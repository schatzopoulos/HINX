import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
	Row, 
	Col, 
	InputGroup, 
	InputGroupAddon, 
	Input, 
	Button, 
	Spinner,
	ListGroup,
	Progress,
	Container,
	Card, 
  CardBody,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import  _  from 'lodash';
import AutocompleteInput from '../autocomplete/autocomplete-input';

export interface IHomeProps extends StateProps, DispatchProps {
	loading: boolean;
	progress: number;
	progressMsg: string;
	error: string;
	docs: any;
	meta: any;
	uuid: string;
};

export class Home extends React.Component<IHomeProps> {
	readonly state: any = { 
    entity: 'Article',
    attribute: 'id',
		dataset: "gdelt",
	};
	polling: any;
	entities: any = [
    { "name": "Article", "attributes": [ { "name": "id", "type": "numeric" }, { "name": "url", "type": "string" }, { "name": "pos", "type": "numeric" }, { "name": "neg", "type": "numeric" } ]},
    { "name": "Person", "attributes": [ { "name": "id", "type": "numeric" }, { "name": "name", "type": "string" } ] },
    { "name": "Organisation", "attributes": [ { "name": "id", "type": "numeric" } , { "name": "name", "type": "string" } ] }, 
    { "name": "Theme", "attributes": [ { "name": "id", "type": "numeric" } , { "name": "name", "type": "string" } ] },
    { "name": "Source", "attributes": [ { "name": "id", "type": "numeric" } , { "name": "name", "type": "string" } ] },
    { "name": "Location", "attributes": [ { "name": "id", "type": "numeric" } , { "name": "name", "type": "string" }, { "name": "code", "type": "string" }, { "name": "lat", "type": "numeric" }, { "name": "lon", "type": "numeric" } ] },
  ];

	pollForResults() {
		// this.polling = setInterval( () => {
		// 	this.props.getResults(this.props.analysis, this.props.uuid);
		// }, 1000);
	}

	componentDidUpdate(prevProps) {

		// new uuid detected, start polling
		if (this.props.loading && !prevProps.loading) {
			this.pollForResults();
		} else if (prevProps.loading && !this.props.loading) {
			clearInterval(this.polling);
		}
	}

	componentWillUnmount() {
		clearInterval(this.polling);
	}

	componentDidMount() {
		
	}

	execute(e) {
    e.preventDefault();
    // console.log("execute sim search");
	}

	loadMoreResults() {
		// this.props.getMoreResults(this.props.analysis, this.props.uuid, this.props.meta.page + 1);
  }

  handleSourceNode(e) {

  }

  handleSourceEntity(e) {
    e.preventDefault();
    this.setState({
      entity: e.target.value
    });
  }

  handleSourceAttribute(e) {
    e.preventDefault();
    this.setState({
      attribute: e.target.value
    });
  }

  getSourceEntityOptions() {
    return this.entities.map( (entity, index) => {
      return <option key={index} value={entity.name}>{entity.name}</option>;
    });
  }

  getSourceAttributeOptions() {
    const entity = _.find(this.entities, [ 'name', this.state.entity]);
    return entity.attributes.map( (attribute, index) => {
      return <option key={index} value={attribute.name}>{attribute.name}</option>;
    });
  }

	render() {
   
		return (
			<Container fluid>
        <Row>
          <Col md="6">
            <Form>
              <FormGroup>
                <Label for="source_entity"><h4>1. Select source entity</h4></Label>
                <Input  id="source_entity" value={this.state.entity} type="select" name="source_entity" onChange={this.handleSourceEntity.bind(this)}>
                    {this.getSourceEntityOptions()}
                  </Input>
              </FormGroup>
              <FormGroup>
                <Label for="source_attribute"><h4>2. Select key attribute for {this.state.entity}</h4></Label>
                <Input  id="source_attribute" value={this.state.attribute} type="select" name="source_attribute" onChange={this.handleSourceAttribute.bind(this)}>
                    {this.getSourceAttributeOptions()}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="source_node"><h4>3. Select source node</h4></Label>
                <AutocompleteInput 
                  id="targetEntityInput"
                  placeholder={''}
                  onChange={this.handleSourceNode.bind(this)}								
                  entity={this.state.entity}
                  field={this.state.attribute}
                  folder={this.state.dataset}
                />
              </FormGroup>
            </Form>
          </Col>
        </Row>
			</Container>
		);
	}
};

const mapStateToProps = (storeState: IRootState) => ({  
	// loading: storeState.analysis.loading,
	// progress: storeState.analysis.progress,
	// progressMsg: storeState.analysis.progressMsg,
	// error: storeState.analysis.error,
	// docs: storeState.analysis.docs,
	// meta: storeState.analysis.meta,
	// uuid: storeState.analysis.uuid,  
	// analysis: storeState.analysis.analysis,
	// schemas: storeState.datasets.schemas,
});

const mapDispatchToProps = { 
	// rankingRun, 
	// simjoinRun,
	// simsearchRun,
	// getResults,
	// getMoreResults,
	// getDatasetSchemas,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Home);



