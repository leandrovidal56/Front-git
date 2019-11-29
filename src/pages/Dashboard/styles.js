import styled, { keyframes, css} from 'styled-components';


export const Form = styled.form`
  margin-top: 40px;
  display:flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 0.5px solid #eee;
    padding: 10px 15px;
    border-radius: 10px;
    font-size: 16px;
  }
`;
const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;
export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #38D430;
  border: 0.5px;
  padding: 0 15px;
  margin-left: 10px;
  border-radius:10px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.9;
    color: #7159c1;
  }

  ${props => props.loading &&
  css`
  svg{
    animation: ${rotate} 2s linear infinite;
  }
  `
  }
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;


  & + li {
    border-top: 1px solid #eee;
  }

  a {
    color: #38D430;
    text-decoration: none;
  }

  span {
  max-width: 550px; /* Tamanho */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
  }

  }
`;
