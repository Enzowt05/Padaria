import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Button, ActivityIndicator, Alert, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { ref, onValue, remove } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';

const ProductList = ({ navigation }) => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const produtosRef = ref(database, 'produtos');
        const fetchProdutos = () => {
            onValue(produtosRef, (snapshot) => {
                const data = snapshot.val();
                const produtosList = [];
                for (let id in data) {
                    produtosList.push({ id, ...data[id] });
                }
                setProdutos(produtosList);
                setLoading(false);
            }, (error) => {
                console.error('Erro ao buscar produtos:', error);
                setLoading(false);
            });
        };

        fetchProdutos();
        return () => {
            produtosRef.off();
        };
    }, []);

    const handleDelete = (nome) => {
        try {
            remove(ref(database, `produtos/${nome}`)); // Deletar pelo nome do produto
            Alert.alert('Sucesso', 'Produto deletado com sucesso!');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao deletar produto: ' + error.message);
        }
    };

    const handleUpdate = (item) => {
        navigation.navigate('ProductForm', { product: item });
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Pressable
                    style={styles.addButton}
                    onPress={() => navigation.navigate('ProductForm')}>
                    <Text style={styles.addButtonText}>Add Product</Text>
                </Pressable>
                <Text style={styles.title}>Produtos:</Text>
                <FlatList
                    data={produtos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.productContainer}>
                            <Text style={styles.productName}>{item.nome}</Text>
                            <Text style={styles.productPrice}>Preço: R$ {item.preco}</Text>
                            <Text style={styles.productInfo}>Descrição: {item.descricao}</Text>
                            <Text style={styles.productAvailability}>Disponibilidade: {item.disponibilidade ? 'Disponível' : 'Indisponível'}</Text>
                            <Text style={styles.productInfo}>Categoria: {item.categoria}</Text>
                            <View style={styles.buttonContainer}>
                                <Pressable
                                    style={styles.buttonAtual}

                                    onPress={() => handleUpdate(item)}>
                                    <Text style={styles.buttonAtual}>Atualizar</Text>
                                </Pressable>
                                <Pressable
                                    style={styles.buttonDelete}
                                    onPress={() => handleDelete(item.nome)}>
                                    <Text style={styles.buttonDelete}>Deletar</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        padding: 16,
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        textDecorationLine: 'underline',
        color: '#814904'
    },
    productContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
    },
    productInfo: {
        marginBottom: 8,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 16,
        marginBottom: 4,
    },
    productAvailability: {
        fontSize: 14,
        color: '#777',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        padding: 8,
        borderRadius: 4,
    },
    buttonDelete: {
        backgroundColor: '#810404',
        margin: '10px',
        height: '30px',
        borderRadius: 5,
        alignSelf: 'center',
        color: 'white'

    },
    buttonAtual: {
        backgroundColor: '#814904',
        margin: '10px',
        height: '40px',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 5,
        color: 'white'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ProductList;
