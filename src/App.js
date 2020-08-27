import React, { useState } from 'react';

function App() {

  const [revenu, setRevenu] = useState('');
  const [impot, setImpot] = useState('');
  const [rest, setRest] = useState('');
  const [childs, setChilds] = useState(0);
  const [isMarried, setIsMarried] = useState(false);
  const [details, setDetails] = useState(false);
  const [tranches, setTranches] = useState([]);
  const [nbp, setNbp] = useState(1) //nombre de part

  // les valeurs sont prenus à partir du diagramme qui dans le site de l'état
  const T1 = 10064; const T2 = 25659; const T3 = 73369; const T4 = 157806;

  const Data = [
    { 'impot': 0, 'min': 0, 'max': T1 },
    { 'impot': 0.11, 'min': T1, 'max': T2 },
    { 'impot': 0.30, 'min': T2, 'max': T3 },
    { 'impot': 0.41, 'min': T3, 'max': T4 },
    { 'impot': 0.45, 'min': T4, 'max': '∞' },
  ];

  const L1 = (T2 - T1) * 11 / 100
  const L2 = (T3 - T2) * 30 / 100
  const L3 = (T4 - T3) * 41 / 100

  const monImpot = (rni, NbP) => {
    // quotient familial = revenu net imposable / nombre de part
    const QF = (rni / NbP)
    let impot = 0;
    // un tableau qui va contient combien un personne payé pour une tranche
    let taxes = [0];

    if (QF > T1 && QF <= T2) {
      impot = (QF - T1) * (11 / 100)
      taxes[1] = impot;
    } else if (QF > T2 && QF <= T3) {
      impot = L1 + (QF - T2) * (30 / 100) //relation(1)
      taxes[1] = L1; taxes[2] = (QF - T2) * (30 / 100);
    } else if (QF > T3 && QF <= T4) {
      impot = L1 + L2 + (QF - T3) * (41 / 100)  //relation(2)
      taxes[1] = L1; taxes[2] = L2; taxes[3] = (QF - T3) * (41 / 100)
    } else if (QF > T4) {
      impot = L1 + L2 + L3 + (QF - T4) * (45 / 100)  //relation(3)
      taxes[1] = L1; taxes[2] = L2; taxes[3] = L3; taxes[4] = (QF - T4) * (45 / 100)
    }
    setNbp(NbP)
    setTranches(taxes);
    setDetails(true)
    return impot * NbP
  }

  //return le nombre de part selon ce qui tapé
  const nbOfPart = () => {
    let NbP = 1;
    if (isMarried) {
      if (childs < 3) {
        NbP = 2 + childs * 0.5;
      } else {
        NbP = 2 + 2 * 0.5 + (childs - 2) * 1;
      }
    } else {
      if (childs < 3) {
        NbP = 1 + childs * 0.5;
      } else {
        NbP = 1 + 2 * 0.5 + (childs - 2) * 1;
      }
    }
    return NbP;
  }
  // return le prix qu'il faut partient pour une reste tapé après l'impot 
  const travailInverse = rest => {
    let myRevenu = 0;
    if (rest <= T1) {
      myRevenu = rest;
    } else if (T1 < rest && rest <= (T2 - L1)) { // dans cet interval l'mposition = 0.11
      myRevenu = ((rest - (T1 * 0.11)) / (1 - 0.11));

    } else if ((T2 - L1) < rest && rest <= (T3 - L2)) {
      //d'après la relation(1) on peut deduire facilement le revenu en fonction de rest 
      myRevenu = (rest + L1 - 0.3 * T2) / (1 - 0.3);
    } else if ((T3 - L2) < rest && rest <= (T4 - L3)) {
      myRevenu = (rest + L1 + L2 - 0.41 * T3) / (1 - 0.41);// deduit à partir de relation(2)
    } else if ((T4 - L3) < rest) {
      myRevenu = (rest + L1 + L2 + L3 - 0.45 * T3) / (1 - 0.45);// deduit à partir de relation(2)
    }
    return myRevenu;
  }

  const handleState = ({ currentTarget }) => {
    setIsMarried(currentTarget.value == "married" ? true : false);
  }

  const handleNumberChilds = ({ currentTarget }) => {
    setChilds(parseInt(currentTarget.value));
  }

  const handleRevenuChange = ({ currentTarget }) => {
    const myRevenu = parseInt(currentTarget.value);
    setRevenu(myRevenu);
    const NbP = nbOfPart();
    setImpot(monImpot(myRevenu, NbP));
    setRest(myRevenu - monImpot(myRevenu, NbP));

  }
  const handleRestChange = ({ currentTarget }) => {
    const rest = parseInt(currentTarget.value);
    setRest(rest);
    const myRevenu = travailInverse(rest);
    setRevenu(myRevenu);
    const NbP = nbOfPart();
    setImpot(monImpot(myRevenu, NbP));
  }

  return (
    <div className="container m-5 p-5">
      <div>
        <p className="form-group">
          <label>
            <input type="radio" value="single"
              name="state" onChange={handleState} />
            Célibataire, divorcé ou veuf
          </label>
        </p>
        <p className="form-group">
          <label>
            <input type="radio" value="married"
              name="state" onChange={handleState} />
            Couple marié ou pacsé
          </label>
        </p>
        <p>
          <label><input type="number" className="form-control"
            name="childs" placeholder="nombre d'enfants"
            onChange={handleNumberChilds} />
          </label>
        </p>
      </div>
      <div>
        <p>Revenu en €:
           <input type="number" name="revenu" className="form-control"
            onChange={handleRevenuChange} value={revenu}
            placeholder='votre revenu manual'
          />
        </p>
        <p>Impot en €:
          <input type="number" name="impot" placeholder="impôt à payer"
            value={impot} className="form-control" />
        </p>
        <p>Rest après impôt en €:
          <input type="number" name="rest" value={rest} placeholder="rest après le paiement de'impôt"
            onChange={handleRestChange} className="form-control" />
        </p>
      </div>
      {details && (<div className="container bg-light">
        <table className="table">
          <thead>
            <tr>
              <th>Numéro de tranche : </th>
              <th>imposition de tranche : </th>
              <th> tranche compris entre (€): </th>
              <th> prix payé en cette tranche (€) x part </th>
            </tr>
          </thead>
          <tbody>
            {tranches.map((tranche, index) => (
              <tr key={index}>
                <td> {index + 1} </td>
                <td> {Data[index].impot * 100} % </td>
                <td> {Data[index].min} - {Data[index].max} (€) </td>
                <td> {tranche}€ x {nbp} </td>
              </tr>))
            }

            <tr>
              <td> Total d'impot payé :</td>
              <td> <strong> {impot} €</strong></td>
              <td> pourcentage  de ton salaire payé :  </td>
              <td> <strong> {revenu != 0 ? (impot / revenu) * 100 : 0} % </strong> </td>
            </tr>
          </tbody>
        </table>
      </div>)
      }
    </div>
  );
}
export default App;

