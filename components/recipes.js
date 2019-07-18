import React from 'react';
import { Card, Button, Icon } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  ImageBackground
} from 'react-native';
import api from '../config';

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      ingredients: []
    };
  }

  /*This function is trigger when user click on more details. */
  /* It opens a model to get more information and ingredient for the selected recipe from the API */
  setModalVisible = () => {
    fetch(
      `https://www.food2fork.com/api/get?key=${api}&rId=${this.props.recipeId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(datarecipe => {
        this.setState({
          ingredients: datarecipe.recipe.ingredients
        });
      })
      .catch(error => {
        console.log('error', error);
      });
    this.setState({ modalVisible: true });
  };

  setModalInvisible = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const {
      recipeTitle,
      recipeUrl,
      recipePublisher,
      recipeRank,
      recipeSourceUrl,
      recipeId
    } = this.props;
    return (
      <View>
        <Card title={recipeTitle}>
          <Image
            style={{ width: 300, height: 200 }}
            source={{
              uri: recipeUrl
            }}
          />
          <Text style={{ marginBottom: 10 }}>
            Recipe Rank: {recipeRank} {'  '}
            Recipe Publisher: {recipePublisher}
          </Text>
          <Button
            icon={<Icon name="code" color="#ffffff" />}
            onPress={this.setModalVisible}
            backgroundColor="#03A9F4"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title="More Details"
          />
        </Card>

        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
          >
            <ImageBackground
              style={{ flex: 1, justifyContent: 'center' }}
              source={{ uri: recipeUrl }}
            >
              <View style={styles.backgroundView}>
                <Text style={styles.recipeTitle}>{recipeTitle}</Text>

                <View style={styles.recipeDetails}>
                  <Text style={styles.recipeItem}> Recipe Rank #</Text>
                  <Text> {recipeRank}</Text>
                  <Text style={styles.recipeItem}>Recipe Publiser:</Text>
                  <Text> {recipePublisher} </Text>
                  <Text style={styles.recipeItem}>Recipe Source Url:</Text>
                  <Text>{recipeSourceUrl}</Text>
                  <Text style={styles.recipeItem}> Recipe ID: </Text>
                  <Text> {recipeId}</Text>
                  <Text style={styles.recipeItem}>Ingredients:</Text>
                  <Text style={styles.listIngredients}>
                    {this.state.ingredients}
                  </Text>
                </View>
                <Button
                  title="Go back"
                  style={{ width: 200, marginBottom: 5, marginTop: 5 }}
                  backgroundColor="#022F40"
                  color="#FFFFFF"
                  onPress={this.setModalInvisible}
                />
              </View>
            </ImageBackground>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recipeItem: {
    fontWeight: 'bold',
    color: '#000000'
  },
  listIngredients: {
    color: '#000000'
  },
  recipeDetails: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  recipeTitle: {
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 17
  },
  backgroundView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  }
});

export default Recipes;
