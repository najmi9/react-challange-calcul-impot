import React, { useState } from 'react';
import { calculTax,  calculRevenu, nbOfPart} from './taxHelper';

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
    { 'rate': 0, 'min': 0, 'max': T1 },
    { 'rate': 0.11, 'min': T1, 'max': T2 },
    { 'rate': 0.30, 'min': T2, 'max': T3 },
    { 'rate': 0.41, 'min': T3, 'max': T4 },
    { 'rate': 0.45, 'min': T4, 'max': '∞' },
  ];
   const euro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

  const handleState = ({ currentTarget }) => {
    setIsMarried(currentTarget.value == "married" ? true : false);
  }

  const handleNumberChilds = ({ currentTarget }) => {
    setChilds(parseInt(currentTarget.value||0));
  }

  const handleRevenuChange = ({ currentTarget }) => {
    const myRevenu = parseFloat(currentTarget.value||0);
    const NbP = nbOfPart(isMarried, childs);
    const myTax = calculTax(myRevenu, NbP);
    setRevenu(myRevenu);
    setImpot(myTax.tax);
    setRest(myRevenu - myTax.tax);
    setNbp(NbP)
    setTranches(myTax.slices);
    setDetails(true)
  }

  const handleRestChange = ({ currentTarget }) => {
    const rest = parseFloat(currentTarget.value||0);
    const NbP = nbOfPart(isMarried, childs);
    const myRevenu = calculRevenu(rest, NbP);
    const myTax = calculTax(myRevenu, NbP);
    setRest(currentTarget.value);   
    setRevenu(myRevenu);   
    setImpot(myTax.tax);
    setNbp(NbP)
    setTranches(myTax.slices);
    setDetails(true)
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
           <input type="text" name="revenu" className="form-control"
            onChange={handleRevenuChange} value={revenu}
            placeholder='votre revenu manual'
          />
        </p>
        <p>Impot en €:
          <input type="text" name="impot" placeholder="impôt à payer"
            value={euro.format(impot)} className="form-control" readOnly/>
        </p>
        <p>Rest après impôt en €:
          <input type="text" name="rest" value={rest} placeholder="rest après le paiement de'impôt"
            onChange={handleRestChange} className="form-control" />
        </p>
      </div>
      { details && (<div className="container bg-light">
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
                <td> {Data[index].rate * 100} % </td>
                <td> {euro.format(Data[index].min)} - {euro.format(Data[index].max)} </td>
                <td> {euro.format(tranche)} x {nbp} </td>
              </tr>))
            }

            <tr>
              <td> Total d'impot payé :</td>
              <td> <strong> {euro.format(impot)} </strong></td>
              <td> pourcentage  de ton salaire payé :  </td>
              <td> <strong>
                 {revenu != 0 ? new Intl.NumberFormat('fr-Fr', { maximumSignificantDigits: 3 }).format(impot*100/revenu) : 0} % 
                 </strong> 
              </td>
            </tr>
          </tbody>
        </table>
      </div>)
      }
    </div>
  );
}
export default App;

