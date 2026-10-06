// Ajuste único: a "Diretoria Geral / Operacional" foi dividida em dois setores.
//  - Diretoria (Maria Luisa): somente GSH (Banco de Sangue), Senne Liquor e Davita/Catene
//  - Operacional (Mariana Candiotto): os demais fornecedores que estavam na Diretoria
// Avaliações já registradas mantêm o setor da época (os laudos emitidos não mudam de gestor).
// Roda uma vez: depois que o setor Operacional existe, não mexe em mais nada.
import { Sector, Supplier, User } from '../types';
import { StorageService } from './storageService';

export const SEC_DIRETORIA = 'sec_diretoria';
export const SEC_OPERACIONAL = 'sec_operacional';

const FICAM_NA_DIRETORIA = /\bgsh\b|g\s+s\s+h|banco de sangue|hemoterapia|senne|davita|catene/i;

export function ficaNaDiretoria(sup: Supplier): boolean {
  return FICAM_NA_DIRETORIA.test(`${sup.nomeFantasia} ${sup.razaoSocial}`);
}

export function aplicarDivisaoDiretoria(): boolean {
  const sectors = StorageService.getSectors();
  if (sectors.length === 0 || sectors.some(s => s.id === SEC_OPERACIONAL)) return false;
  if (!sectors.some(s => s.id === SEC_DIRETORIA)) return false;

  const users = StorageService.getUsers();
  const mariaLuisa = users.find(u => /maria luisa/i.test(u.nome));
  const mariana = users.find(u => /candiotto/i.test(u.nome));

  const operacional: Sector = {
    id: SEC_OPERACIONAL,
    nome: 'Operacional',
    gestorResponsavel: mariana?.nome || 'Mariana Ferres Candiotto',
    emailGestor: mariana?.email || 'mariana.candiotto@rededor.com.br'
  };
  StorageService.saveSectors([
    ...sectors.map(s => s.id !== SEC_DIRETORIA ? s : {
      ...s,
      nome: 'Diretoria',
      gestorResponsavel: mariaLuisa?.nome || s.gestorResponsavel,
      emailGestor: mariaLuisa?.email || s.emailGestor
    }),
    operacional
  ]);

  const movidos = StorageService.getSuppliers()
    .filter(sup => sup.setorResponsavelId === SEC_DIRETORIA && !ficaNaDiretoria(sup))
    .map(sup => ({ ...sup, setorResponsavelId: SEC_OPERACIONAL }));
  if (movidos.length > 0) StorageService.saveSuppliers(movidos);

  if (mariana && mariana.setorId !== SEC_OPERACIONAL) {
    StorageService.saveUser({ ...mariana, setorId: SEC_OPERACIONAL } as User);
  }
  return true;
}
