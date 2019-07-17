import React from 'react';
import {
  Card,
  ListItem,
  Button,
  Icon,
  Badge,
  ThemeConsumer
} from 'react-native-elements';
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
        console.log('datarecipe', datarecipe);
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
      recipeF2f,
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
            <ImageBackground style={{ flex: 1 }} source={{ uri: recipeUrl }}>
              <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
                <Button
                  title="Go back"
                  style={{ width: 200 }}
                  backgroundColor="#022F40"
                  color="#FFFFFF"
                  onPress={this.setModalInvisible}
                />

                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    marginTop: 5,
                    fontSize: 17
                  }}
                >
                  {recipeTitle}
                </Text>

                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Text style={{ fontWeight: 'bold' }}> Recipe Rank #</Text>
                  <Text> {recipeRank}</Text>
                  <Text style={{ fontWeight: 'bold' }}>Recipe Publiser:</Text>
                  <Text> {recipePublisher} </Text>
                  <Text style={{ fontWeight: 'bold' }}>Recipe Source Url:</Text>
                  <Text>{recipeSourceUrl}</Text>
                  <Text style={{ fontWeight: 'bold' }}> Recipe ID: </Text>
                  <Text> {recipeId}</Text>
                  <Text style={{ fontWeight: 'bold' }}>Ingredients:</Text>
                  <Text style={{ color: '#FFFFFF' }}>
                    {' '}
                    {this.state.ingredients}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </Modal>
        </View>
      </View>
    );
  }
}

export default Recipes;
