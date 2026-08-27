import React from 'react';
import { ActionPlan, Evaluation, Sector, Supplier } from '../types';
import { EVALUATION_QUESTIONS } from '../services/questions';
import { getMetaBadgeDetails } from '../services/evaluationCalculation';
import { Printer, X, Building2, CheckCircle2, FileCheck } from 'lucide-react';

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
  const badge = getMetaBadgeDetails(evaluation.statusMeta, evaluation.mediaGeral);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:static print:bg-white print:p-0 print:m-0 print:block printable-laudo-container">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:m-0 print:w-full printable-laudo-content">
        
        {/* Barra superior de ações (NÃO SAI NA IMPRESSÃO) */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between no-print flex-shrink-0">
          <div className="flex items-center space-x-2">
            <FileCheck className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-sm sm:text-base">Laudo de Avaliação Anual de Contrato — Documento Oficial</h3>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 text-xs font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg shadow transition"
            >
              <Printer className="w-4 h-4 mr-1.5" />
              Imprimir / Salvar em PDF
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Documento do Laudo Oficial (ESTILO DOCUMENTO IMPRESSO/PDF) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-slate-900 bg-white print:p-0 print:overflow-visible print:space-y-4">
          
          {/* Cabeçalho Hospitalar Oficial */}
          <div className="border-b-2 border-slate-900 pb-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-slate-900 text-white p-2.5 rounded-xl print:p-1.5 print:bg-slate-900">
                <Building2 className="w-7 h-7 print:w-6 print:h-6" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-extrabold text-slate-900 uppercase tracking-wide">
                  HOSPITAL OPERACIONAL DE EXCELÊNCIA
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  DIRETORIA OPERACIONAL | GESTÃO DE CONTRATOS E SLA
                </p>
                <p className="text-[10px] text-slate-400">Sistema Oficial de Avaliação Anual de Desempenho de Fornecedores</p>
              </div>
            </div>

            <div className="text-right">
              <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-1 rounded border border-slate-300">
                Nº {evaluation.id.toUpperCase()}
              </span>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Data: {evaluation.dataAvaliacao}</p>
            </div>
          </div>

          {/* Título do Laudo */}
          <div className="bg-slate-100 p-2.5 rounded-lg text-center border border-slate-300">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wide">
              LAUDO DE AVALIAÇÃO ANUAL DE DESEMPENHO E CONTRATO DE PRESTAÇÃO DE SERVIÇOS
            </h2>
            <p className="text-xs text-slate-600 font-semibold mt-0.5">
              CICLO AVALIADO: ANO DE {evaluation.ano}
            </p>
          </div>

          {/* Seção 1: Dados do Fornecedor e Contrato */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200 print:p-2.5">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Razão Social</span>
              <strong className="text-slate-900 text-xs">{supplier?.razaoSocial || 'N/A'}</strong>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Nome Fantasia</span>
              <strong className="text-slate-900 text-xs">{supplier?.nomeFantasia || 'N/A'}</strong>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">CNPJ</span>
              <span className="font-mono text-slate-800 font-bold">{supplier?.cnpj || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Nº do Contrato</span>
              <span className="font-bold text-slate-800">{supplier?.numeroContrato || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Setor Hospitalar Responsável</span>
              <strong className="text-slate-900">{sector?.nome || 'N/A'}</strong>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Gestor do Contrato (Hospital)</span>
              <span className="text-slate-800">{sector?.gestorResponsavel || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Gestor Avaliador</span>
              <span className="text-slate-800">{evaluation.gestorAvaliador}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Contato do Fornecedor</span>
              <span className="text-slate-800">{supplier?.contatoNome} ({supplier?.contatoTelefone})</span>
            </div>
          </div>

          {/* Seção 2: Quadro Síntese de Médias e Meta de SLA */}
          <div className="border-2 border-slate-800 rounded-lg p-3 bg-slate-50 space-y-2.5 print-break-inside-avoid print:p-2.5">
            <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 uppercase tracking-wide text-center">
              QUADRO SÍNTESE DE MÉDIAS E DESEMPENHO DE SLA
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Aspectos Legais</span>
                <span className="text-lg font-bold text-slate-900">{evaluation.mediaLegais.toFixed(2)}</span>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Aspectos Comportamentais</span>
                <span className="text-lg font-bold text-slate-900">{evaluation.mediaComportamentais.toFixed(2)}</span>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Programa Qualidade & Seg.</span>
                <span className="text-lg font-bold text-slate-900">{evaluation.mediaQualidade.toFixed(2)}</span>
              </div>
              <div className="bg-white p-2 rounded border-2 border-slate-900">
                <span className="text-[10px] font-bold text-slate-700 uppercase block">MÉDIA GERAL DO SLA</span>
                <span className="text-xl font-extrabold text-slate-900">{evaluation.mediaGeral.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-300 pt-2 text-xs">
              <div>
                <span className="font-bold text-slate-700">Classificação da Meta (Mínimo 4.00):</span>
              </div>
              <div className={`px-3 py-0.5 rounded-full text-xs font-extrabold border ${badge.colorClass}`}>
                {badge.label} ({evaluation.mediaGeral.toFixed(2)})
              </div>
            </div>
          </div>

          {/* Seção 3: Detalhamento dos Itens Avaliados */}
          <div className="space-y-2 print-break-inside-avoid">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
              DETALHAMENTO DE NOTAS POR PERGUNTA AVALIADA
            </h3>

            <table className="w-full text-left text-[11px] border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-200 text-slate-800 font-bold border-b border-slate-300">
                  <th className="py-1.5 px-2 border-r border-slate-300 w-10 text-center">#</th>
                  <th className="py-1.5 px-2 border-r border-slate-300">Item Avaliado</th>
                  <th className="py-1.5 px-2 border-r border-slate-300 w-28">Grupo</th>
                  <th className="py-1.5 px-2 w-20 text-center">Nota Atribuída</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {EVALUATION_QUESTIONS.map((q, idx) => {
                  const score = evaluation.respostas[q.id];
                  return (
                    <tr key={q.id} className="hover:bg-slate-50">
                      <td className="py-1 px-2 border-r border-slate-200 text-center font-bold text-slate-500">{idx + 1}</td>
                      <td className="py-1 px-2 border-r border-slate-200 text-slate-800">{q.text}</td>
                      <td className="py-1 px-2 border-r border-slate-200 text-[10px] font-semibold text-slate-600">
                        {q.category}
                      </td>
                      <td className="py-1 px-2 text-center font-bold text-slate-900">
                        {score === 'NA' ? 'NA' : score}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Seção 4: Parecer Conclusivo da Gestão */}
          {evaluation.parecerGeral && (
            <div className="space-y-1 print-break-inside-avoid">
              <h4 className="font-bold text-xs uppercase text-slate-800">Parecer Conclusivo do Gestor Avaliador</h4>
              <p className="text-xs bg-slate-50 p-2.5 rounded border border-slate-200 italic text-slate-700">
                "{evaluation.parecerGeral}"
              </p>
            </div>
          )}

          {/* Seção 5: Plano de Ação Vinculado (Se < 4.00) */}
          {actionPlan && (
            <div className="border border-amber-300 bg-amber-50/60 p-3 rounded-lg space-y-1 text-xs print-break-inside-avoid">
              <h4 className="font-bold text-amber-900 text-xs uppercase flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                PLANO DE AÇÃO VINCULADO (5W2H) — STATUS: {actionPlan.status}
              </h4>
              <p><strong>Ação:</strong> {actionPlan.acao5W}</p>
              <p><strong>Responsável / Prazo:</strong> {actionPlan.responsavel5W} — Prazo: {actionPlan.prazo5W}</p>
            </div>
          )}

          {/* Seção 6: Assinaturas Oficiais */}
          <div className="pt-6 border-t border-slate-300 grid grid-cols-2 gap-8 text-center text-xs print-break-inside-avoid">
            {/* Assinatura do Gestor */}
            <div className="space-y-6">
              <div className="border-b border-slate-400 pb-1">
                <p className="font-bold text-slate-900">{evaluation.gestorAvaliador}</p>
                <p className="text-[10px] text-slate-500">Gestor Avaliador / Diretoria Operacional</p>
              </div>
              <p className="text-[10px] text-slate-400">Assinado Digitalmente pelo Gestor Hospitalar</p>
            </div>

            {/* Assinatura do Fornecedor */}
            <div className="space-y-1">
              {evaluation.statusAssinatura === 'ASSINADO_CIENTE' && evaluation.assinaturaBase64 ? (
                <div className="flex flex-col items-center">
                  <img
                    src={evaluation.assinaturaBase64}
                    alt="Assinatura do Fornecedor"
                    className="h-10 max-w-[180px] object-contain mb-1"
                  />
                  <div className="border-b border-slate-400 w-full pb-1">
                    <p className="font-bold text-slate-900">{evaluation.nomeSignatario}</p>
                    <p className="text-[10px] text-slate-500">{evaluation.cargoSignatario || 'Preposto Fornecedor'}</p>
                  </div>
                  <p className="text-[10px] text-emerald-700 font-bold mt-0.5">
                    ✓ Ciente e Assinado em {evaluation.dataCiencia}
                  </p>
                </div>
              ) : (
                <div className="border-b border-slate-400 pb-1 mt-6">
                  <p className="font-bold text-slate-400">[ Pendente de Assinatura do Fornecedor ]</p>
                  <p className="text-[10px] text-slate-400">Representante Legal do Prestador</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
