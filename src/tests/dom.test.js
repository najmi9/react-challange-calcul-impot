import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Component from '../components/component';
import { screen } from '@testing-library/dom';


test("fuck ain't working", ()=>{
	render(<Component className="Ooops" />);
    const input = screen.getByText( 'login !')
    const btn = document.querySelector('button');
    const handleClick = jest.fn(x=>x);
    fireEvent.click(input);
    console.log(fireEvent.click(input));

    expect(handleClick.mock.calls.length).toBe(0);
})

