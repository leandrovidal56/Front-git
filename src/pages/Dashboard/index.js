import React, {Component} from 'react';
import { connect } from 'react-redux';
import { FaPlus, FaSpinner} from 'react-icons/fa'
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { SubmitButton, List, Form} from './styles';
import Container from '../../components/Container';
import Header from '../../components/Header';
import {Input} from '@rocketseat/unform';
import CombineReducers from '../../store/modules/rootReducer';

class Dashboard extends Component {
  state={
    newRepository: '',
    repositories: [],
    loading: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({repositories: JSON.parse(repositories) });
    }
  }

  async componentDidUpdate( _, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories))
    }
   }

    handleInputChange = e => {
    this.setState({ newRepository:
      e.target.value
    });
  };


  errors = (e) => {
    toast.error(e);
    this.setState({
      newRepository: '',
      loading: false,
    })
  }


  handleSubmit = async e => {
    try {
          e.preventDefault();
          this.setState({ loading: true});
          const { newRepository, repositories}  = this.state;
            const response = await api.get(`/repos/${newRepository}`)

            const data = {
            name: response.data.full_name,
          }

          ;


          this.setState({
            repositories: [...repositories, data ],
            loading: false,
            newRepository: '',
          })
        }
    catch(err)  {
        console.log(err.response);
        if(err.response.status === 404){
          this.errors('Please enter a company valid cia and repositories')
          return;
        }

        if(err.response.status === 403 && err.response.statusText === 'Forbidden') {
          this.errors('retry limit higher than normal, try again later')
          return;
        }

        this.errors('Something went wrong, try again!');
      }
    }






  handleAddRepositories =  newRepository  => {
     const  {dispatch} = this.props;
    dispatch({
      type: 'ADD_TO_LIST',
      newRepository,
    });
  };

  render() {
    const { newRepository, repositories, loading } = this.state;

    return (
    <Container>
      <Header />
      <Form
       onSubmit ={this.handleSubmit} > {
          <Input
            name="repositories"
            type="text"
            placeholder= "Adicione o nome do repositório"
            value={newRepository}
            onChange={this.handleInputChange}
            required="Campo obrigatório"
           /> }

         <SubmitButton
           onClick={ () =>this.handleAddRepositories(newRepository)}>
           { loading ? (
             <FaSpinner color="#fff" size={14}/>
             ) : (
             <FaPlus color="#fff" size={14} />)
            }
         </SubmitButton>
        </Form>
          <List>
            {repositories.map(repository => (
              <li key={repository.name} >
                <span>{CombineReducers&&repository.name}</span>
                <Link to={`/repositories/${encodeURIComponent(repository.name)}`}>Details
                </Link>

              </li>
              ))}
         </List>
      </Container>
);
}
}
export default connect(state => ({ newRepositorySize: state.newRepository.length,}))(Dashboard);

