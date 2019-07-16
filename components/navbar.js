import React from 'react';
import { SearchBar } from 'react-native-elements';

class Research extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    return (
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
        containerStyle={{ width: 250 }}
      />
    );
  }
}

export default Research;
