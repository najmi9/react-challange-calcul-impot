import React from 'react';
import SimpleFunc from '../components/simpleFunc';
import { render } from '@testing-library/react';

test('renders learn react link', () => {
  const { getByText } = render(<SimpleFunc y={'hello i am from test'} />);
  const linkElement = getByText(/hello i am from test/);
  const h2 = document.querySelector('h2');
  const h1 = document.querySelector('h1');
  expect(h2).not.toBeNull();
  expect(h1).not.toBeNull();
  expect(linkElement).toBeInTheDocument();
});

