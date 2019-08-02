/** mostra o tabuleiro em linhas e colunas */
import React from 'react'
import {View, StyleSheet } from 'react-native'
import Field from './Field'
/** props.board se refere a função de criação do tabuleiro do arquivo functions */
export default props => {
    const rows = props.board.map((row, r)=>{
        const columns = row.map((field, c)=>{
            //transfere os atributos field para o componente <Field>
            return <Field {...field} key={c} 
                onOpen={() => props.onOpenField(r, c)}/>
        })
        return <View key ={r}
            style={{flexDirection: 'row'}}>{columns}</View>
    })
    return <View style={styles.container}>{rows}</View>
}

const styles = StyleSheet.create({
    container: {
      //  flexDirection: 'row',
       backgroundColor: '#EEE',
    }
})