
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';

import { realm } from '../database/GetRealmApp';

import { Formik } from 'formik';
import * as Yup from 'yup';

const UpdateScreen = ({ route, navigation }) => {

    const {_id,title_, author_, category_} = route.params;

    const [title, setTitle] = useState(title_);
    const [author, setAuthor] = useState(author_);
    const [category, setCategory] = useState(category_);



    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(3, 'Titre trop court')
            .max(70, 'Titre trop long')
            .required('Champ requis'),
        author: Yup.string()
            .min(2, 'Trop court')
            .max(40, 'Trop long')
            .required('Champ requis'),
        category: Yup.string()
            .min(2, 'Trop court')
            .max(25, 'Trop long')
            .required('Champ requis'),
    });

    const initialValues = {
        title: title,
        author: author,
        category: category
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => { }}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (

                <View style={{flex:1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>Modifier le livre</Text>
                    <TextInput style={styles.textInput} label="Titre du livre" returnKeyType="next"
                        value={values.title} onChangeText={handleChange('title')} onBlur={handleBlur("title")}></TextInput>

                    {errors.title && touched.title ? <Text style={{ color: 'red' }}>{errors.title}</Text> : null}

                    <TextInput style={styles.textInput} onChangeText={handleChange('author')}
                        value={values.author} onBlur={handleBlur("author")} label="Auteur" returnKeyType="next"></TextInput>

                    {errors.author && touched.author ? <Text style={{ color: 'red' }}>{errors.author}</Text> : null}


                    <TextInput style={styles.textInput}
                        onChangeText={handleChange('category')} onBlur={handleBlur("category")} value={values.category}
                        label="Catégorie" returnKeyType="done"></TextInput>

                    {errors.category && touched.category ? <Text style={{ color: 'red' }}>{errors.category}</Text> : null}

                    <TouchableOpacity style={styles.btn} onPress={() => {
                        handleSubmit();
                        if (isValid) {
                            const book_ = realm.objects("Book_");
                            book_.map((booking, index) => {
                                if ((typeof (booking) != 'undefined') && (String(booking._id) == String(_id))) {
                                    realm.write(() => {
                                        const actual = book_[index]
                                        actual.title = String(values.title);
                                        actual.author = String(values.author);
                                        actual.category = String(values.category);

                                        navigation.navigate('Accueil');
                                    })
                                }
                            })
                        }
                    }}><Text style={{ color: 'white', fontSize:20, fontWeight:'bold' }}>Modifier</Text></TouchableOpacity>
                </View>
            )}
        </Formik>
    )

}

export default UpdateScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B6747',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        backgroundColor: '#9F8236',
        marginVertical: 10,
        height: 50,
        borderRadius: 30
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
    }
});