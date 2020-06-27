import React, { useState, useEffect } from 'react';

import Card from '../Card/Card';

export default function CardSpace(props) {
  const { montante, taxa, periodo } = props;

  const [cards, setCards] = useState([]);

  useEffect(() => {
    let parcelas = [];
    let novoMontante = montante;
    for (let i = 1; i <= periodo; i++) {
      let parcela = novoMontante * (1 + taxa / 100);
      parcelas.push(parcela);
      novoMontante = parcela;
    }
    setCards([...parcelas]);
  }, [montante, taxa, periodo]);

  return (
    <div>
      {cards.map((card, index) => {
        return (
          <div key={index}>
            <Card
              position={index + 1}
              curValue={card}
              diff={
                card >= montante ? `+${card - montante}` : `-${montante - card}`
              }
              percentage={(100 / montante) * card - 100}
            />
          </div>
        );
      })}
    </div>
  );
}
