import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw, RefreshCw } from 'lucide-react';
import { StorageService } from '../services/storageService';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled React Error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleResetState = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleResetAllData = () => {
    StorageService.resetAllData();
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white font-sans">
          <div className="bg-slate-800 max-w-xl w-full p-8 rounded-2xl border border-slate-700 shadow-2xl space-y-6 text-center">
            <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Inconsistência de Dados Identificada</h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Foi detectada uma diferença no formato dos registros armazenados no navegador. O sistema evitou o travamento da página.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-700/80 text-left text-[11px] font-mono text-rose-400 overflow-x-auto">
                <strong>Detalhe técnico:</strong> {this.state.error.message}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={this.handleResetState}
                className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-slate-200 bg-slate-700 hover:bg-slate-600 rounded-xl transition cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Recarregar Página
              </button>

              <button
                onClick={this.handleResetAllData}
                className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 rounded-xl shadow-lg transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Restaurar Base & Limpar
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
