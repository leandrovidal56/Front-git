import React from 'react';
import { FaGitAlt} from 'react-icons/fa';

import { Container } from './styles'

export default function Header() {
  return (
    <Container>
      <img
        src={
          'https://image.flaticon.com/icons/svg/25/25231.svg'
        }
      />
      <h1>
        <FaGitAlt />
        Repositórios
      </h1>

    </Container>
  )
}
