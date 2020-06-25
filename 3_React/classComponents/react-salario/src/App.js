import React, { Component } from 'react';
import Input from './Components/Input/Input';
import Bar from './Components/Bar/Bar';

import { calculateSalaryFrom } from './helper/salary';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      salarioBruto: 0,
      baseINSS: 0,
      descINSS: 0,
      percentageINSS: 0,
      baseIRPF: 0,
      descIRPF: 0,
      percentageIRPF: 0,
      salarioLiquido: 0,
      percentageNetSalary: 0,
    };
  }

  calculateNetSalary = (fullSalary) => {
    let results = calculateSalaryFrom(fullSalary);
    this.setState({
      baseINSS: results.baseINSS ? results.baseINSS : 0,
      baseIRPF: results.baseIRPF ? results.baseIRPF : 0,
      descINSS: results.discountINSS ? results.discountINSS : 0,
      descIRPF: results.discountIRPF ? results.discountIRPF : 0,
      salarioLiquido: results.netSalary ? results.netSalary : 0,
    });
  };

  handleFullSalary = (inputValue) => {
    this.setState({
      salarioBruto: inputValue,
    });

    this.calculateNetSalary(inputValue);
  };

  render() {
    const {
      salarioBruto,
      baseINSS,
      baseIRPF,
      descINSS,
      descIRPF,
      salarioLiquido,
    } = this.state;
    return (
      <div style={{ margin: '10px' }}>
        <h1 style={{ textAlign: 'center' }}>React Salário</h1>
        {/* prettier-ignore */}
        <Input label="Salário Bruto" isDisabled={false} onChange={this.handleFullSalary} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Input label="Base INSS" isDisabled={true} value={baseINSS} />
          <Input label="Desconto INSS" isDisabled={true} value={descINSS} />
          <Input label="Base IRPF" isDisabled={true} value={baseIRPF} />
          <Input label="Desconto IRPF" isDisabled={true} value={descIRPF} />
        </div>
        {/* prettier-ignore */}
        <Input label="Salário Líquido" isDisabled={true} value={salarioLiquido}/>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bar
            id="INSS"
            value={salarioBruto > 0 ? (descIRPF / baseIRPF) * 100 : 0}
            color="orange"
          />
          <Bar
            id="IRPF"
            value={salarioBruto > 0 ? (descINSS / baseINSS) * 100 : 0}
            color="red"
          />
          <Bar
            id="NETSALARY"
            value={
              salarioBruto > 0 ? (salarioLiquido / salarioBruto) * 100 : 100
            }
            color="green"
          />
        </div>
      </div>
    );
  }
}
