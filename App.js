import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard } from "react-native";
import api from './src/services/api'

export default function App() {
  const [CepUser, setCepUser] = useState(null);
  async function buscar() {
    if (cep == '') {
      alert('digite um CEP valido');
      setCep('');
      return
    }
    try {
      const response = await api.get(`/${cep}/json`);
      console.log(response.data)
      setCepUser(response.data)
      Keyboard.dismiss()//garantir fechamento do teclado apos a busca
    } catch (error) {
      console.log('ERROR' + error)
    }

  }


  function limpar() {
    setCep('')
    inputRef.current.focus()
    setCepUser(null)
  }
  const [cep, setCep] = useState('')
  const inputRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.text}>Digite o CEP desejado:</Text>
        <TextInput
          style={styles.input}
          placeholder="EX:24742160"
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          keyboardType='numeric'
          ref={inputRef}
        />
      </View>
      <View style={styles.buttonArea}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#1d75cd' }]}
          onPress={buscar}>
          <Text style={styles.buttontext}>Buscar</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button}
          onPress={limpar}>
          <Text style={styles.buttontext}>Limpar</Text>
        </TouchableOpacity>
      </View>
      {CepUser &&
        <View style={styles.result}>
          <Text style={styles.itemText}>CEP:{CepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro:{CepUser.logradouro}</Text>
          <Text style={styles.itemText}>Cidade:{CepUser.localidade}</Text>
          <Text style={styles.itemText}>Bairro:{CepUser.bairro}</Text>
          <Text style={styles.itemText}>Estado:{CepUser.uf}</Text>
        </View>}
    </SafeAreaView>
  )
}
//_____________styles_____________________________
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: "bold",
    color: "black"
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18,
  },
  buttonArea: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },

  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  buttontext: {
    fontSize: 20,
    color: 'white'
  },
  result: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: { fontSize: 22 }
})