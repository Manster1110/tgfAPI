import React, { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props);

    // set up a check if the data is loaded
    // create array to handle the data
    this.state = {
      quakesLoaded: false,
      quakes: [],
    }
  }

  // Use fetch api to access USGS Earthquake data
  componentDidMount() {
    fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')
      .then(res => res.json())
      .then(json => {
        this.setState({
          quakesLoaded: true, // got the data
          quakes: json
        });
      })
  }

  render() {

    let { quakesLoaded, quakes } = this.state;

    // Keeping it simple, if data is not loaded yet, tell the user.
    // else return the data
    // only using inline styles for simplicity.
    if(!quakesLoaded) {
      return <div>Data is loading...</div>
    } else {
      return (
        <div className="App">
          <section className="section">
            <div className="container">
              <h1 style={{color: 'blue',textAlign: 'center'}}>USGS Earthquake Data</h1>
              <h4 style={{textAlign: 'center'}}>US Earthquakes</h4>
              <h6 style={{textAlign: 'center'}}>Data updated every 5 minutes</h6>
              <ul style={{listStyle: 'none', textAlign: 'center'}}>
                { /* Map over our data and display the results*/}
                {quakes.features.map(quake => (
                  <li key={quake.id}>
                    <strong>Name/Location:</strong> {quake.properties.place}  |  <strong>Magnitude:</strong> {quake.properties.mag}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      );
    }
  }
}

export default App;
