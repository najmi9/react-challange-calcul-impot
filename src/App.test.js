import { calculTax,  calculRevenu, nbOfPart} from './taxHelper';


test('test nbOfPart function', ()=>{
    const senarios = [
       { 'isMarried':false, 'childs':0 },
       { 'isMarried':false, 'childs':2 },
       { 'isMarried':true, 'childs':3 },
    ];
    expect(nbOfPart(senarios[0].isMarried, senarios[0].childs)).toEqual(1);
    expect(nbOfPart(senarios[1].isMarried, senarios[1].childs)).toEqual(2);
    expect(nbOfPart(senarios[2].isMarried, senarios[2].childs)).toEqual(4);
});

test('test calculTax function', ()=>{
  // examles in docs
   const senarios = [
      {'revenu':32000, 'np':1},
      {'revenu':55950, 'np':3}
   ];
   expect(calculTax(senarios[0].revenu, senarios[0].np).tax).toEqual(3617.34)
   expect(calculTax(senarios[1].revenu, senarios[1].np).tax).toEqual(2833.05)
});

test('test calculRevenu function', ()=>{
   // we calcul the revenu of the rest that we get in last test
   const senarios = [
       { 'rest' : 32000-3617.34, 'np' : 1}, 
       {'rest' : 55950-2833.05, 'np': 3}
   ];

    expect(calculRevenu(senarios[0].rest, senarios[0].np)).toEqual(32000.000000000004);
    expect(calculRevenu(senarios[1].rest, senarios[1].np)).toEqual(55949.999999999985
);
});