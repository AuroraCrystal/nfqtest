import React from 'react';

import axios from 'axios';
import _find from 'lodash/find';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

class SearchComponent extends React.Component {
    state = {
        searchResults: [],
    }

    searchMedia = (e) => {
      const term = e.target.value;
      const url = `https://images-api.nasa.gov/search?q=${term}`;
  
      axios({
        method: 'GET',
        url,
      }).then((response) => {
        const res = [];
        response.data.collection.items.forEach((item) => {
          res.push({
              id: item.data[0].nasa_id,
              nasa_id: item.data[0].nasa_id,
              title: item.data[0].title,
              description: item.data[0].description,
              type: item.data[0].media_type,
              preview: _find(item.links, (o) => { return o.rel === "preview" }).href || [],
          })
        })
        this.setState({
          searchResults: res,
        })
      }).catch((error) => {
        return "";
      });
    }
    render() {
    return (
      <div>
          <SearchBar searchMedia={this.searchMedia}></SearchBar>
          <SearchResults searchResults={this.state.searchResults} itemList={this.props.itemList}></SearchResults>
      </div>
    )
    }
}

export default SearchComponent;