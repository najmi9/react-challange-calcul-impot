 // les valeurs sont prenus à partir du diagramme qui dans le site de l'état
 const T1 = 10064; const T2 = 25659; const T3 = 73369; const T4 = 157806;

  const L1 = (T2 - T1) * 11 / 100
  const L2 = (T3 - T2) * 30 / 100
  const L3 = (T4 - T3) * 41 / 100
  
    const calculTax = (RNI, NbP) => {
    // quotient familial = revenu net imposable / nombre de part
    const QF = (RNI / NbP)
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
    return {tax:impot * NbP, slices: taxes};
  }

    //return le nombre de part selon ce qui tapé
  const nbOfPart = (married, childrens) => {
    let NbP = 1;
    if (married) {
      if (childrens < 3) {
        NbP = 2 + childrens * 0.5;
      } else {
        NbP = 2 + 2 * 0.5 + (childrens - 2) * 1;
      }
    } else {
      if (childrens < 3) {
        NbP = 1 + childrens * 0.5;
      } else {
        NbP = 1 + 2 * 0.5 + (childrens - 2) * 1;
      }
    }
    return NbP;
  }

  // return le prix qu'il faut partient pour une reste tapé après l'impot 
  const calculRevenu = rest => {
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

  export default {
    calculTax,
    calculRevenu,
    nbOfPart
  };