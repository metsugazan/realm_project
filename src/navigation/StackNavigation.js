import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import HomeScreen from '../screens/HomeScreen'
import DetailsScreen from '../screens/DetailsScreen'
import UpdateScreen from '../screens/UpdateScreen'
import AjoutScreen from '../screens/AjoutScreen'

import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator()

const StackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Accueil" options={{ title:"Bienvenue !", headerTitleAlign: 'center', headerStyle: { backgroundColor: '#2B6747' }, headerTitleStyle: { color: 'white' }, headerTintColor: 'white' }} component={HomeScreen} />
                <Stack.Screen name="Details" options={{title:"Détails", headerTitleAlign: 'center', headerStyle: { backgroundColor: '#2B6747' }, headerTitleStyle: { color: 'white' }, headerTintColor: 'white' }} component={DetailsScreen} />
                <Stack.Screen name="Mise à jour" options={{ headerTitleAlign: 'center', headerStyle: { backgroundColor: '#2B6747' }, headerTitleStyle: { color: 'white' }, headerTintColor: 'white' }} component={UpdateScreen} />
                <Stack.Screen name="Ajout" options={{ headerTitleAlign: 'center', headerStyle: { backgroundColor: '#2B6747' }, headerTitleStyle: { color: 'white' }, headerTintColor: 'white' }} component={AjoutScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation