import React, { Component, createRef } from "react";
import axios from "axios";

class App extends Component {
  searchInput = createRef();

  state = {
    data: {},
    city: "",
  };
  setCity = (event) => {
    event.preventDefault();
    this.setState({ city: event.target.value });
  };
  searchCity = (event) => {
    this.setState({ city: this.searchInput.current.value });
    console.log(event)
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=967af9021195e59663c0dae284e99c13`;
    if (event.key === "Enter" || event==="Enter") {
      axios
        .get(url)
        .then((response) => {
          this.setState({
            data: response.data,
          });
        })
        .catch((error) => {
          console.log("error");
        });
    }
  };
  componentDidMount() {
    let city = "tashkent";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=967af9021195e59663c0dae284e99c13`;
    axios
      .get(url)
      .then((response) => {
        this.setState({
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("error");
      });
  }

  render() {
    const { data, city } = this.state;
    let mainWeather = undefined;
    data?.weather
      ? (mainWeather = data.weather[0].main)
      : (mainWeather = undefined);
    return (
      <div className={`app ${mainWeather}`}>
        <div className="search">
          <input
            ref={this.searchInput}
            value={city}
            onChange={(e) => this.setCity(e)}
            onKeyPress={this.searchCity}
            type="text"
            placeholder="Search location"
          />
          <button onClick={() => this.searchCity("Enter")}>
            <img src="/images/search.png" alt="" />
          </button>
        </div>
        <div className="container">
          <div className="top">
            <div className="loaction">
              <p>{data?.name}</p>
            </div>
            <div className="temp">
              <h1>{data?.main?.temp.toFixed()} ºC</h1>
            </div>
            <div className="description">
              <p>{data?.weather ? data?.weather[0].description : null}</p>
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              <p className="bold">{data?.main?.feels_like.toFixed()}</p>
              <p>Feels like</p>
            </div>
            <div className="humidity">
              <p className="bold">{data?.main?.humidity.toFixed()}</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{data?.wind?.speed.toFixed()} km/h</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
