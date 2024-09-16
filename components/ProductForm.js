import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, TextInput, Switch, Alert, Pressable, TouchableOpacityComponent } from 'react-native';
import { database } from '../firebase/firebaseConfig'; // Ajuste o caminho conforme necessário
import { ref, set } from 'firebase/database';

const ProductForm = ({ navigation }) => {
    const [produtoNome, setProdutoNome] = useState('');
    const [produtoPreco, setProdutoPreco] = useState('');
    const [produtoDescricao, setProdutoDescricao] = useState('');
    const [produtoDisponibilidade, setProdutoDisponibilidade] = useState(false);
    const [produtoCategoria, setProdutoCategoria] = useState('');

    const handleAddProduto = async () => {
        if (!produtoNome || !produtoPreco || !produtoDescricao || !produtoCategoria) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios.');
            return;
        }

        if (isNaN(produtoPreco)) {
            Alert.alert('Erro', 'O preço deve ser um número.');
            return;
        }

        const newProduto = {
            nome: produtoNome,
            preco: parseFloat(produtoPreco),
            descricao: produtoDescricao,
            disponibilidade: produtoDisponibilidade,
            categoria: produtoCategoria
        };

        try {
            const produtoRef = ref(database, `produtos/${produtoNome}`);
            await set(produtoRef, newProduto);
            Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
            navigation.goBack(); // Voltar para a tela anterior
        } catch (error) {
            Alert.alert('Erro', 'Erro ao adicionar produto: ' + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome do Produto"
                value={produtoNome}
                onChangeText={setProdutoNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Preço do Produto"
                value={produtoPreco}
                onChangeText={setProdutoPreco}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Descrição do Produto"
                value={produtoDescricao}
                onChangeText={setProdutoDescricao}
            />
            <View style={styles.switchContainer}>
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Disponibilidade"
                    value={produtoDisponibilidade ? 'Disponível' : 'Indisponível'}
                    editable={false}
                />
                <Switch
                    value={produtoDisponibilidade}
                    onValueChange={(value) => setProdutoDisponibilidade(value)}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Categoria do Produto"
                value={produtoCategoria}
                onChangeText={setProdutoCategoria}
            />
            <Button onPress={handleAddProduto} title='Adicionar' />

            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        width: '100%',
        paddingHorizontal: 8,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    addButton: {
        backgroundColor: '#F6D091',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        width: '150px',
    },
    addButtonText: {
        color: '#B07730',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default ProductForm;
