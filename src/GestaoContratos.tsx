import React, { useState } from 'react';

interface Contrato {
  id: string;
  fornecedor: string;
  cnpj: string;
  setor: string;
  criticidade: 'Critica' | 'Alta' | 'Media' | 'Baixa';
  vencimento: string;
  gestor: string;
  documentosValidos: boolean;
}

export const GestaoContratos: React.FC = () => {
  // Estado exemplo para armazenar os contratos da rede
  const [contratos] = useState<Contrato[]>([
    {
      id: '1',
      fornecedor: 'Winet Tecnologia da Informação',
      cnpj: '10.378.547/0001-89',
      setor: 'TI / Infraestrutura Central',
      criticidade: 'Alta',
      vencimento: '15/12/2026',
      gestor: 'Carlos Alberto (TI)',
      documentosValidos: true,
    },
    // Adicione mais contratos aqui
  ]);

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen text-slate-800">
      {/* Cabeçalho da Aba */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Armazenamento e Gestão de Contratos</h1>
          <p className="text-sm text-slate-500">Repositório oficial e controle de vigência dos prestadores da rede.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm">
          + Upload de Novo Contrato
        </button>
      </div>

      {/* Grid de Cards Superiores (Acompanhando o design da sua Home) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-400 font-medium uppercase">Contratos Ativos</p>
          <p className="text-2xl font-bold mt-1">142</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-amber-500">
          <p className="text-xs text-slate-400 font-medium uppercase">Gatilho 90 Dias (JCI)</p>
          <p className="text-2xl font-bold mt-1 text-amber-600">8</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
          <p className="text-xs text-slate-400 font-medium uppercase">Documentação Regular</p>
          <p className="text-2xl font-bold mt-1 text-emerald-600">94%</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-rose-500">
          <p className="text-xs text-slate-400 font-medium uppercase">Pendências de Credenciais</p>
          <p className="text-2xl font-bold mt-1 text-rose-600">3</p>
        </div>
      </div>

      {/* Tabela de Dados */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase text-slate-500 tracking-wider">
              <th className="p-4">Fornecedor / CNPJ</th>
              <th className="p-4">Setor Alvo</th>
              <th className="p-4">Criticidade</th>
              <th className="p-4">Vencimento</th>
              <th className="p-4">Gestor Técnico</th>
              <th className="p-4">Status Doc (JCI)</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100">
            {contratos.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition">
                <td className="p-4">
                  <div className="font-semibold text-slate-900">{item.fornecedor}</div>
                  <div className="text-xs text-slate-400">{item.cnpj}</div>
                </td>
                <td className="p-4 text-slate-600">{item.setor}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    item.criticidade === 'Alta' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {item.criticidade}
                  </span>
                </td>
                <td className="p-4 font-medium text-slate-700">{item.vencimento}</td>
                <td className="p-4 text-slate-600">{item.gestor}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1 text-xs font-medium ${item.documentosValidos ? 'text-emerald-600' : 'text-rose-600'}`}>
                    <span className={`w-2 h-2 rounded-full ${item.documentosValidos ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                    {item.documentosValidos ? 'Validado' : 'Pendente'}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold px-2 py-1">Visualizar</button>
                  <button className="text-slate-500 hover:text-slate-700 text-xs font-semibold px-2 py-1 ml-2">Avaliar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
