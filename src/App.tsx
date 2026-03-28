import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, 
  Database, 
  Factory, 
  Truck, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Ghost,
  Box,
  Construction,
  Fuel,
  ShieldCheck,
  Cpu,
  Wrench,
  FileText,
  Clock
} from 'lucide-react';

const App = () => {
  const [activeAlea, setActiveAlea] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [health, setHealth] = useState(100);

  useEffect(() => {
    if (activeAlea && !showSolution) {
      setHealth(30);
    } else if (activeAlea && showSolution) {
      setHealth(95);
    } else {
      setHealth(100);
    }
  }, [activeAlea, showSolution]);

  const steps = [
    {
      id: 'ecomm',
      title: 'E-Commerce',
      icon: <ShoppingCart className="w-10 h-10" />,
      desc: 'Portail Client',
      color: 'bg-pink-500',
    },
    {
      id: 'erp',
      title: 'Cerveau ERP',
      icon: <Database className="w-10 h-10" />,
      desc: 'Intelligence Centrale',
      color: 'bg-indigo-500',
    },
    {
      id: 'factory',
      title: 'Production',
      icon: <Factory className="w-10 h-10" />,
      desc: 'Usine Connectée',
      color: 'bg-orange-500',
    },
    {
      id: 'logistics',
      title: 'Logistique',
      icon: <Truck className="w-10 h-10" />,
      desc: 'Flux Sortant',
      color: 'bg-cyan-500',
    }
  ];

  const aleas = [
    {
      id: 'site_out',
      label: 'Site HS 👻',
      target: 'ecomm',
      fromIdx: 0,
      toIdx: 0,
      agent: 'Alterway',
      msg: 'Le serveur est tombé !',
      icon: <Ghost size={20} />,
      solution: {
        hero: "Alterway",
        action: "Auto-rétablissement via sondes actives.",
        timer: "< 15 min",
        details: "L'infrastructure détecte sa propre chute et redémarre les services critiques.",
        icon: <ShieldCheck className="text-emerald-400" />
      }
    },
    {
      id: 'stock_out',
      label: 'Rupture Stock 📦',
      target: 'factory',
      fromIdx: 2,
      toIdx: 1,
      agent: 'IA',
      msg: 'Matière première épuisée !',
      icon: <Box size={20} />,
      solution: {
        hero: "IA Supervision",
        action: "Pivot vers fournisseurs alternatifs.",
        timer: "Instantané",
        details: "Identification et génération de documentation contractuelle automatique.",
        icon: <Cpu className="text-emerald-400" />
      }
    },
    {
      id: 'machine_break',
      label: 'Panne Machine 🛠️',
      target: 'factory',
      fromIdx: 2,
      toIdx: 1,
      agent: 'IA',
      msg: 'Ligne de prod stoppée !',
      icon: <Construction size={20} />,
      solution: {
        hero: "ERP Prédictif",
        action: "Activation maintenance & SLA.",
        timer: "Automatique",
        details: "Déclenchement immédiat de l'ordre de réparation via contrats existants.",
        icon: <Wrench className="text-emerald-400" />
      }
    },
    {
      id: 'fuel_crisis',
      label: 'Pénurie Essence ⛽',
      target: 'logistics',
      fromIdx: 3,
      toIdx: 1,
      agent: 'IA',
      msg: 'Livraisons bloquées !',
      icon: <Fuel size={20} />,
      solution: {
        hero: "Intelligence ERP",
        action: "Routage vers nouveaux logisticiens.",
        timer: "Temps réel",
        details: "L'IA détecte la zone de pénurie et change de transporteur dynamiquement.",
        icon: <FileText className="text-emerald-400" />
      }
    }
  ];

  const handleAleaClick = (id) => {
    setActiveAlea(activeAlea === id ? null : id);
    setShowSolution(false);
  };

  const ResilienceLine = () => {
    if (!showSolution || !activeAlea) return null;
    const alea = aleas.find(a => a.id === activeAlea);
    const isSelf = alea.fromIdx === alea.toIdx;
    const startX = 12.5 + (alea.fromIdx * 25);
    const endX = 12.5 + (alea.toIdx * 25);
    
    if (isSelf) {
      return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
          <path 
            d={`M ${startX}% 25% Q ${startX}% 5%, ${startX + 5}% 15% T ${startX}% 25%`}
            fill="none"
            stroke="#10b981"
            strokeWidth="4"
            strokeDasharray="8 4"
            className="animate-[dash_2s_linear_infinite]"
          />
          <foreignObject x={`${startX - 5}%`} y="2%" width="120" height="40">
            <div className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg border-2 border-white animate-pulse text-center">
              {alea.agent}
            </div>
          </foreignObject>
        </svg>
      );
    }

    const midX = (startX + endX) / 2;
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
        <path 
          d={`M ${startX}% 25% Q ${midX}% 0%, ${endX}% 25%`}
          fill="none"
          stroke="#10b981"
          strokeWidth="4"
          strokeDasharray="8 4"
          className="animate-[dash_2s_linear_infinite]"
        />
        <foreignObject x={`${midX - 5}%`} y="5%" width="100" height="40">
          <div className="bg-emerald-500 text-white text-[10px] font-black px-4 py-1 rounded-full shadow-lg border-2 border-white animate-bounce text-center">
            {alea.agent}
          </div>
        </foreignObject>
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12 font-sans text-slate-100 overflow-hidden relative">
      <style>{`
        @keyframes dash { to { stroke-dashoffset: -24; } }
        @keyframes shimmer { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
      `}</style>
      
      <div className="max-w-6xl mx-auto">
        {/* Header Dashboard */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 backdrop-blur-xl shadow-2xl">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></span>
               <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">Système de Continuité Actif</span>
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
              <Zap className="fill-yellow-400 text-yellow-400" /> Smart Supply Resilience
            </h1>
          </div>
          
          <div className="bg-slate-950 px-6 py-4 rounded-2xl border border-slate-800 flex items-center gap-8">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Disponibilité</p>
              <p className={`text-2xl font-black ${health > 80 ? 'text-emerald-400' : 'text-red-500'}`}>{health}%</p>
            </div>
            <div className="w-px h-10 bg-slate-800"></div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Statut</p>
              <p className="text-2xl font-black text-indigo-400 font-mono tracking-tighter uppercase">Opérationnel</p>
            </div>
          </div>
        </header>

        {/* La Chaîne Visuelle avec Overlay SVG */}
        <div className="relative mb-20">
          <ResilienceLine />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, idx) => {
              const currentAlea = activeAlea && aleas.find(a => a.id === activeAlea);
              const isTarget = currentAlea?.target === step.id;
              const isResolutionTile = showSolution && currentAlea?.toIdx === idx;
              
              return (
                <div key={step.id} className="group">
                  <div className={`
                    relative h-full bg-slate-900/80 rounded-[2rem] p-8 text-center border-2 transition-all duration-700
                    ${isTarget && !showSolution ? 'border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.2)] scale-105' : 'border-slate-800'}
                    ${isResolutionTile ? 'border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.2)] scale-105 bg-emerald-950/10' : ''}
                  `}>
                    <div className={`
                      mx-auto w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-6 transition-all duration-500
                      ${isTarget && !showSolution ? 'bg-red-500 animate-bounce' : isResolutionTile ? 'bg-emerald-500 scale-110' : `${step.color} shadow-xl shadow-black/40`}
                    `}>
                      {isTarget && !showSolution ? <AlertCircle size={40} /> : isResolutionTile ? <ShieldCheck size={40} /> : step.icon}
                    </div>
                    
                    <h3 className="text-xl font-black text-white mb-2">{step.title}</h3>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{step.desc}</p>

                    {isTarget && !showSolution && (
                      <div className="mt-4 bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-black p-2 rounded-xl animate-pulse uppercase tracking-wider">
                        Incident Critique
                      </div>
                    )}
                    {isResolutionTile && (
                      <div className="mt-4 bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 text-[10px] font-black p-2 rounded-xl uppercase tracking-wider">
                         Pôle de Résolution
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Panneau de Contrôle - Côte à côte sur Desktop/Tablette */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Menu des Aléas (Côté Gauche) */}
          <div className="md:col-span-4 bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800">
            <h2 className="text-sm font-black text-slate-500 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
              <Zap size={16} /> Laboratoire d'Aléas
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {aleas.map((alea) => (
                <button
                  key={alea.id}
                  onClick={() => handleAleaClick(alea.id)}
                  className={`
                    w-full flex items-center justify-between p-5 rounded-2xl font-bold transition-all border-2 text-left
                    ${activeAlea === alea.id 
                      ? 'bg-red-500 border-red-400 text-white shadow-xl translate-x-2' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'}
                  `}
                >
                  <span className="flex items-center gap-4">
                    <span className={`p-2 rounded-lg ${activeAlea === alea.id ? 'bg-white/20' : 'bg-slate-800'}`}>
                      {alea.icon}
                    </span>
                    {alea.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Visionneuse de Résilience (Côté Droit) */}
          <div className="md:col-span-8">
            {!activeAlea ? (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-[2.5rem] p-10 text-slate-700 bg-slate-900/20">
                <ShieldCheck size={64} className="mb-6 opacity-10" />
                <p className="font-bold text-center text-lg uppercase tracking-widest opacity-30 italic">Sélectionnez un incident pour tester la résilience</p>
              </div>
            ) : (
              <div className="h-full bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-500 shrink-0">
                        <AlertCircle size={24} />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                        {aleas.find(a => a.id === activeAlea).msg}
                      </h2>
                    </div>
                    
                    {!showSolution && (
                      <button 
                        onClick={() => setShowSolution(true)}
                        className="group bg-emerald-500 hover:bg-emerald-400 text-white font-black px-6 py-4 md:px-8 md:py-5 rounded-2xl shadow-xl shadow-emerald-900/40 transition-all flex items-center justify-center gap-3 active:scale-95 whitespace-nowrap"
                      >
                        <Zap size={20} className="group-hover:rotate-12 transition-transform" /> 
                        VISUALISER LA RÉSILIENCE
                      </button>
                    )}
                  </div>

                  {showSolution && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-3xl">
                        <div className="bg-emerald-500 p-4 rounded-2xl text-white shadow-lg shadow-emerald-500/20 w-fit shrink-0">
                          {aleas.find(a => a.id === activeAlea).solution.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Agent Actif : {aleas.find(a => a.id === activeAlea).solution.hero}</p>
                          <p className="text-white font-bold text-lg md:text-xl leading-snug">{aleas.find(a => a.id === activeAlea).solution.action}</p>
                        </div>
                        <div className="sm:text-right shrink-0">
                           <p className="text-slate-500 text-[10px] font-black uppercase mb-1">Délai</p>
                           <p className="text-emerald-400 font-black text-xl">{aleas.find(a => a.id === activeAlea).solution.timer}</p>
                        </div>
                      </div>

                      <div className="p-6 bg-slate-950/80 rounded-3xl border border-slate-800 relative">
                        <p className="text-slate-400 italic text-sm md:text-base leading-relaxed">
                          "{aleas.find(a => a.id === activeAlea).solution.details}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {showSolution && (
                  <div className="mt-8 flex gap-3">
                    <div className="flex-1 h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <footer className="mt-16 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-700 font-bold text-[10px] uppercase tracking-[0.4em] text-center">
           <span>Architecture Résiliente 2024</span>
           <div className="flex gap-4">
              <span>Flux Intégrés</span>
              <span>•</span>
              <span>Continuité Garantie</span>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
