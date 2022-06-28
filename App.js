import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';


const App = () => {
  const [toggle, setToggle] = useState(false); //false

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(()=>{
  //Liga o flash do celular
    Torch.switchState(toggle);
    console.log('Trocou estado do flash!');
  }, [toggle]);

  useEffect(()=>{
    /*
    *Quando o celular for chacoalhado, mudamos o toggle
    */
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
  });
  // Essa função vai ser chamada quando o componente for desmontado
    return () => subscription.remove();
  }, []);

  return(
    <View style = {toggle ? style.container : style.containerLigth}>
        <Image 
          style = {toggle ? style.lightingOff : style.lightingOn}
          source = {
            toggle
            ? require('./assets/lampada_acesa.png')
            : require('./assets/lampada_apagada.png')}/>
     
      <TouchableOpacity 
        onPress= {handleChangeToggle}>

        <Image 
          style = {toggle ? style.lightingOn : style.lightingOff}
          source = {
            toggle
            ? require('./assets/rabisco_aceso.png')
            : require('./assets/rabisco_apagado .png')}/>
      </TouchableOpacity> 
    </View>

  );
};


export default App;

const style = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#323232',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerLigth:{
    flex: 1,
    backgroundColor: '#cdcdcd',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  
});