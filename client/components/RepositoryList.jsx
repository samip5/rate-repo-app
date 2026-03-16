import { FlatList, View, StyleSheet, TextInput, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../src/hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    backgroundColor: theme.colors.backgroundSecondary,
    padding: 10,
  },
  searchInput: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderColor: '#d1d5da',
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  picker: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ order, setOrder, searchKeyword, setSearchKeyword }) => {
  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search repositories"
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />
      <Picker
        selectedValue={order}
        onValueChange={(value) => setOrder(value)}
        style={styles.picker}
      >
        <Picker.Item label="Latest repositories" value="LATEST" />
        <Picker.Item label="Highest rated repositories" value="HIGHEST_RATED" />
        <Picker.Item label="Lowest rated repositories" value="LOWEST_RATED" />
      </Picker>
    </View>
  );
};

const getOrderVariables = (order) => {
  if (order === 'HIGHEST_RATED') {
    return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
  }

  if (order === 'LOWEST_RATED') {
    return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
  }

  return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
};

const RepositoryList = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState('LATEST');
  const [searchInput, setSearchInput] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const timeoutId = globalThis.setTimeout(() => {
      setSearchKeyword(searchInput);
    }, 400);

    return () => globalThis.clearTimeout(timeoutId);
  }, [searchInput]);

  const variables = {
    ...getOrderVariables(order),
    searchKeyword,
    first: 8,
  };

  const { repositories, fetchMore } = useRepositories(variables);

  const onRepositoryPress = (id) => {
    navigate(`/repositories/${id}`);
  };

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => onRepositoryPress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={
        <RepositoryListHeader
          order={order}
          setOrder={setOrder}
          searchKeyword={searchInput}
          setSearchKeyword={setSearchInput}
        />
      }
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryList;