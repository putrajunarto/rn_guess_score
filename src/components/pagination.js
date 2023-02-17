// React Native Pagination
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Pagination = (props) => {
  const { page, totalPage, onChangePage } = props;
  const [currentPage, setCurrentPage] = React.useState(page);
  const [totalPageState, setTotalPageState] = React.useState(totalPage);

  React.useEffect(() => {
    setCurrentPage(page);
    setTotalPageState(totalPage);
  }
  , [page, totalPage]);

  const onPrev = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  }

  const onNext = () => {
    if (currentPage < totalPageState) {
      onChangePage(currentPage + 1);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrev} style={styles.btnPrev}>
        <Text style={styles.textPrev}>Prev</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{currentPage} / {totalPageState}</Text>
      <TouchableOpacity onPress={onNext} style={styles.btnNext}>
        <Text style={styles.textNext}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnPrev: {
    backgroundColor: '#00c20b',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  textPrev: {
    color: '#fff',
  },
  btnNext: {
    backgroundColor: '#00c20b',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  textNext: {
    color: '#fff',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 5,
  },
  text: {
    fontWeight: 'bold',
    color: '#333',
  }
});

export default Pagination;
