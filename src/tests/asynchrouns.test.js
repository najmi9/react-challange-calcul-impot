import Reat from 'react';

const fetchData = callback =>{
	setInterval(()=>{
		callback('peanut butter')
	}, 1000);
}

const fetchDataByPromise = () =>{
	return fetch('https://facebook.com');
}

test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }
  fetchData(callback);
});

test('the data is peanut butter', () => {
  return fetchDataByPromise().then(data => {
  	console.log(data)
    expect(data).toBe('peanut butter');
  }).catch(e=>{})
});


test("async await for promises case", async()=>{
     try {
     	const data = await fetchDataByPromise();
     	expect(data).toBeNull();
     } catch(e) {
     	 console.log(e)
     }
});


test('the fetch fails with an error', async () => {
  await expect(fetchDataByPromise()).rejects.toThrow('Network request failed');
});