import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TextInput } from 'react-native';
import { Modal, ListItem } from '../../components';
import styles from './style';
import { CATS } from '../../data/cats'

const List = ({ navigation }) => {

    const [catList, setCatList] = useState(CATS);
    const [search, setSearch] = useState("");
    const [itemSelected, setItemSelected] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const filteredCatList = search ?
            catList.filter((cat) => {
                return (cat.name.toLowerCase().includes(search.toLowerCase()))
            }
            )
            : CATS;
        setCatList(filteredCatList);
    }, [search]);

    const onHandleSearch = text => {
        setSearch(text);
    };

    const onHandleModal = item => {
        setItemSelected(item);
        setModalVisible(true);
    };

    const onCloseModal = () => {
        setModalVisible(false);
    };

    const onHandleDelete = item => {
        setCatList(prevState =>
            prevState.filter(element => element.name !== item.name)
        );
        onCloseModal();
    };

    const selectCat = (item) => {
        navigation.navigate("Item", {
            cat: item
        });
    };

    return (
        <View>
            <View style={styles.inputContainer}>
                <Text style={styles.titleContainer}>Cat List</Text>
                <View style={styles.addItemContainer}>
                    <TextInput
                        placeholder="search cat"
                        style={styles.input}
                        onChangeText={onHandleSearch}
                        value={search}
                    />
                </View>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={catList}
                    renderItem={
                        ({ item }) =>
                        (<ListItem cat={item}
                            onCloseModal={onCloseModal}
                            onHandleModal={onHandleModal}
                            selectCat={selectCat}
                        />)}
                    keyExtractor={item => item.id}
                />
            </View>
            <Modal
                isVisible={modalVisible}
                actionDeleteItem={() => onHandleDelete(itemSelected)}
                itemSelected={itemSelected}
                onCloseModal={onCloseModal}
            />
        </View>
    )
};

export default List;