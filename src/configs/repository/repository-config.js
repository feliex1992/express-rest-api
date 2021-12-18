const repositoriesList = [];

class RepositoryConfig {
  constructor () {
    if (repositoriesList.length > 0) {
      return repositoriesList.reduce(
        (result, current) => {
          return Object.assign(result, current);
        }
      );
    } else {
      return [];
    }
  }
}

module.exports = { repositoriesList, RepositoryConfig };
