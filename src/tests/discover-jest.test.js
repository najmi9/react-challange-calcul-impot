import React from 'react';
import some from '../components/some';


test("assert the some return correct value", ()=>{
	expect(some(1,2)).toBe(3);
});

test("object assignment :", ()=>{
   let data = {one:1};
   data['two'] = 2;
   expect(data).toEqual({one:1, two:2});
});

test("adding positive numbers is not null", ()=>{
	for (let i = 1, l = 4; i < l; ++i) {
	   for (var j = 0, m = 6; j < m; ++j) {
	        expect(i+j).not.toBe(0); 
	    } 
	}
});

test("to truthy", ()=>{
   const x = true;
   const y = false;
   const z = null;
   const w = undefined;
   expect(x).toBeTruthy();
   expect(y).toBeFalsy();
   expect(z).toBeNull();
   expect(w).toBeUndefined();
});

test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test('table contain a specific value', ()=>{
	const table = ['banana', 'apple', 'orange', 'mango'];
	expect(table).toContain('banana');
});

const compileAndroidCode = () =>{
	throw new Error("you are using thr wrong JDK");
}

test("test the exceptions :", ()=>{
	expect(compileAndroidCode).toThrow('you are using thr wrong JDK');
});

test("test if tests works", ()=>{
  expect(5-2).toEqual(3);
})


