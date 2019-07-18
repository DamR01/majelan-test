import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import Research from './components/navbar';
import Recipes from './components/recipes';
import api from './config';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipesData: [],
      queriesData: [],
      searchValue: ''
    };
  }

  /*ComponentDidMount is used to fetch Food2Fork API to get all recipies.
  We send all data with props to Recipies Component */
  componentDidMount() {
    fetch(`https://www.food2fork.com/api/search?key=${api}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          recipesData: data.recipes
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  /* this function received props from navbar component to value of querie*/
  /* then we fetch the API to get result using querie from the search bar*/

  searchNav = search => {
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
        this.setState({
          queriesData: query.recipes,
          searchValue: search
        });
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

    let queryList = this.state.queriesData.map((queri, j) => {
      return (
        <Recipes
          key={j}
          recipeTitle={queri.title}
          recipeUrl={queri.image_url}
          recipePublisher={queri.publisher}
          recipeRank={queri.social_rank}
          recipeSourceUrl={queri.source_url}
          recipeF2f={queri.f2f_url}
          recipeId={queri.recipe_id}
        />
      );
    });

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Research updateSearch={this.searchNav} />
          <ScrollView>
            {!this.state.searchValue ? recipesList : queryList}
          </ScrollView>
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
