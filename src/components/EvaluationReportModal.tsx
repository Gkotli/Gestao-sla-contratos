import React from 'react';
import { ActionPlan, Evaluation, Sector, Supplier } from '../types';
import { EVALUATION_QUESTIONS } from '../services/questions';
import { safeFormatScore } from '../utils/formatters';
import { 
  Printer, 
  X, 
  FileCheck2,
  AlertCircle
} from 'lucide-react';

interface EvaluationReportModalProps {
  evaluation: Evaluation | null;
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

  // Se o objeto da avaliação for nulo ou inválido, exibe estado de erro seguro em vez de causar Tela Branca
  if (!evaluation) {
    return (
      <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-2xl border border-slate-200 space-y-4 text-center">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Avaliação Não Encontrada</h3>
          <p className="text-xs text-slate-500">Não foi possível localizar os registros desta avaliação no momento.</p>
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
          >
            Voltar ao Histórico
          </button>
        </div>
      </div>
    );
  }

  // Acesso ultrasseguro às respostas e médias
  const respostas = evaluation.respostas || {};
  const mediaLegais = safeFormatScore(evaluation.mediaLegais);
  const mediaComportamentais = safeFormatScore(evaluation.mediaComportamentais);
  const mediaQualidade = safeFormatScore(evaluation.mediaQualidade);
  const mediaGeralVal = typeof evaluation.mediaGeral === 'number' ? evaluation.mediaGeral : parseFloat(String(evaluation.mediaGeral || 0));
  const mediaGeralFormatted = safeFormatScore(evaluation.mediaGeral);

  // Garante a lista de perguntas: avaliadas salvas, ou fallback para as 15 padrão
  const evaluatedQuestions = evaluation.perguntasAvaliadas && evaluation.perguntasAvaliadas.length > 0
    ? evaluation.perguntasAvaliadas
    : null;

  const criteriaList = evaluatedQuestions
    ? evaluatedQuestions.map(q => ({
        id: q.id,
        pergunta: q.pergunta,
        grupo: q.categoria,
        isManualAddition: q.isManualAddition,
        justificativaAdicao: q.justificativaAdicao
      }))
    : EVALUATION_QUESTIONS.map(q => ({
        id: q.id,
        pergunta: q.text,
        grupo: q.category,
        isManualAddition: false,
        justificativaAdicao: undefined
      }));

  const temContatoFornecedor = supplier?.contatoNome || supplier?.contatoEmail || supplier?.contatoTelefone;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto font-sans printable-laudo-modal">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto printable-laudo-container">
        {/* Barra de Ações Superior (Oculta na Impressão no-print) */}
        <div className="bg-[#123768] text-white px-6 py-3 flex items-center justify-between no-print border-b border-[#0B2850]">
          <div className="flex items-center space-x-2">
            <FileCheck2 className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-sm text-white">
              Visualização do Laudo Oficial — Impressão Formal A4 Multipáginas ({criteriaList.length} Perguntas)
            </h3>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-md shadow transition cursor-pointer"
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimir / Salvar em PDF
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-white/10 transition cursor-pointer"
              title="Fechar Janela"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- CONTAINER EXCLUSIVO DO RELATÓRIO IMPRIMÍVEL (#printable-report) --- */}
        <div id="printable-report" className="p-6 sm:p-8 space-y-6 text-[#172B4D] bg-white">
          
          {/* 1. Cabeçalho Institucional */}
          <div className="border-b-2 border-[#123768] pb-3 flex items-center justify-between print-avoid-break">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-1.5 rounded-md border border-[#CBD5E1] flex items-center justify-center">
                <img
                  src="/assets/branding/rede-dor-logo.png"
                  alt="Rede D'Or Hospitais"
                  className="w-[140px] sm:w-[160px] h-auto object-contain"
                />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black text-[#172B4D] uppercase tracking-wide">
                  REDE D'OR – HOSPITAL VILA NOVA STAR
                </h1>
                <p className="text-xs text-[#172B4D] font-bold">
                  DIRETORIA OPERACIONAL | GESTÃO DE CONTRATOS E SLA
                </p>
                <p className="text-[10px] text-[#475569]">Sistema Oficial de Avaliação Anual de Desempenho de Fornecedores</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold text-[#172B4D] bg-slate-100 px-2.5 py-1 rounded border border-[#CBD5E1] block">
                Nº {(evaluation.id || '').toUpperCase()}
              </span>
              <span className="text-xs text-[#475569] font-bold mt-1 block">
                Data: {evaluation.dataAvaliacao || new Date().toISOString().split('T')[0]}
              </span>
            </div>
          </div>

          {/* 2. Título & 3. Ciclo Avaliado */}
          <div className="bg-slate-50 border border-[#CBD5E1] p-3 rounded-lg text-center space-y-1 print-avoid-break">
            <h2 className="font-extrabold text-sm sm:text-base text-[#172B4D] uppercase tracking-tight">
              LAUDO DE AVALIAÇÃO ANUAL DE DESEMPENHO E CONTRATO DE PRESTAÇÃO DE SERVIÇOS
            </h2>
            <p className="text-xs text-[#475569] font-bold uppercase">
              CICLO AVALIADO: ANO DE {evaluation.ano || 2026}
              {evaluation.tipoAvaliacao === 'EXCECAO' && ' • (AVALIAÇÃO POR EXCEÇÃO)'}
            </p>
          </div>

          {/* Banner de Justificativa para Avaliação por Exceção */}
          {evaluation.tipoAvaliacao === 'EXCECAO' && (
            <div className="bg-[#FFFBEB] border border-[#FCD34D] p-3 rounded-lg space-y-1 print-avoid-break text-xs">
              <div className="flex items-center space-x-2">
                <span className="bg-[#123768] text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded uppercase">
                  TIPO DE AVALIAÇÃO: EXCEÇÃO
                </span>
                <span className="text-[#92400E] font-bold text-xs">
                  Questionário Excepcional Personalizado
                </span>
              </div>
              {evaluation.justificativaExcecao && (
                <div className="pt-1.5 border-t border-[#FCD34D] text-xs">
                  <strong className="text-[#92400E] font-bold block text-[11px] uppercase">JUSTIFICATIVA REGISTRADA DA EXCEÇÃO:</strong>
                  <p className="text-[#172B4D] italic font-medium">"{evaluation.justificativaExcecao}"</p>
                </div>
              )}
            </div>
          )}

          {/* 4. Dados Cadastrais do Fornecedor e Contrato */}
          <div className="bg-slate-50 border border-[#CBD5E1] p-4 rounded-lg space-y-3 print-avoid-break supplier-data text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-[#475569] text-[10px] font-bold block uppercase">RAZÃO SOCIAL</span>
                <strong className="text-[#172B4D] font-bold block leading-tight">{supplier?.razaoSocial || 'N/A'}</strong>
              </div>
              <div>
                <span className="text-[#475569] text-[10px] font-bold block uppercase">NOME FANTASIA</span>
                <strong className="text-[#172B4D] font-bold block leading-tight">{supplier?.nomeFantasia || 'N/A'}</strong>
              </div>
              <div>
                <span className="text-[#475569] text-[10px] font-bold block uppercase">CNPJ</span>
                <strong className="text-[#172B4D] font-bold block">{supplier?.cnpj || 'N/A'}</strong>
              </div>
              <div>
                <span className="text-[#475569] text-[10px] font-bold block uppercase">Nº DO CONTRATO</span>
                <strong className="text-[#172B4D] font-bold block">{supplier?.numeroContrato || 'N/A'}</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#CBD5E1]">
              <div>
                <span className="text-[#475569] text-[10px] font-bold block uppercase">SETOR RESPONSÁVEL</span>
                <strong className="text-[#172B4D] font-bold block">{sector?.nome || 'Setor Hospitalar'}</strong>
              </div>
              <div>
                <span className="text-[#475569] text-[10px] font-bold block uppercase">GESTOR HOSPITALAR</span>
                <strong className="text-[#172B4D] font-bold block">{sector?.gestorResponsavel || evaluation.gestorAvaliador || 'N/A'}</strong>
              </div>
              <div>
                <span className="text-[#475569] text-[10px] font-bold block uppercase">GESTOR AVALIADOR</span>
                <strong className="text-[#172B4D] font-bold block">{evaluation.gestorAvaliador || 'N/A'}</strong>
              </div>
              <div>
                <span className="text-[#475569] text-[10px] font-bold block uppercase">CONTATO DO FORNECEDOR</span>
                <strong className="text-[#172B4D] font-bold block truncate">
                  {temContatoFornecedor 
                    ? `${supplier?.contatoNome} ${supplier?.contatoTelefone ? `(${supplier.contatoTelefone})` : ''}` 
                    : 'A definir'}
                </strong>
              </div>
            </div>
          </div>

          {/* 5. Quadro Síntese de Médias de SLA */}
          <div className="border-2 border-[#123768] rounded-lg p-4 bg-white space-y-3 print-avoid-break sla-summary">
            <h3 className="text-center font-black text-xs text-[#172B4D] uppercase tracking-wide">
              QUADRO SÍNTESE DE MÉDIAS E DESEMPENHO DE SLA
            </h3>

            <div className="grid grid-cols-4 gap-3 text-center text-xs">
              <div className="p-2 bg-slate-50 rounded-md border border-[#CBD5E1]">
                <span className="text-[10px] text-[#475569] font-bold uppercase block">ASPECTOS LEGAIS</span>
                <strong className="text-base font-black text-[#172B4D]">{mediaLegais}</strong>
              </div>
              <div className="p-2 bg-slate-50 rounded-md border border-[#CBD5E1]">
                <span className="text-[10px] text-[#475569] font-bold uppercase block">COMPORTAMENTAIS</span>
                <strong className="text-base font-black text-[#172B4D]">{mediaComportamentais}</strong>
              </div>
              <div className="p-2 bg-slate-50 rounded-md border border-[#CBD5E1]">
                <span className="text-[10px] text-[#475569] font-bold uppercase block">QUALIDADE & SEG.</span>
                <strong className="text-base font-black text-[#172B4D]">{mediaQualidade}</strong>
              </div>
              <div className="p-2 bg-[#123768] text-white rounded-md border border-[#123768]">
                <span className="text-[10px] text-teal-300 font-bold uppercase block">MÉDIA GERAL SLA</span>
                <strong className="text-lg font-black text-teal-300">{mediaGeralFormatted}</strong>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#CBD5E1] text-xs">
              <span className="font-bold text-[#172B4D]">Classificação da Meta (Mínimo 4.00):</span>
              <span className={`font-black px-3 py-1 rounded uppercase ${
                mediaGeralVal >= 4.0 
                  ? 'bg-[#ECFDF5] text-[#047857] border border-emerald-300' 
                  : 'bg-[#FFFBEB] text-[#92400E] border border-[#FCD34D]'
              }`}>
                {mediaGeralVal >= 4.0 ? `Dentro da Meta (${mediaGeralFormatted})` : `Abaixo da Meta (${mediaGeralFormatted})`}
              </span>
            </div>
          </div>

          {/* 6. Detalhamento Integral das Perguntas (Suporte a Exceção & Padrão) */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-[#172B4D] uppercase border-b border-[#CBD5E1] pb-1 print-avoid-break">
              DETALHAMENTO DE NOTAS POR PERGUNTA AVALIADA (
              {evaluation.tipoAvaliacao === 'EXCECAO' && evaluation.itensExcecao
                ? `${evaluation.itensExcecao.length} ITENS DE EXCEÇÃO`
                : `${criteriaList.length} ITENS AVALIADOS`
              })
            </h4>

            <div className="w-full">
              <table className="w-full text-left border border-[#CBD5E1] rounded-md text-xs border-collapse">
                <thead className="bg-slate-100 text-[#172B4D] uppercase font-bold border-b border-[#CBD5E1]">
                  <tr>
                    <th className="py-2.5 px-3 text-center w-12 border-r border-[#CBD5E1]">ITEM</th>
                    <th className="py-2.5 px-3 border-r border-[#CBD5E1]">ITEM AVALIADO</th>
                    <th className="py-2.5 px-3 text-center w-48 border-r border-[#CBD5E1]">GRUPO</th>
                    <th className="py-2.5 px-3 text-center w-20">NOTA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#CBD5E1] font-medium">
                  {evaluation.tipoAvaliacao === 'EXCECAO' && evaluation.itensExcecao && evaluation.itensExcecao.length > 0 ? (
                    evaluation.itensExcecao.map((item, i) => (
                      <tr key={item.id || i} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 text-center text-[#475569] font-bold border-r border-[#CBD5E1]">{i + 1}</td>
                        <td className="py-2.5 px-3 text-[#172B4D] border-r border-[#CBD5E1] leading-relaxed font-semibold">{item.pergunta}</td>
                        <td className="py-2.5 px-3 text-center text-[#475569] font-bold border-r border-[#CBD5E1] text-[11px]">{item.grupo}</td>
                        <td className="py-2.5 px-3 text-center font-extrabold text-[#172B4D] text-sm">
                          {item.nota === 'NA' ? 'N/A' : (item.nota !== undefined && item.nota !== null ? item.nota : '-')}
                        </td>
                      </tr>
                    ))
                  ) : (
                    criteriaList.map((c, i) => {
                      const score = respostas[c.id];
                      return (
                        <tr key={c.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 text-center text-[#475569] font-bold border-r border-[#CBD5E1]">{i + 1}</td>
                          <td className="py-2.5 px-3 text-[#172B4D] border-r border-[#CBD5E1] leading-relaxed font-normal">
                            <div className="flex flex-col">
                              <span>{c.pergunta}</span>
                              {c.isManualAddition && (
                                <span className="text-[10px] text-amber-700 italic mt-0.5">
                                  * Adição manual: {c.justificativaAdicao}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-center text-[#475569] font-bold border-r border-[#CBD5E1] text-[11px]">{c.grupo}</td>
                          <td className="py-2.5 px-3 text-center font-extrabold text-[#172B4D] text-sm">
                            {score === 'NA' ? 'N/A' : (score !== undefined && score !== null ? score : '-')}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 7. Parecer Geral do Gestor & 8/9. Área de Assinaturas */}
          <div className="border-t border-[#CBD5E1] pt-3 space-y-4 print-avoid-break manager-comment text-xs">
            <div>
              <strong className="text-[#172B4D] font-bold uppercase block text-xs mb-1">PARECER GERAL DO GESTOR HOSPITALAR:</strong>
              <p className="p-3 bg-slate-50 rounded-md border border-[#CBD5E1] text-[#172B4D] italic leading-relaxed">
                "{evaluation.parecerGeral || 'Avaliação realizada e aprovada pela Diretoria Operacional.'}"
              </p>
            </div>

            {/* Área de Assinaturas Executivas em 2 Colunas (signature-block) */}
            <div className="grid grid-cols-2 gap-8 pt-6 signature-block">
              {/* Assinatura do Gestor do Contrato */}
              <div className="border-t-2 border-[#123768] pt-2 text-center space-y-1">
                <strong className="text-[#172B4D] font-bold block text-xs">{evaluation.gestorAvaliador || 'Gestor do Contrato'}</strong>
                <span className="text-[11px] text-[#475569] block">Gestor do Contrato / Diretoria Operacional</span>
                <span className="text-[10px] text-slate-400 block">REDE D'OR – HOSPITAL VILA NOVA STAR</span>
              </div>

              {/* Assinatura/Representante do Fornecedor */}
              <div className="border-t-2 border-[#123768] pt-2 text-center space-y-1">
                {(evaluation.assinaturaBase64 || evaluation.assinaturaDigitalUrl) ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={evaluation.assinaturaBase64 || evaluation.assinaturaDigitalUrl} 
                      alt="Assinatura Digital" 
                      className="h-9 w-auto object-contain mb-1"
                    />
                    <strong className="text-[#172B4D] font-bold block text-xs">{evaluation.nomeSignatario || 'Preposto Fornecedor'}</strong>
                    <span className="text-[10px] text-[#047857] font-bold block">Assinado Digitalmente em {evaluation.dataCiencia}</span>
                  </div>
                ) : (
                  <div>
                    <strong className="text-[#172B4D] font-bold block text-xs">
                      {evaluation.nomeSignatario || (supplier?.contatoNome ? supplier.contatoNome : 'Preposto / Representante Legal (A definir)')}
                    </strong>
                    <span className="text-[11px] text-[#475569] block">{evaluation.cargoSignatario || 'Representante do Fornecedor'}</span>
                    <span className="text-[10px] text-slate-500 block">
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
