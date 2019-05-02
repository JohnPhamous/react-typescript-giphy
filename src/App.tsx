import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

export default class App extends Component {
  state = {
    gifSrc: undefined,
    isSearching: false,
    query: ""
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  getGif = async () => {
    const { query } = this.state;
    this.setState({ isSearching: true, gifSrc: undefined });

    const API_KEY = "A3CQtr8DQVI2kM215yBVSwvdwvJgyMcU";
    const API = `https://api.giphy.com/v1/gifs/search?q=${query}&limit=1&api_key=${API_KEY}`;

    const response = await fetch(API);
    const data = await response.json();
    const gifSrc = data["data"][0]["images"]["original"]["url"];

    this.setState({
      isSearching: false,
      gifSrc
    });
  };

  render() {
    const { isSearching, gifSrc, query } = this.state;

    return (
      <Container>
        {(isSearching || gifSrc) && (
          <GifContainer>
            {isSearching && <SSkeletonGif />}
            {gifSrc && <Gif src={gifSrc} />}
          </GifContainer>
        )}

        <div>
          <Search
            placeholder="Cute puppies..."
            value={query}
            onChange={this.handleInputChange}
          />
          <Button onClick={this.getGif}>Search</Button>
        </div>
      </Container>
    );
  }
}

const Container = styled.main`
  height: 100vh;
  width: 100vw;
  background: #f5f6fa;
  color: #9c9c9c;
  font: 1rem "PT Sans", sans-serif;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GifContainer = styled.div`
  height: 40vw;
  width: 40vw;
  margin-bottom: 60px;
`;

const Gif = styled.img`
  height: 100%;
  width: 100%;
`;

const Search = styled.input`
  width: 360px;
  background: #fff;
  color: #a3a3a3;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
  border: 0;
  outline: 0;
  padding: 22px 18px;
  font-size: 24px;
`;

const PulseKeyframes = keyframes`
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: -135% 0%;
  }
`;

const SSkeletonPulse = styled.div`
  display: inline-block;
  height: 100%;
  width: 100%;
  background: linear-gradient(-90deg, #f0f0f0 0%, #c6c6c6 50%, #f0f0f0 100%);
  background-size: 400% 400%;
  animation: ${PulseKeyframes} 1.2s ease-in-out infinite;
`;

const SSkeletonGif = styled(SSkeletonPulse)`
  width: 200px !important;
  height: 50%;
  border-radius: 5px;

  &::before {
    content: "\00a0";
  }
`;

const Button = styled.button`
  display: inline-block;
  background: transparent;
  color: inherit;
  font: inherit;
  border: 0;
  outline: 0;
  padding: 0;
  transition: all 200ms ease-in;
  cursor: pointer;
  background: #7f8ff4;
  color: #fff;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  padding: 12px 36px;
  margin-left: -96px;

  &:hover {
    background: #6c7ff2;
  }
`;
