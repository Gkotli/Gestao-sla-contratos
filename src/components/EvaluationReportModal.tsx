import React from 'react';
import { ActionPlan, Evaluation, Sector, Supplier } from '../types';
import { ArchetypesService } from '../services/archetypesService';
import { 
  Printer, 
  X, 
  FileCheck2
} from 'lucide-react';

interface EvaluationReportModalProps {
  evaluation: Evaluation;
  supplier?: Supplier;
  sector?: Sector;
  actionPlan?: ActionPlan;
  onClose: () => void;
}

// Dicionário Mestre com os textos integrais e oficiais das 15 Perguntas (Sem resumos nem cortes)
const MASTER_15_QUESTIONS: Record<string, { pergunta: string; grupo: 'LEGAIS' | 'COMPORTAMENTAIS' | 'QUALIDADE' }> = {
  leg_1: { pergunta: 'O fornecedor dispõe de profissionais habilitados, capacitados, treinados e tecnicamente aptos para atender à demanda?', grupo: 'LEGAIS' },
  leg_2: { pergunta: 'O fornecedor cumpre as legislações, normas de vigilância sanitária (ANVISA), trabalhistas e fiscalizatórias aplicáveis?', grupo: 'LEGAIS' },
  leg_3: { pergunta: 'Os profissionais cumprem normas internas, horários, crachá, segurança e demais obrigações institucionais do hospital?', grupo: 'LEGAIS' },
  leg_4: { pergunta: 'Nos casos de ausência, faltas ou desligamento de profissionais, existe substituição adequada e tempestiva?', grupo: 'LEGAIS' },
  leg_5: { pergunta: 'Os colaboradores utilizam obrigatoriamente todos os Equipamentos de Proteção Individual (EPIs) recomendados?', grupo: 'LEGAIS' },

  comp_1: { pergunta: 'A equipe mantém atendimento cortês, com ética, urbanidade e presteza aos pacientes, acompanhantes e corpo clínico?', grupo: 'COMPORTAMENTAIS' },
  comp_2: { pergunta: 'A apresentação pessoal dos colaboradores está adequada (uso correto de crachá de identificação e uniforme/jaleco)?', grupo: 'COMPORTAMENTAIS' },
  comp_3: { pergunta: 'Os prestadores de serviço cumprem rigorosamente a política institucional de adornos zero em áreas assistenciais?', grupo: 'COMPORTAMENTAIS' },
  comp_4: { pergunta: 'Existe comunicação clara, ágil e eficiente entre a supervisão da contratada e a gestão do hospital?', grupo: 'COMPORTAMENTAIS' },
  comp_5: { pergunta: 'Os colaboradores da contratada contribuem ativamente para a higiene, organização e segurança das áreas de atuação?', grupo: 'COMPORTAMENTAIS' },

  qual_1: { pergunta: 'Pesquisa de opinião: o nível de satisfação dos usuários e pacientes pelo serviço prestado está dentro da meta estipulada?', grupo: 'QUALIDADE' },
  qual_2: { pergunta: 'Os colaboradores participam dos treinamentos obrigatórios (integração, SBV, Metas Internacionais de Segurança)?', grupo: 'QUALIDADE' },
  qual_3: { pergunta: 'Os indicadores contratuais e relatórios operacionais são alimentados e entregues rigorosamente no prazo?', grupo: 'QUALIDADE' },
  qual_4: { pergunta: 'O gestor do fornecedor participa das reuniões de alinhamento mensal e análise crítica de desempenho?', grupo: 'QUALIDADE' },
  qual_5: { pergunta: 'As tratativas de não conformidades e planos de ação preventivos/corretivos são executados nos prazos firmados?', grupo: 'QUALIDADE' }
};

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

  // Detect Archetype for custom criteria if evaluation was created via specific archetype
  const detectedArchetype = ArchetypesService.detectArchetype(
    supplier?.setorResponsavelId || evaluation.setorId,
    supplier?.categoriaServico || ''
  );

  const archetypeLegal = ArchetypesService.getLegalCriteria(detectedArchetype);
  const { behavioral: archetypeBehavioral, quality: archetypeQuality } = ArchetypesService.getBehavioralAndQualityCriteria(detectedArchetype);

  // Mapeia todas as respostas contidas no objeto de avaliação sem truncar nada
  const responseKeys = Object.keys(evaluation.respostas);

  // Se a avaliação tiver as chaves padrão ou customizadas, montamos a lista completa de perguntas
  const criteriaList = responseKeys.map(key => {
    if (MASTER_15_QUESTIONS[key]) {
      return {
        id: key,
        pergunta: MASTER_15_QUESTIONS[key].pergunta,
        grupo: MASTER_15_QUESTIONS[key].grupo
      };
    }

    const match = [...archetypeLegal, ...archetypeBehavioral, ...archetypeQuality].find(c => c.id === key);
    if (match) {
      return {
        id: key,
        pergunta: match.pergunta,
        grupo: match.bloco === 'LEGAL' ? 'LEGAIS' : match.bloco === 'COMPORTAMENTAL' ? 'COMPORTAMENTAIS' : 'QUALIDADE'
      };
    }

    const isComp = key.startsWith('comp');
    const isQual = key.startsWith('qual');
    return {
      id: key,
      pergunta: `Item de Avaliação Registrado (${key})`,
      grupo: isComp ? 'COMPORTAMENTAIS' : isQual ? 'QUALIDADE' : 'LEGAIS'
    };
  });

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto font-sans no-print-bg">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Barra de Ações Superior (Exibida SOMENTE na Tela Normal - Oculta na Impressão) */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between no-print border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <FileCheck2 className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-sm text-white">
              Visualização de Laudo Oficial — Impressão Formal A4 Multipáginas
            </h3>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow transition cursor-pointer"
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimir / Salvar em PDF
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              title="Fechar Janela"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- CONTEÚDO EXCLUSIVO DO LAUDO (ELEMENTO #printable-report) --- */}
        <div id="printable-report" className="p-6 sm:p-8 space-y-6 text-slate-900 bg-white">
          
          {/* 1. Cabeçalho Institucional */}
          <div className="border-b-2 border-slate-900 pb-3 flex items-center justify-between printable-avoid-break">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-1 rounded-lg border border-slate-200 flex items-center justify-center">
                <img
                  src="/logo-rede-dor.webp"
                  alt="Logo Rede D'Or"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wide">
                  REDE D'OR – HOSPITAL VILA NOVA STAR
                </h1>
                <p className="text-xs text-slate-700 font-bold">
                  DIRETORIA OPERACIONAL | GESTÃO DE CONTRATOS E SLA
                </p>
                <p className="text-[10px] text-slate-500">Sistema Oficial de Avaliação Anual de Desempenho de Fornecedores</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-300 block">
                Nº {evaluation.id.toUpperCase()}
              </span>
              <span className="text-xs text-slate-600 font-bold mt-1 block">
                Data: {evaluation.dataAvaliacao}
              </span>
            </div>
          </div>

          {/* 2. Título & 3. Ciclo Avaliado */}
          <div className="bg-slate-50 border border-slate-300 p-3 rounded-xl text-center space-y-1 printable-avoid-break">
            <h2 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-tight">
              LAUDO DE AVALIAÇÃO ANUAL DE DESEMPENHO E CONTRATO DE PRESTAÇÃO DE SERVIÇOS
            </h2>
            <p className="text-xs text-slate-600 font-bold uppercase">CICLO AVALIADO: ANO DE {evaluation.ano}</p>
          </div>

          {/* 4. Dados Cadastrais do Fornecedor e Contrato */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3 printable-avoid-break text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-slate-500 text-[10px] font-bold block uppercase">RAZÃO SOCIAL</span>
                <strong className="text-slate-900 font-bold block leading-tight">{supplier?.razaoSocial || 'N/A'}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-bold block uppercase">NOME FANTASIA</span>
                <strong className="text-slate-900 font-bold block leading-tight">{supplier?.nomeFantasia || 'N/A'}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-bold block uppercase">CNPJ</span>
                <strong className="text-slate-900 font-bold block">{supplier?.cnpj || 'N/A'}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-bold block uppercase">Nº DO CONTRATO</span>
                <strong className="text-slate-900 font-bold block">{supplier?.numeroContrato || 'N/A'}</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-200">
              <div>
                <span className="text-slate-500 text-[10px] font-bold block uppercase">SETOR RESPONSÁVEL</span>
                <strong className="text-slate-900 font-bold block">{sector?.nome || 'Setor Hospitalar'}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-bold block uppercase">GESTOR HOSPITALAR</span>
                <strong className="text-slate-900 font-bold block">{sector?.gestorResponsavel || evaluation.gestorAvaliador}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-bold block uppercase">GESTOR AVALIADOR</span>
                <strong className="text-slate-900 font-bold block">{evaluation.gestorAvaliador}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-bold block uppercase">CONTATO DO FORNECEDOR</span>
                <strong className="text-slate-900 font-bold block truncate">{supplier?.contatoNome} ({supplier?.contatoTelefone})</strong>
              </div>
            </div>
          </div>

          {/* 5. Quadro Síntese de Médias de SLA */}
          <div className="border-2 border-slate-900 rounded-xl p-4 bg-white space-y-3 printable-avoid-break">
            <h3 className="text-center font-black text-xs text-slate-900 uppercase tracking-wide">
              QUADRO SÍNTESE DE MÉDIAS E DESEMPENHO DE SLA
            </h3>

            <div className="grid grid-cols-4 gap-3 text-center text-xs">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">ASPECTOS LEGAIS</span>
                <strong className="text-base font-black text-slate-900">{evaluation.mediaLegais.toFixed(2)}</strong>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">COMPORTAMENTAIS</span>
                <strong className="text-base font-black text-slate-900">{evaluation.mediaComportamentais.toFixed(2)}</strong>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">QUALIDADE & SEG.</span>
                <strong className="text-base font-black text-slate-900">{evaluation.mediaQualidade.toFixed(2)}</strong>
              </div>
              <div className="p-2 bg-slate-900 text-white rounded-lg border border-slate-900">
                <span className="text-[10px] text-teal-300 font-bold uppercase block">MÉDIA GERAL SLA</span>
                <strong className="text-lg font-black text-teal-300">{evaluation.mediaGeral.toFixed(2)}</strong>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
              <span className="font-bold text-slate-700">Classificação da Meta (Mínimo 4.00):</span>
              <span className={`font-black px-3 py-1 rounded-full uppercase ${
                evaluation.mediaGeral >= 4.0 
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                {evaluation.mediaGeral >= 4.0 ? `Dentro da Meta (${evaluation.mediaGeral.toFixed(2)})` : `Abaixo da Meta (${evaluation.mediaGeral.toFixed(2)})`}
              </span>
            </div>
          </div>

          {/* 6. Detalhamento Integral das 15 Perguntas (Com Suporte Multipáginas A4) */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-slate-900 uppercase border-b border-slate-400 pb-1 printable-avoid-break">
              DETALHAMENTO DE NOTAS POR PERGUNTA AVALIADA ({criteriaList.length} ITENS AVALIADOS)
            </h4>

            <div className="w-full">
              <table className="w-full text-left border border-slate-300 rounded-lg text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-900 uppercase font-bold border-b border-slate-400">
                  <tr>
                    <th className="py-2 px-3 text-center w-10 border-r border-slate-300">ITEM</th>
                    <th className="py-2 px-3 border-r border-slate-300">ITEM AVALIADO</th>
                    <th className="py-2 px-3 text-center w-32 border-r border-slate-300">GRUPO</th>
                    <th className="py-2 px-3 text-center w-20">NOTA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {criteriaList.map((c, i) => {
                    const score = evaluation.respostas[c.id];
                    return (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="py-2 px-3 text-center text-slate-500 font-bold border-r border-slate-200">{i + 1}</td>
                        <td className="py-2 px-3 text-slate-900 border-r border-slate-200 leading-relaxed font-normal">{c.pergunta}</td>
                        <td className="py-2 px-3 text-center text-slate-700 font-bold border-r border-slate-200 text-[11px]">{c.grupo}</td>
                        <td className="py-2 px-3 text-center font-extrabold text-slate-900 text-sm">
                          {score === 'NA' ? 'N/A' : score !== undefined ? score : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 7. Parecer Geral do Gestor & 8/9. Área de Assinaturas */}
          <div className="border-t border-slate-300 pt-3 space-y-4 printable-avoid-break text-xs">
            <div>
              <strong className="text-slate-900 font-bold uppercase block text-xs mb-1">7. PARECER GERAL DO GESTOR HOSPITALAR:</strong>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-300 text-slate-900 italic leading-relaxed">
                "{evaluation.parecerGeral || 'Avaliação realizada e aprovada pela Diretoria Operacional.'}"
              </p>
            </div>

            {/* Área de Assinaturas Executivas em 2 Colunas */}
            <div className="grid grid-cols-2 gap-8 pt-6">
              {/* 8. Assinatura do Gestor do Contrato */}
              <div className="border-t-2 border-slate-800 pt-2 text-center space-y-1">
                <strong className="text-slate-900 font-bold block text-xs">{evaluation.gestorAvaliador}</strong>
                <span className="text-[11px] text-slate-600 block">Gestor do Contrato / Diretoria Operacional</span>
                <span className="text-[10px] text-slate-400 block">REDE D'OR – HOSPITAL VILA NOVA STAR</span>
              </div>

              {/* 9. Assinatura/Representante do Fornecedor */}
              <div className="border-t-2 border-slate-800 pt-2 text-center space-y-1">
                {evaluation.assinaturaDigitalUrl ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={evaluation.assinaturaDigitalUrl} 
                      alt="Assinatura Digital" 
                      className="h-9 w-auto object-contain mb-1"
                    />
                    <strong className="text-slate-900 font-bold block text-xs">{evaluation.nomeSignatario || 'Preposto Fornecedor'}</strong>
                    <span className="text-[10px] text-emerald-700 font-bold block">Assinado Digitalmente em {evaluation.dataCiencia}</span>
                  </div>
                ) : (
                  <div>
                    <strong className="text-slate-900 font-bold block text-xs">
                      {evaluation.nomeSignatario || supplier?.contatoNome || 'Preposto / Representante Legal'}
                    </strong>
                    <span className="text-[11px] text-slate-600 block">{evaluation.cargoSignatario || 'Representante do Fornecedor'}</span>
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
