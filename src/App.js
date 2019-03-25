import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SearchComponent from './components/SearchComponent';
import VideoComponent from './components/VideoComponent';

import './style/itemTable.scss';


const getItems = () => {
  try {
      return JSON.parse(localStorage.getItem("nasa")) || [];
  } catch (e) {}
  return [];
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddScreen: false,
      keyword: '',
      items: getItems(),
    }
  }

  changeState = () => {
    this.setState({
      showAddScreen: !this.state.showAddScreen, 
    })
  }

  // searchMedia = (term) => {
  //   const url = `https://images-api.nasa.gov/search?q=${term}`;

  //   axios({
  //     method: 'GET',
  //     url,
  //   }).then((response) => {
  //     console.log(response);
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }

  showHideAddScreen = () => {
    if (this.state.showAddScreen) {
      return (
        <SearchComponent itemList={this.state.items}></SearchComponent>
      )
    } else {
      return (
        <VideoComponent data={this.state.items}></VideoComponent>
      )
    }
  }
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
              <h1 style={{textAlign: "left"}}>NASA Collection</h1>
            </Col>
            <Col>
              <div className="text-right">
                <Button variant="primary" onClick={ this.changeState }>Toggle Search Bar</Button>
              </div>
            </Col>
          </Row>
          <Row className="main-container">
            {/* <input type="button" value="test API" onClick={() => { this.searchMedia("moon") } } /> */}
            { this.showHideAddScreen() }
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
