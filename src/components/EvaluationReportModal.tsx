import React from 'react';
import { ActionPlan, Evaluation, Sector, Supplier } from '../types';
import { ArchetypesService } from '../services/archetypesService';
import { 
  Building2, 
  Printer, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck2,
  Calendar,
  Layers,
  UserCheck
} from 'lucide-react';

interface EvaluationReportModalProps {
  evaluation: Evaluation;
  supplier?: Supplier;
  sector?: Sector;
  actionPlan?: ActionPlan;
  onClose: () => void;
}

export const EvaluationReportModal: React.FC<EvaluationReportModalProps> = ({
  evaluation,
  supplier,
  sector,
  actionPlan,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  // Detect Archetype for criteria labels
  const detectedArchetype = ArchetypesService.detectArchetype(
    supplier?.setorResponsavelId || evaluation.setorId,
    supplier?.categoriaServico || ''
  );

  const legalCriteria = ArchetypesService.getLegalCriteria(detectedArchetype);
  const { behavioral: behavioralCriteria, quality: qualityCriteria } = ArchetypesService.getBehavioralAndQualityCriteria(detectedArchetype);

  // Combine criteria for table listing
  const allCriteria = [
    ...legalCriteria.map(c => ({ ...c, grupo: 'LEGAIS' })),
    ...behavioralCriteria.map(c => ({ ...c, grupo: 'COMPORTAMENTAIS' })),
    ...qualityCriteria.map(c => ({ ...c, grupo: 'QUALIDADE' }))
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto printable-laudo-modal font-sans">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden printable-laudo-container my-auto">
        {/* Barra de Ações Superior (Oculta na Impressão) */}
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between no-print border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <FileCheck2 className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-sm text-white">
              Laudo Oficial de Avaliação Anual — Impressão A4 de Página Única
            </h3>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow transition"
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimir / Salvar em PDF
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title="Fechar Janela"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- CONTEÚDO IMPRESSO DO LAUDO OFICIAL (COMPACTO EM 1 PÁGINA A4) --- */}
        <div className="p-4 sm:p-6 space-y-3 text-slate-900 bg-white print:p-0 print:space-y-2">
          
          {/* 1. Cabeçalho Oficial com Logo da Rede D'Or */}
          <div className="border-b-2 border-slate-900 pb-2 flex items-center justify-between printable-section">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-sm print:p-0.5 print:border-none">
                <img
                  src="/logo-rede-dor.webp"
                  alt="Logo Rede D'Or"
                  className="h-8 sm:h-9 w-auto object-contain print:h-7"
                />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide print:text-xs">
                  REDE D'OR — HOSPITAL VILA NOVA STAR
                </h1>
                <p className="text-[11px] text-slate-700 font-bold print:text-[9px]">
                  DIRETORIA OPERACIONAL | GESTÃO DE CONTRATOS E SLA
                </p>
                <p className="text-[9px] text-slate-500 print:text-[8px]">Sistema Oficial de Avaliação Anual de Desempenho de Fornecedores</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[9px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 block print:text-[8px]">
                Nº {evaluation.id.toUpperCase()}
              </span>
              <span className="text-[10px] text-slate-600 font-bold mt-0.5 block print:text-[9px]">
                Data: {evaluation.dataAvaliacao}
              </span>
            </div>
          </div>

          {/* 2. Caixa Título do Documento */}
          <div className="bg-slate-50 border border-slate-300 p-2 rounded-xl text-center printable-section print:p-1.5 print:rounded-lg">
            <h2 className="font-extrabold text-xs sm:text-sm text-slate-900 uppercase tracking-tight print:text-[11px]">
              LAUDO DE AVALIAÇÃO ANUAL DE DESEMPENHO E CONTRATO DE PRESTAÇÃO DE SERVIÇOS
            </h2>
            <p className="text-[10px] text-slate-600 font-bold print:text-[9px]">CICLO AVALIADO: ANO DE {evaluation.ano}</p>
          </div>

          {/* 3. Dados do Fornecedor e Contrato (4 Colunas Compactas) */}
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-1.5 printable-section text-[11px] print:p-2 print:rounded-lg print:text-[9px]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <span className="text-slate-400 text-[9px] font-bold block uppercase">RAZÃO SOCIAL</span>
                <strong className="text-slate-900 font-bold block leading-tight">{supplier?.razaoSocial || 'N/A'}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[9px] font-bold block uppercase">NOME FANTASIA</span>
                <strong className="text-slate-900 font-bold block leading-tight">{supplier?.nomeFantasia || 'N/A'}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[9px] font-bold block uppercase">CNPJ</span>
                <strong className="text-slate-900 font-bold block">{supplier?.cnpj || 'N/A'}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[9px] font-bold block uppercase">Nº DO CONTRATO</span>
                <strong className="text-slate-900 font-bold block">{supplier?.numeroContrato || 'N/A'}</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-slate-200">
              <div>
                <span className="text-slate-400 text-[9px] font-bold block uppercase">SETOR RESPONSÁVEL</span>
                <strong className="text-slate-900 font-bold block">{sector?.nome || 'Setor'}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[9px] font-bold block uppercase">GESTOR HOSPITALAR</span>
                <strong className="text-slate-900 font-bold block">{sector?.gestorResponsavel || evaluation.gestorAvaliador}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[9px] font-bold block uppercase">GESTOR AVALIADOR</span>
                <strong className="text-slate-900 font-bold block">{evaluation.gestorAvaliador}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[9px] font-bold block uppercase">CONTATO DO FORNECEDOR</span>
                <strong className="text-slate-900 font-bold block truncate">{supplier?.contatoNome} ({supplier?.contatoTelefone})</strong>
              </div>
            </div>
          </div>

          {/* 4. Quadro Síntese de Médias de SLA */}
          <div className="border border-slate-900 rounded-xl p-3 bg-white space-y-2 printable-section print:p-2 print:rounded-lg">
            <h3 className="text-center font-black text-xs text-slate-900 uppercase tracking-wide print:text-[10px]">
              QUADRO SÍNTESE DE MÉDIAS E DESEMPENHO DE SLA
            </h3>

            <div className="grid grid-cols-4 gap-2 text-center text-xs print:gap-1.5">
              <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[9px] text-slate-500 font-bold uppercase block">ASPECTOS LEGAIS</span>
                <strong className="text-sm font-black text-slate-900 print:text-xs">{evaluation.mediaLegais.toFixed(2)}</strong>
              </div>
              <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[9px] text-slate-500 font-bold uppercase block">COMPORTAMENTAIS</span>
                <strong className="text-sm font-black text-slate-900 print:text-xs">{evaluation.mediaComportamentais.toFixed(2)}</strong>
              </div>
              <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[9px] text-slate-500 font-bold uppercase block">QUALIDADE & SEG.</span>
                <strong className="text-sm font-black text-slate-900 print:text-xs">{evaluation.mediaQualidade.toFixed(2)}</strong>
              </div>
              <div className="p-1.5 bg-slate-900 text-white rounded-lg border border-slate-900">
                <span className="text-[9px] text-teal-300 font-bold uppercase block">MÉDIA GERAL SLA</span>
                <strong className="text-base font-black text-teal-300 print:text-sm">{evaluation.mediaGeral.toFixed(2)}</strong>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-xs print:text-[9px]">
              <span className="font-bold text-slate-700">Classificação da Meta (Mínimo 4.00):</span>
              <span className={`font-black px-2.5 py-0.5 rounded-full uppercase ${
                evaluation.mediaGeral >= 4.0 
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                {evaluation.mediaGeral >= 4.0 ? `Dentro da Meta (${evaluation.mediaGeral.toFixed(2)})` : `Abaixo da Meta (${evaluation.mediaGeral.toFixed(2)})`}
              </span>
            </div>
          </div>

          {/* 5. Tabela Detalhada de Perguntas e Notas Atribuídas (Compacta) */}
          <div className="space-y-1 printable-section">
            <h4 className="font-bold text-xs text-slate-900 uppercase border-b border-slate-300 pb-0.5 print:text-[9px]">
              DETALHAMENTO DE NOTAS POR PERGUNTA AVALIADA
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left border border-slate-300 rounded-lg text-xs print:text-[8px]">
                <thead className="bg-slate-100 text-slate-800 uppercase font-bold border-b border-slate-300">
                  <tr>
                    <th className="py-1 px-2 text-center w-8 border-r border-slate-300">#</th>
                    <th className="py-1 px-2 border-r border-slate-300">Item Avaliado</th>
                    <th className="py-1 px-2 text-center w-24 border-r border-slate-300">Grupo</th>
                    <th className="py-1 px-2 text-center w-16">Nota</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {allCriteria.map((c, i) => {
                    const score = evaluation.respostas[c.id];
                    return (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="py-1 px-2 text-center text-slate-500 font-bold border-r border-slate-200">{i + 1}</td>
                        <td className="py-1 px-2 text-slate-900 border-r border-slate-200 leading-tight">{c.pergunta}</td>
                        <td className="py-1 px-2 text-center text-slate-600 font-bold border-r border-slate-200 text-[10px] print:text-[8px]">{c.grupo}</td>
                        <td className="py-1 px-2 text-center font-extrabold text-slate-900">
                          {score === 'NA' ? 'N/A' : score !== undefined ? score : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 6. Parecer do Gestor e Assinaturas (Em 2 Colunas no Rodapé) */}
          <div className="border-t border-slate-300 pt-2 space-y-2 printable-section text-xs print:text-[9px]">
            <div>
              <strong className="text-slate-900 font-bold uppercase block text-[10px] print:text-[8px]">PARECER GERAL DO GESTOR HOSPITALAR:</strong>
              <p className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 italic leading-snug print:p-1.5 print:text-[8.5px]">
                "{evaluation.parecerGeral || 'Avaliação realizada e aprovada pela Diretoria Operacional.'}"
              </p>
            </div>

            {/* Bloco de Assinaturas Lado a Lado */}
            <div className="grid grid-cols-2 gap-4 pt-3 print:pt-2">
              {/* Assinatura do Gestor do Hospital */}
              <div className="border-t border-slate-400 pt-1 text-center space-y-0.5">
                <strong className="text-slate-900 font-bold block text-xs print:text-[9px]">{evaluation.gestorAvaliador}</strong>
                <span className="text-[10px] text-slate-500 block print:text-[8px]">Gestor do Contrato / Diretoria Operacional</span>
                <span className="text-[9px] text-slate-400 block print:text-[7.5px]">Hospital Vila Nova Star — Rede D'Or</span>
              </div>

              {/* Assinatura do Preposto / Fornecedor */}
              <div className="border-t border-slate-400 pt-1 text-center space-y-0.5">
                {evaluation.assinaturaDigitalUrl ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={evaluation.assinaturaDigitalUrl} 
                      alt="Assinatura Digital" 
                      className="h-7 w-auto object-contain mb-0.5 print:h-6"
                    />
                    <strong className="text-slate-900 font-bold block text-xs print:text-[9px]">{evaluation.nomeSignatario || 'Preposto Fornecedor'}</strong>
                    <span className="text-[9px] text-emerald-700 font-bold block print:text-[7.5px]">Assinado Digitalmente em {evaluation.dataCiencia}</span>
                  </div>
                ) : (
                  <div>
                    <strong className="text-slate-900 font-bold block text-xs print:text-[9px]">
                      {evaluation.nomeSignatario || supplier?.contatoNome || 'Preposto / Representante Legal'}
                    </strong>
                    <span className="text-[10px] text-slate-500 block print:text-[8px]">{evaluation.cargoSignatario || 'Representante do Fornecedor'}</span>
                    <span className="text-[9px] text-slate-400 block print:text-[7.5px]">
                      {evaluation.statusAssinatura === 'ASSINADO_CIENTE' ? `Ciência Registrada em ${evaluation.dataCiencia}` : 'Assinatura PENDENTE de Envio'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
