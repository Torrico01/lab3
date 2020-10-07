import React from 'react';
import './App.css';

const commitInfos = [
  {
        sha: "cce87c5de9feacd31ad8bb5adb0fb1f99b87b5fd",
        commit: {
            message: " Merge branch ’master’ of https://github.com/fulano/novorepo",
            author: {
                name: "fulano",
                date: " 2020-06-26 T18:40:01Z",
            },
        },
    },
    {
        sha: "83064a8849412eb54b1453b57694f56c415bc801",
        commit: {
            message: "Adicionar apresentacao pessoal em ingles",
            author: {
                name: "beltrano",
                date: "2020-06-26 T18:39:21Z",
            },
        },
    }
];

console.log(commitInfos[0].commit);

function TitleCard(props) {
  return (
  <h2>Hello {props.name}</h2>
  );
}

function CommitsTable(props) {
  const {list, onDismiss, searchTerm, onSearchChange} = props;
  return (
    <div>
      <form>
        <input type="text"
        placeholder="Search by Commit Message"
        value={searchTerm}
        onChange={onSearchChange}
        />
      </form>
      <table id="tabela-commits">
          <thead>
            <tr>
              <th>Commit</th>
              <th>Autor</th>
              <th>Name</th>
              <th>Mensagem</th>
            </tr>
          </thead>
          <tbody>
          {
            list.map((info) => {
              return (
                <tr key={info.sha}>
                  <td>{info.sha.slice(0,6)}</td>
                  <td>{info.commit.author.name}</td>
                  <td>{info.commit.author.date}</td>
                  <td>{info.commit.message}</td>
                  <td>
                    <button onClick={() => {onDismiss(info.sha)}}>
                      Dismiss
                    </button>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: commitInfos,
      title1: "Kenzo",
      title2: "Tamashiro",
      title3: "Decker",
      searchTerm: ''
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearhChange = this.onSearchChange.bind(this);
  }

  onDismiss(hash) {
    const updatedList = this.state.list.filter(item => item.sha != hash);
    this.setState({list: updatedList});
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  onAddJr(title) {
    this.setState ((state, props) => (
      {[title]: state.[title] + " Jr."}
    ));
  }

  render() {
    const {title1, title2, title3, list, searchTerm} = this.state;
    return (
      <div className="App">
        <TitleCard name={title1} />
        <button onClick={() => this.onAddJr('title1')}> Add Jr. </button>
        <TitleCard name={title2} />
        <button onClick={() => this.onAddJr('title2')}> Add Jr. </button>
        <TitleCard name={title3} />
        <button onClick={() => this.onAddJr('title3')}> Add Jr. </button>
        <h2>{searchTerm}</h2>
        <CommitsTable 
          list={list} 
          onDismiss={this.onDismiss}
          searchTerm={searchTerm}
          onSearchChange={this.onSearchChange}
        />
      </div>
    )
  }
}

export default App;

