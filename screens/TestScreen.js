import React from 'react';
import { connect } from "react-redux";
import { FlatList, ScrollView, SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { uniqBy } from 'lodash';
import { searchUserRepos } from '../actions/test_action';

class TestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  static navigationOptions = {
    title: 'Repo Finder',
  };

  searchUser = (text) => {
    this.props.searchUserRepos(text);
  }

  renderSections = (repos) => {
    // return repos.map(repo =>  ({ ...repo, key: repo.id.toString() }))
    const repoNames = repos.map(repo => repo.name.toLowerCase());
    console.log('repoNames: ', repoNames);
    const firstLetters = repos.map(repo => {
        return {
            title: repo.name[0],
            data: repoNames.filter(name => name.startsWith(repo.name[0].toLowerCase()))
        }
    })
    console.log('firstLetter: ', uniqBy(firstLetters, 'title'));
    return uniqBy(firstLetters,'title');
  }

  render() {
    const { repos } = this.props;
    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={{height: 40}}
          placeholder="Enter username"
          onSubmitEditing={(event) => this.searchUser(event.nativeEvent.text)}
        />
        <View>
            {repos.length === 0 ? 
                <Text>No user found</Text>:
                <SectionList
                    sections = {this.renderSections(repos)}
                    renderItem={({item}) => <View><Text style={styles.item}>{item}</Text></View>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
                // <FlatList
                //     data = {this.renderSections(repos)}
                //     renderItem = {({item}) => <View>
                //         <Text style={styles.item}>{item.name}</Text>
                //         <Text style={styles.item}>{item.language}</Text>
                //     </View>}
                //     // keyExtractor={(item) => item.id.toString()}
                // />
            }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
});

function mapStateToProps({ testReducer }) {
    return {
        repos: testReducer.repos
    }
}

export default connect(mapStateToProps, { searchUserRepos })(TestScreen);