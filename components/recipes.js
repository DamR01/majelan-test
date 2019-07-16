import React from 'react';
import { Card, ListItem, Button, Icon, Badge } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  ImageBackground
} from 'react-native';

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  setModalVisible = () => {
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
      recipeF2f
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

                <View>
                  <Text style={{ color: '#FFFFFF' }}>
                    Recipe Rank #{recipeRank}
                  </Text>

                  <Text style={{ color: '#FFFFFF' }}>
                    Recipe Publiser: {recipePublisher}
                    Recipe Source Url: {recipeSourceUrl}
                    Recipe F2F: {recipeF2f}
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
