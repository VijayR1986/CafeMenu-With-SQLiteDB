import React from 'react';
import {ScrollView, View, Text, FlatList, StyleSheet} from 'react-native';
// import SQLite from 'react-native-sqlite-storage';

import {openDatabase} from 'react-native-sqlite-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

var db = openDatabase({name: 'user_db.db', createFromLocation: 1});
// let db = SQLite.openDatabase({name: 'ProductDatabase', createFromLocation: 1});

export default class ProductScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tbl_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}} />
    );
  };

  render() {
    return (
      <ScrollView>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View
              key={item.product_id}
              style={{backgroundColor: 'white', padding: 20}}>
              <TouchableOpacity>
                <View style={{flexDirection: 'row', borderRadius: 2}}>
                  <Text>{item.product_id} </Text>
                  <Text>{item.product_name} </Text>
                  <Text>{item.product_price} </Text>
                </View>
                <Text>Quantity: {item.product_quantity}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
    );
  }
}
