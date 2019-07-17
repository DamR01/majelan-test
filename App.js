import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import Research from './components/navbar';
import Recipes from './components/recipes';
import api from './config';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipesData: []
    };
  }

  /*ComponentDidMount is used to fetch Food2Fork API to get all recipies.
  We send all data with props to Recipies Component */
  async componentDidMount() {
    await fetch(`https://www.food2fork.com/api/search?key=${api}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('data', data);
        this.setState({
          recipesData: data.recipes
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  searchNav = search => {
    console.log('search', search);
    fetch(`https://www.food2fork.com/api/search?key=${api}&q=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(query => {
        console.log('query', query);
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  render() {
    /*Here we map on the recipes state to send data to Recipes Component using props */
    let recipesList = this.state.recipesData.map((recipe, i) => {
      return (
        <Recipes
          key={i}
          recipeTitle={recipe.title}
          recipeUrl={recipe.image_url}
          recipePublisher={recipe.publisher}
          recipeRank={recipe.social_rank}
          recipeSourceUrl={recipe.source_url}
          recipeF2f={recipe.f2f_url}
          recipeId={recipe.recipe_id}
        />
      );
    });

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Research updateSearch={this.searchNav} />
          <ScrollView>{recipesList}</ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    marginTop: 6
  }
});

export default App;
