import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Realm from 'realm';

import { BookSchema_ } from '../schemas/BookSchema';
import { realm } from '../database/GetRealmApp';


const HomeScreen = ({ navigation }) => {

  const [book, setBook] = useState([]);

  useEffect(() => {
    Realm.open({
      schema: [BookSchema_],
      deleteRealmIfMigrationNeeded: true,
    }).then(realm => {
      const book = realm.objects('Book_');
      setBook([...book]);
      try {
        book.addListener(() => {
          setBook([...book]);
        });
      }
      catch (error) {
        console.error(
          `Impossible de mettre à jour la liste. Exception listener : ${error}`
        );
      }
      return () => {
        book.removeAllListeners();
        realm.close();
      };
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des livres</Text>
      <Searchbar
        placeholder="Rechercher"
        style={{ flexDirection: 'row-reverse', borderRadius: 20, backgroundColor: 'lightgray', marginBottom: 10, marginHorizontal: 10 }}
      //value={search}
      />
      <View style={{ flex: 0.05, flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.filter}><Text style={styles.txtfilter}>SF</Text></TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.filter}><Text style={styles.txtfilter}>Polar</Text></TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.filter}><Text style={styles.txtfilter}>Voyage</Text></TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.filter}><Text style={styles.txtfilter}>Roman</Text></TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {book.map((book, index) => (
          <TouchableOpacity key={index} onPress={() => {
            navigation.navigate('Details', {
              _id: String(book._id),
              title: book.title,
              author: book.author,
              category: book.category

            })
          }}><View key={index} style={styles.box}>
              <Image style={{ height: '65%', width: '30%', marginLeft: -20, marginRight: 25 }} source={require('../images/book.png')} />
              <View>
                <Text style={styles.txtBoxTitle}>{book.title}</Text>
                <Text style={styles.txtBox}>Auteur : {book.author}</Text>
                <Text style={styles.txtBox}>Catégorie : {book.category}</Text>
                <Text><Icon name="star" size={22} style={{ color: '#9F8236' }} />
                <Icon name="star" size={22} style={{ color: '#9F8236' }} />
                <Icon name="star" size={22} style={{ color: '#9F8236' }} />
                <Icon name="star" size={22} style={{ color: '#9F8236' }} />
                <Icon name="star-outline" size={22} style={{ color: '#9F8236' }} /></Text>
               <Text><Icon name="menu-book" size={32} style={{ color: 'black' }} /></Text>
              </View>
            </View>
          </TouchableOpacity>
        )
        )}

      </ScrollView>

      <View style={{ flex: 0.3, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Ajout')} style={styles.btn}>
          <Text style={styles.btnTxt}>Ajouter{"\n"}un{"\n"}livre</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} 
        onPress={() => { realm.write(() => { realm.deleteAll() }) 
        }}>
          <Text style={styles.btnTxt}>Effacer{"\n"}toute{"\n"}la base</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ADADAD',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    backgroundColor: '#9F8236',
    borderRadius: 100,
    height: 100,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 5
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  filter: {
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 5,
    backgroundColor: 'gray',
    borderRadius: 5,
    marginHorizontal: 10
},
txtfilter: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center'
},
  box: {
    marginVertical: 8,
    borderWidth: 3,
    borderColor: '#9F8236',
    borderRadius: 20,
    backgroundColor: "#2B6747",
    width: 360,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 5
  },
  txtBox: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  txtBoxTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 5
  }
});


export default HomeScreen;
