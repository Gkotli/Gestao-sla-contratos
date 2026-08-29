import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

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

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white font-sans">
          <div className="bg-slate-800 max-w-lg w-full p-8 rounded-2xl border border-slate-700 shadow-2xl space-y-6 text-center">
            <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Não foi possível carregar esta visualização</h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Ocorreu uma inconsistência temporária na renderização dos dados. O erro foi registrado e contido com segurança.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={this.handleReset}
                className="w-full inline-flex items-center justify-center px-5 py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 rounded-xl shadow-lg transition"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Recarregar Sistema e Voltar ao Histórico
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
