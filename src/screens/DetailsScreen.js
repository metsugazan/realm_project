
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


import { realm } from '../database/GetRealmApp';
const DetailsScreen = ({ route, navigation }) => {

    const { title, author, category, _id } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Image style={{ height: '65%', width: '30%', marginLeft: -20, marginRight: 25 }} source={require('../images/book.png')} />
                <View>
                    <Text style={styles.txtBoxTitle}>{title}</Text>
                    <Text style={styles.txtBox}>Auteur : {author}</Text>
                    <Text style={styles.txtBox}>Catégorie : {category}</Text>
                    <Text><Icon name="star" size={22} style={{ color: '#9F8236' }} />
                        <Icon name="star" size={22} style={{ color: '#9F8236' }} />
                        <Icon name="star" size={22} style={{ color: '#9F8236' }} />
                        <Icon name="star" size={22} style={{ color: '#9F8236' }} />
                        <Icon name="star-outline" size={22} style={{ color: '#9F8236' }} /></Text>
                    <Text><Icon name="menu-book" size={32} style={{ color: 'black' }} /></Text>
                </View>
            </View>


            <TouchableOpacity style={styles.btn} onPress={() => {
                const book_ = realm.objects("Book_");
                book_.map(booking => {
                    realm.write(() => {
                        realm.delete(booking);
                        navigation.navigate('Accueil');
                    })

                })
            }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Supprimer le livre</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}
                onPress={() => { navigation.navigate('Mise à jour', { title_: title, author_: author, category_: category, _id: _id }); }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Modifier le livre</Text>
            </TouchableOpacity>
        </View>
    )

}

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADADAD',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        backgroundColor: '#9F8236',
        marginVertical: 10,
        height: 50,
        borderRadius: 30,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6.84,
        elevation: 5
    },
    textInput: {
        borderColor: '#9F8236',
        fontSize: 17,
        height: 50,
        width: 300,
        borderWidth: 2,
        paddingHorizontal: 15,
        marginVertical: 10,
        backgroundColor: '#2B6747',
        borderRadius: 10,
        color: '#838383',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6.84,
        elevation: 5
    },
    txtBoxTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    box: {
        marginVertical: 5,
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
});