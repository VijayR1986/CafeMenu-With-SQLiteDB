import React from 'react';
import {Text, View, Button} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'user_db.db', createFromLocation: 1});

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tbl_user'",
        [],
        function (tx, results) {
          console.log('item:', results.row.length);
          if (results.rows.length == 0) {
            tx.executeSql('DROP TABLE IF EXISTS tbl_user', []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS tbl_user(product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name INTEGER, product_price INTEGER, product_quantity INTEGER)',
              [],
            );
          }
        },
      );
    });
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
        <View style={{padding: 5}}>
          <Button
            title="Product Details"
            color="#841584"
            onPress={() => this.props.navigation.navigate('ProductScreen')}
          />
        </View>
        <View style={{padding: 5}}>
          <Button
            color="#841584"
            title="Add Product"
            onPress={() => this.props.navigation.navigate('ProductAddScreen')}
          />
        </View>
        <View style={{padding: 5}}>
          <Button
            color="#841584"
            title="Delete Product"
            onPress={() =>
              this.props.navigation.navigate('ProductDeleteScreen')
            }
          />
        </View>
      </View>
    );
  }
}
