import { useState, useEffect } from 'react';
import { Pill, HeartPulse, CalendarDays, Stethoscope, HandHeart, CircleUserRound, Search, Bell, Database, Webhook, Bot, History } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inputBusqueda, setInputBusqueda] = useState(''); 
  const [preguntaMostrada, setPreguntaMostrada] = useState('¿Cuándo fue mi última cita con el doctor del corazón y qué pastillas me mandó a comprar?');
  
  const [citas, setCitas] = useState([]);
  const [inventario, setInventario] = useState([]);
  const [signos, setSignos] = useState([]); 

  const [iaRespuesta, setIaRespuesta] = useState('');
  const [iaSql, setIaSql] = useState('');
  const [cargandoIA, setCargandoIA] = useState(false);

  const [restMethod, setRestMethod] = useState('POST');
  const [restUrl, setRestUrl] = useState('http://localhost:3000/api/v1/pacientes/');
  const [restBody, setRestBody] = useState('{\n  "documentoJson": {\n    "_id": "P-999",\n    "nombre": "Clotilde Bazán",\n    "edad": 78\n  }\n}');
  const [restResponse, setRestResponse] = useState('Esperando petición...');
  const [cargandoRest, setCargandoRest] = useState(false);

  const [selectedQueryId, setSelectedQueryId] = useState(1);
  const [queryEjecutada, setQueryEjecutada] = useState(false);
  
  const queryActiva = CATALOGO_QUERIES.find(q => q.id === parseInt(selectedQueryId));

  const ejecutarPeticionRest = async () => {
    setCargandoRest(true);
    setRestResponse('Procesando...');
    try {
      const opciones = {
        method: restMethod,
        headers: { 'Content-Type': 'application/json' }
      };
      
      if (restMethod !== 'GET') {
        opciones.body = restBody; 
      }

      const res = await fetch(restUrl, opciones);
      const data = await res.json();

      setRestResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setRestResponse(`Error de conexión: ${error.message}`);
    } finally {
      setCargandoRest(false);
    }
  };

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resCitas = await fetch('http://localhost:3000/api/v1/citas/paciente/P-902');
        const dataCitas = await resCitas.json();
        if (dataCitas.status === 'success') setCitas(dataCitas.data);

        const resInv = await fetch('http://localhost:3000/api/v1/inventario/paciente/P-902');
        const dataInv = await resInv.json();
        if (dataInv.status === 'success') setInventario(dataInv.data);

        const resSignos = await fetch('http://localhost:3000/api/v1/signos/paciente/P-902');
        const dataSignos = await resSignos.json();
        if (dataSignos.status === 'success') setSignos(dataSignos.data);
      } catch (error) {
        console.error("Error conectando con Oracle:", error);
      }
    };
    cargarDatos();
  }, []);

  const proximaCita = citas.find(c => (c.ESTADO || c.estado) === 'Pendiente');
  const ultimoSigno = signos.length > 0 ? signos[signos.length - 1] : null;

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900">
      <aside className="w-72 bg-red-950 text-white flex flex-col p-6 shadow-2xl z-10 border-r-4 border-red-700">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-red-800">
          <div className="bg-white p-2 rounded-xl text-red-900 shadow-md">
            <HeartPulse size={32} strokeWidth={2.5}/>
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Health<span className='text-red-400'>Easy</span></h1>
            <p className="text-xs text-red-200 font-medium">Portal del Adulto Mayor</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* SECCIÓN 1: LO QUE VE EL PACIENTE */}
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-3">Mi Salud (Para Usuario)</p>
          <nav className="flex flex-col gap-2 mb-8">
            <MenuButton activeTab={activeTab} setActiveTab={setActiveTab} id="dashboard" icon={CalendarDays} label="Mi Resumen Diario" />
            <MenuButton activeTab={activeTab} setActiveTab={setActiveTab} id="historial" icon={Stethoscope} label="Mis Citas y Recetas" />
            <MenuButton activeTab={activeTab} setActiveTab={setActiveTab} id="ia" icon={Bot} label="Pregúntale a la IA (D9)" />
          </nav>

          {/* SECCIÓN 2: ENTREGABLES */}
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-3">Evaluación Técnica (Para Profesor)</p>
          <nav className="flex flex-col gap-2">
            <MenuButton activeTab={activeTab} setActiveTab={setActiveTab} id="catalogo" icon={Database} label="Catálogo SQL (D5)" />
            <MenuButton activeTab={activeTab} setActiveTab={setActiveTab} id="rest" icon={HandHeart} label="Módulo REST API (D6)" />
            
          </nav>
        </div>
      </aside>

    
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header bar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shadow-sm">
          <div className='flex items-center gap-2'>
            <h2 className="text-2xl font-bold text-slate-800">
              Bienvenidos 👋
            </h2>
          </div>
          <div className="flex items-center gap-4">
             <button className="p-3 rounded-full text-red-600 bg-red-50 hover:bg-red-100 transition-colors relative">
                <Bell size={24}/>
                <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="flex items-center gap-3 ml-4 border-l border-slate-200 pl-6">
               <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 overflow-hidden border-2 border-white shadow-md">
                 <CircleUserRound size={32} />
               </div>
               <div>
                  <p className='font-bold text-slate-900'>Ernesto Martínez</p>
                  <p className='text-sm text-slate-500'>Paciente • 72 años</p>
               </div>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-100">

          {activeTab === 'dashboard' ? (
            <div className="flex flex-col gap-6 h-full">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 text-red-600 p-3 rounded-2xl"><CalendarDays size={28} /></div>
                    <h3 className="text-lg font-bold text-slate-700">Próxima Cita</h3>
                  </div>
                  <div>
                    {proximaCita ? (
                      <>
                        <p className="text-2xl font-black text-slate-800 mb-1">{new Date(proximaCita.FECHA_HORA || proximaCita.fecha_hora).toLocaleDateString()}</p>
                        <p className="text-slate-500 font-medium flex items-center gap-2 text-sm">
                          <Stethoscope size={16}/> {proximaCita.DOCTOR || proximaCita.doctor}
                        </p>
                      </>
                    ) : (
                      <p className="text-lg font-bold text-slate-400">Sin citas pendientes</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 text-emerald-600 p-3 rounded-2xl"><Pill size={28} /></div>
                    <h3 className="text-lg font-bold text-slate-700">Medicación Activa</h3>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-slate-800 mb-1">{inventario.length} Tipos</p>
                    <p className="text-slate-500 font-medium text-sm">Registrados en el sistema</p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl"><HeartPulse size={28} /></div>
                    <h3 className="text-lg font-bold text-slate-700">Última Presión</h3>
                  </div>
                  <div>
                    {ultimoSigno ? (
                      <>
                        <p className="text-3xl font-black text-slate-800 mb-1">{ultimoSigno.PRESION_SISTOLICA || ultimoSigno.presion_sistolica} / {ultimoSigno.PRESION_DIASTOLICA || ultimoSigno.presion_diastolica}</p>
                        <p className="text-slate-500 font-medium text-sm">Registrado el {ultimoSigno.FECHA || ultimoSigno.fecha}</p>
                      </>
                    ) : (
                      <p className="text-lg font-bold text-slate-400">Sin registros</p>
                    )}
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-800 mb-6">Mi Presión Arterial (Últimos Días)</h3>
                  <div className="flex-1 flex items-end gap-4 justify-between pt-4 pb-2">
                    {signos.map((s, idx) => {
                      const sis = s.PRESION_SISTOLICA || s.presion_sistolica;
                      const dia = s.PRESION_DIASTOLICA || s.presion_diastolica;
                      const fecha = s.FECHA || s.fecha;
                      const esAlta = sis > 135; 
                      const altura = Math.min((sis / 180) * 100, 100); 

                      return (
                        <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                          <div className="w-full bg-slate-100 rounded-t-xl h-40 relative flex items-end justify-center group cursor-pointer">
                            <div 
                              className={`w-full rounded-t-xl transition-all duration-500 ${esAlta ? 'bg-red-400 hover:bg-red-500' : 'bg-blue-400 hover:bg-blue-500'}`} 
                              style={{ height: `${altura}%` }}
                            ></div>
                            <span className="absolute -top-8 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              Toma: {sis}/{dia} 
                            </span>
                          </div>
                          <span className={`text-sm ${esAlta ? 'font-bold text-red-500' : 'font-medium text-slate-500'}`}>{fecha}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-800 mb-6">Mis Medicinas Frecuentes</h3>
                  <div className="flex-1 overflow-y-auto pr-2">
                    <ul className="flex flex-col gap-4">
                      {inventario.slice(0, 4).map((item, index) => {
                        const nombre = item.NOMBRE_COMERCIAL || item.nombre_comercial;
                        const uso = item.USO_PRINCIPAL || item.uso_principal;
                        const estado = item.ESTADO_TEXTO || item.estado_texto;
                        
                        let colorBadge = 'bg-slate-100 text-slate-700';
                        if (estado === 'Lleno') colorBadge = 'bg-emerald-100 text-emerald-700';
                        if (estado === 'Vacío') colorBadge = 'bg-red-100 text-red-700';
                        if (estado.includes('Quedan')) colorBadge = 'bg-yellow-100 text-yellow-700';

                        return (
                          <li key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-4">
                              <div className="bg-white p-2 rounded-xl shadow-sm text-lg">💊</div>
                              <div>
                                <p className="font-bold text-slate-800">{nombre}</p>
                                <p className="text-sm text-slate-500">{uso}</p>
                              </div>
                            </div>
                            <span className={`font-bold px-3 py-1 rounded-full text-xs ${colorBadge}`}>{estado}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

              </div>
            </div>

          ) : activeTab === 'ia' ? (
            <div className="flex flex-col h-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              
              <div className="bg-red-950 p-5 text-white flex items-center justify-between shadow-md z-10">
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Bot size={20} className="text-red-400" /> Cato AI 
                  </h3>
                  <p className="text-xs text-red-200 mt-1">Transforma lenguaje natural a consultas SQL en Oracle 23ai.</p>
                </div>
                <div className="bg-red-900 border border-red-700 px-4 py-1.5 rounded-full text-xs font-mono text-emerald-400 shadow-inner flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  NLQ Engine Online
                </div>
              </div>

              <div className="flex-1 p-8 overflow-y-auto bg-slate-50 flex flex-col gap-6">

                <div className="border-b-2 border-slate-200 pb-6 mb-2">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Search size={16} /> Consulta Procesada:
                  </p>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                    "{preguntaMostrada}"
                  </h2>
                </div>  

                {/* 2. Respuesta de la IA (Caja de Texto, NO tabla) */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
                  <p className="text-xl font-bold text-emerald-700 mb-4 flex items-center gap-2">
                    Respuesta del Asistente:
                  </p>
                  
                  {cargandoIA ? (
                    <div className="text-slate-500 font-medium animate-pulse flex items-center gap-2">
                      <Bot size={20} /> Procesando lenguaje natural y consultando BD...
                    </div>
                  ) : (
                    <p className="text-lg text-slate-700 leading-relaxed font-medium">
                      {iaRespuesta || "Hola Don Ernesto. Escribe una pregunta abajo (Ej: '¿Cuánto tengo de complejo B?' o '¿Cuándo es mi próxima cita?') y consultaré tu expediente médico."}
                    </p>
                  )}
                </div>

                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm mt-4">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Database size={16} className="text-red-400"/>
                      <span className="font-bold text-sm tracking-wider uppercase">Generación SQL Dinámica (Evaluación NLQ)</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded font-mono">Backend Node.js Parser</span>
                  </div>
                  
                  <div className="font-mono text-xs md:text-sm text-emerald-400 overflow-x-auto">
                    <code>
                      {iaSql || "-- Aquí aparecerá la sentencia SQL generada automáticamente basándose en tu texto."}
                    </code>
                  </div>
                </div>

              </div>

              <div className="p-5 bg-white border-t border-slate-200 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
                <form className="flex gap-4" onSubmit={async (e) => {
                  e.preventDefault();
                  if(inputBusqueda.trim() !== '') {
                    setPreguntaMostrada(inputBusqueda);
                    setCargandoIA(true);
                    
                    try {
                      const response = await fetch('http://localhost:3000/api/v1/ia/preguntar', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ pregunta: inputBusqueda, idPaciente: 'P-902' })
                      });
                      
                      const data = await response.json();
                      if(data.status === 'success') {
                        setIaRespuesta(data.respuesta);
                        setIaSql(data.sql);
                      }
                    } catch (error) {
                      setIaRespuesta("Error de conexión con el motor IA.");
                    } finally {
                      setCargandoIA(false);
                      setInputBusqueda(''); 
                    }
                  }
                }}>
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      value={inputBusqueda}
                      onChange={(e) => setInputBusqueda(e.target.value)}
                      placeholder="Ej: ¿Cuánto tengo de complejo B?" 
                      className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all text-slate-800 text-lg placeholder-slate-400 font-medium bg-slate-50 focus:bg-white" 
                    />
                  </div>
                  <button type="submit" disabled={cargandoIA} className="bg-red-800 hover:bg-red-900 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-md flex items-center gap-3 disabled:opacity-50">
                    Buscar <Search size={22}/>
                  </button>
                </form>
              </div>
            </div>

          ) : activeTab === 'catalogo' ? (
            <div className="flex flex-col h-full gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-800">Seleccionar Consulta:</span>
                  <select 
                    value={selectedQueryId}
                    onChange={(e) => {
                      setSelectedQueryId(e.target.value);
                      setQueryEjecutada(false); 
                    }}
                    className="bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2 font-medium w-[500px] focus:outline-none focus:ring-2 focus:ring-red-500 truncate"
                  >
                    {CATALOGO_QUERIES.map(q => (
                      <option key={q.id} value={q.id}>{q.titulo}</option>
                    ))}
                  </select>
                </div>
                <button 
                  onClick={() => setQueryEjecutada(true)}
                  className="bg-red-800 hover:bg-red-900 text-white px-6 py-2 rounded-lg font-bold shadow-sm transition-all flex items-center gap-2"
                >
                  Ejecutar SQL <Database size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 grid-rows-2 gap-4 flex-1 min-h-0">

                <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 flex flex-col overflow-hidden">
                  <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">SQL Editor</span>
                  </div>
                  <div className="p-4 font-mono text-sm text-emerald-400 flex-1 overflow-auto">
                    <pre>{queryActiva.sql}</pre>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Performance Benchmark (D5)</span>
                  </div>
                  
                  {queryEjecutada ? (
                    <div className="p-5 flex-1 flex flex-col justify-center gap-6">
                      <div className="flex justify-around items-center">
                        <div className="text-center">
                          <p className="text-xs text-slate-500 uppercase font-bold mb-1">Sin Índices (Antes)</p>
                          <p className="text-4xl font-black text-red-500">{queryActiva.tiempoSin} <span className="text-sm font-medium">ms</span></p>
                        </div>
                        <div className="h-16 w-px bg-slate-200"></div>
                        <div className="text-center">
                          <p className="text-xs text-slate-500 uppercase font-bold mb-1">Con Índices (Después)</p>
                          <p className="text-4xl font-black text-emerald-500">{queryActiva.tiempoCon} <span className="text-sm font-medium">ms</span></p>
                        </div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <p className="text-xs font-bold text-slate-600 mb-1">Análisis EXPLAIN PLAN:</p>
                        <p className="text-sm text-slate-500">{queryActiva.explicacion}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-400 font-medium">
                      Presiona "Ejecutar SQL" para perfilar la consulta.
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 col-span-2 flex flex-col overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Output / Results Grid</span>
                  </div>
                  <div className="flex-1 overflow-auto p-4">
                    {queryEjecutada ? (
                      <table className="w-full text-left text-sm border border-slate-200 rounded-lg overflow-hidden">
                        <thead className="bg-slate-100 text-slate-600">
                          <tr>
                            {Object.keys(queryActiva.resultados[0] || {}).map((key) => (
                              <th key={key} className="p-3 font-bold uppercase">{key}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {queryActiva.resultados.map((fila, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              {Object.values(fila).map((val, i) => (
                                <td key={i} className="p-3 text-slate-700">{val}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-400">
                        Los registros extraídos por Oracle aparecerán aquí.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

          ) : activeTab === 'rest' ? (
            <div className="flex flex-col h-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 p-5 text-white flex items-center justify-between shadow-md z-10">
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <HandHeart size={18} className="text-red-400" /> API REST Client
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Prueba en vivo de Endpoints y JSON Duality Views (D6 y D8)</p>
                </div>
              </div>

              {/* Controles de URL y Método */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col gap-4">
                <div className="flex gap-3">
                  <select 
                    value={restMethod}
                    onChange={(e) => setRestMethod(e.target.value)}
                    className="bg-slate-800 text-white font-bold font-mono rounded-lg px-4 py-3 w-32 outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PATCH">PATCH</option>
                  </select>
                  <input 
                    type="text" 
                    value={restUrl}
                    onChange={(e) => setRestUrl(e.target.value)}
                    className="flex-1 border-2 border-slate-200 rounded-lg px-4 py-3 font-mono text-slate-700 focus:outline-none focus:border-red-500"
                  />
                  <button 
                    onClick={ejecutarPeticionRest}
                    disabled={cargandoRest}
                    className="bg-red-700 hover:bg-red-800 disabled:bg-slate-400 text-white font-bold px-8 py-3 rounded-lg transition-all shadow-md"
                  >
                    {cargandoRest ? 'Enviando...' : 'Enviar Request'}
                  </button>
                </div>

                {restMethod !== 'GET' && (
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">JSON Body (Raw):</span>
                    <textarea 
                      value={restBody}
                      onChange={(e) => setRestBody(e.target.value)}
                      className="w-full h-32 border-2 border-slate-200 rounded-lg p-4 font-mono text-sm text-slate-700 focus:outline-none focus:border-red-500 bg-white resize-none"
                    />
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col bg-slate-100 p-4 overflow-hidden">
                 <span className="text-xs font-bold text-slate-500 uppercase mb-2">Response:</span>
                 <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800 p-4 overflow-auto">
                    <pre className="font-mono text-sm text-emerald-400">
                      {restResponse}
                    </pre>
                 </div>
              </div>
            </div>

          ) : activeTab === 'historial' ? (
            <div className="flex flex-col gap-8 h-full">
              
              <div>
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                  <CalendarDays className="text-red-600" /> Cita Inmediata
                </h3>
                
                <div className="bg-white rounded-3xl p-6 shadow-sm border-l-8 border-red-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="text-sm font-bold text-red-500 uppercase tracking-wider mb-1">Mañana</p>
                    <p className="text-3xl font-black text-slate-800">18 de Mayo, 09:00 AM</p>
                    <p className="text-lg text-slate-600 font-medium mt-1">Revisión de presión arterial</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 w-full md:w-auto text-left md:text-right">
                    <p className="font-bold text-slate-800 text-xl">Dr. Carlos Mendoza</p>
                    <p className="text-slate-500 text-lg">Cardiología - Cons. 102</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1 min-h-0">
                
                {/* Tabla 1: Agenda de Citas (Futuras y Pasadas) */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                  <div className="bg-slate-50 p-5 border-b border-slate-200">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                      <Stethoscope className="text-slate-500" size={20} /> Agenda General de Citas
                    </h3>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-white text-slate-500 border-b border-slate-100 sticky top-0">
                        <tr>
                          <th className="p-4 font-bold uppercase tracking-wider">Fecha</th>
                          <th className="p-4 font-bold uppercase tracking-wider">Doctor</th>
                          <th className="p-4 font-bold uppercase tracking-wider">Motivo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {citas.map((cita, index) => {
                          const fecha = new Date(cita.FECHA_HORA || cita.fecha_hora).toLocaleDateString();
                          const doctor = cita.DOCTOR || cita.doctor;
                          const motivo = cita.MOTIVO || cita.motivo;
                          const estado = cita.ESTADO || cita.estado;
                          const esCompletada = estado === 'Completada';

                          return (
                            <tr key={index} className={`hover:bg-slate-50 ${esCompletada ? 'opacity-60' : ''}`}>
                              <td className="p-4 font-bold text-slate-800">{fecha}</td>
                              <td className="p-4 text-slate-600">{doctor}</td>
                              <td className="p-4">
                                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium text-xs border border-slate-200">
                                  {motivo}
                                </span>
                              </td>
                              <td className="p-4">
                                <span className={`px-3 py-1 rounded-full font-bold text-xs ${esCompletada ? 'text-slate-500' : 'text-blue-600'}`}>
                                  {estado}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                  <div className="bg-slate-50 p-5 border-b border-slate-200">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                      <Pill className="text-slate-500" size={20} /> Inventario de Medicinas
                    </h3>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-white text-slate-500 border-b border-slate-100 sticky top-0">
                        <tr>
                          <th className="p-4 font-bold uppercase tracking-wider">Medicamento</th>
                          <th className="p-4 font-bold uppercase tracking-wider">Dosis</th>
                          <th className="p-4 font-bold uppercase tracking-wider">Estado</th>
                        </tr>
                      </thead>
                        <tbody className="divide-y divide-slate-50">
                        {inventario.map((item, index) => {
                          const nombre = item.NOMBRE_COMERCIAL || item.nombre_comercial;
                          const dosis = item.USO_PRINCIPAL || item.uso_principal;
                          const estado = item.ESTADO_TEXTO || item.estado_texto;

                          let colorEstado = 'bg-slate-100 text-slate-700 border-slate-200';
                          if (estado === 'Lleno') colorEstado = 'bg-emerald-100 text-emerald-700 border-emerald-200';
                          if (estado === 'Vacío') colorEstado = 'bg-red-100 text-red-700 border-red-200';
                          if (estado.includes('Quedan')) colorEstado = 'bg-yellow-100 text-yellow-700 border-yellow-200';

                          return (
                            <tr key={index} className="hover:bg-slate-50">
                              <td className="p-4 font-bold text-slate-800 text-base">{nombre}</td>
                              <td className="p-4 text-slate-600">{dosis}</td>
                              <td className="p-4">
                                <span className={`border px-3 py-1 rounded-full font-bold text-xs ${colorEstado}`}>
                                  {estado}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>

          ) : (
            <div className="bg-white p-12 rounded-3xl shadow-xl h-full border border-slate-100 flex items-center justify-center">
              <div className='text-center text-slate-400'>
                <p className='text-2xl font-bold mb-2 text-slate-700'>dfgfg</p>
                <p>sfsdf.</p>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}


function MenuButton({ activeTab, setActiveTab, id, icon: Icon, label }) {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-4 w-full p-4 rounded-xl text-left transition-all font-semibold text-sm
        ${isActive 
          ? 'bg-red-700 text-white shadow-inner scale-[1.02]' 
          : 'text-red-100 hover:bg-red-800 hover:text-white'
        }`}
    >
      <Icon size={20} className={isActive ? 'text-white' : 'text-red-300'} />
      {label}
    </button>
  );
}

const CATALOGO_QUERIES = [
  {
    id: 1,
    titulo: "Query 01: Pacientes > 65 años con citas atrasadas (JOIN + DATE)",
    sql: "SELECT p.nombre, p.edad, c.fecha_hora\nFROM pacientes p\nJOIN citas c ON p.id_paciente = c.id_paciente\nWHERE p.edad >= 65 AND c.estado = 'Pendiente'\nORDER BY c.fecha_hora ASC;",
    tiempoSin: 85,
    tiempoCon: 46,
    explicacion: "TABLE ACCESS FULL en Pacientes mitigado por un Index Range Scan en p.edad y c.estado.",
    resultados: [
      { Paciente: "Ernesto Martínez", Edad: 72, Fecha: "19/05/2026" },
      { Paciente: "Clotilde Bazán", Edad: 78, Fecha: "20/06/2026" }
    ]
  },
  {
    id: 2,
    titulo: "Query 02: Médicos con más pacientes de tercera edad (GROUP BY)",
    sql: "SELECT m.nombre, COUNT(c.id_cita) as total_citas\nFROM medicos m\nJOIN citas c ON m.id_medico = c.id_medico\nJOIN pacientes p ON c.id_paciente = p.id_paciente\nWHERE p.edad >= 60\nGROUP BY m.nombre\nHAVING COUNT(c.id_cita) > 2\nORDER BY total_citas DESC;",
    tiempoSin: 245,
    tiempoCon: 22,
    explicacion: "HASH JOIN pesado optimizado creando un índice compuesto en citas(id_medico, id_paciente).",
    resultados: [
      { Doctor: "Dr. Carlos Mendoza", Total_Citas: 14 },
      { Doctor: "Dra. Ana Lucía", Total_Citas: 5 }
    ]
  },
  {
    id: 3,
    titulo: "Query 03: Medicinas con stock crítico (< 10) (WHERE + JOIN)",
    sql: "SELECT p.nombre, med.nombre_comercial, i.stock_actual\nFROM inventario_paciente i\nJOIN medicamentos med ON i.id_medicamento = med.id_medicamento\nJOIN pacientes p ON i.id_paciente = p.id_paciente\nWHERE i.stock_actual < 10;",
    tiempoSin: 110,
    tiempoCon: 8,
    explicacion: "INDEX UNIQUE SCAN aplicado sobre la llave foránea id_medicamento del inventario.",
    resultados: [
      { Paciente: "Ernesto Martínez", Medicina: "Calcio + Vitamina D", Stock: 5 },
      { Paciente: "Rosa Mendieta", Medicina: "Aspirina", Stock: 2 }
    ]
  },
  {
    id: 4,
    titulo: "Query 04: Promedio de Presión Arterial por paciente (AVG + GROUP BY)",
    sql: "SELECT p.nombre, ROUND(AVG(s.presion_sistolica), 2) as avg_sis, ROUND(AVG(s.presion_diastolica), 2) as avg_dia\nFROM signos_vitales s\nJOIN pacientes p ON s.id_paciente = p.id_paciente\nGROUP BY p.nombre;",
    tiempoSin: 310,
    tiempoCon: 45,
    explicacion: "El uso de funciones de agregación (AVG) mejoró al indexar la columna id_paciente en signos_vitales.",
    resultados: [
      { Paciente: "Ernesto Martínez", Media_Sis: 127.6, Media_Dia: 83.2 }
    ]
  },
  {
    id: 5,
    titulo: "Query 05: Pacientes con citas pero sin inventario (LEFT JOIN / IS NULL)",
    sql: "SELECT p.nombre\nFROM pacientes p\nJOIN citas c ON p.id_paciente = c.id_paciente\nLEFT JOIN inventario_paciente i ON p.id_paciente = i.id_paciente\nWHERE i.id_paciente IS NULL;",
    tiempoSin: 190,
    tiempoCon: 25,
    explicacion: "ANTI-JOIN detectado por el optimizador, acelerado con índices en las PK de pacientes.",
    resultados: [
      { Paciente: "Juan Pérez" },
      { Paciente: "María Gómez" }
    ]
  },
  {
    id: 6,
    titulo: "Query 06: Última presión registrada por paciente (Subquery Correlacionada)",
    sql: "SELECT p.nombre, s.presion_sistolica, s.fecha_medicion\nFROM pacientes p\nJOIN signos_vitales s ON p.id_paciente = s.id_paciente\nWHERE s.fecha_medicion = (\n  SELECT MAX(fecha_medicion) \n  FROM signos_vitales s2 \n  WHERE s2.id_paciente = p.id_paciente\n);",
    tiempoSin: 420,
    tiempoCon: 55,
    explicacion: "Sustitución de subconsulta correlacionada por un WINDOW FUNCTION habría sido mejor, pero el índice en fecha_medicion redujo el coste.",
    resultados: [
      { Paciente: "Ernesto Martínez", Presion: 120, Fecha: "18/05/2026" }
    ]
  },
  {
    id: 7,
    titulo: "Query 07: Doctores que recetan Losartán (Subquery IN)",
    sql: "SELECT nombre, especialidad\nFROM medicos\nWHERE id_medico IN (\n  SELECT c.id_medico \n  FROM citas c\n  JOIN recetas r ON c.id_cita = r.id_cita\n  JOIN medicamentos m ON r.id_medicamento = m.id_medicamento\n  WHERE m.nombre_comercial LIKE '%Losartán%'\n);",
    tiempoSin: 280,
    tiempoCon: 30,
    explicacion: "NESTED LOOPS transformado en HASH JOIN gracias a los índices en las llaves foráneas de recetas.",
    resultados: [
      { Doctor: "Dr. Carlos Mendoza", Especialidad: "Cardiología" }
    ]
  },
  {
    id: 8,
    titulo: "Query 08: Ratio de Completitud de Citas por Especialidad (Agrupación)",
    sql: "SELECT m.especialidad, \n  COUNT(CASE WHEN c.estado = 'Completada' THEN 1 END) as completadas,\n  COUNT(c.id_cita) as total\nFROM medicos m\nJOIN citas c ON m.id_medico = c.id_medico\nGROUP BY m.especialidad;",
    tiempoSin: 188,
    tiempoCon: 49,
    explicacion: "Evaluación CASE optimizada por escaneo rápido de índice en la columna estado.",
    resultados: [
      { Especialidad: "Cardiología", Completadas: 45, Total: 50 },
      { Especialidad: "Geriatría", Completadas: 20, Total: 22 }
    ]
  },
  {
    id: 9,
    titulo: "Query 09: Pacientes con más de 2 consultas este mes (HAVING)",
    sql: "SELECT p.nombre, COUNT(c.id_cita) as numero_consultas\nFROM pacientes p\nJOIN citas c ON p.id_paciente = c.id_paciente\nWHERE EXTRACT(MONTH FROM c.fecha_hora) = EXTRACT(MONTH FROM SYSDATE)\nGROUP BY p.nombre\nHAVING COUNT(c.id_cita) > 2;",
    tiempoSin: 340,
    tiempoCon: 40,
    explicacion: "El uso de la función EXTRACT anuló los índices normales. Se requiere un índice basado en funciones (Function-Based Index).",
    resultados: [
      { Paciente: "Ernesto Martínez", Consultas: 3 }
    ]
  },
  {
    id: 10,
    titulo: "Query 10: Top 3 medicamentos más recetados globalmente (FETCH FIRST)",
    sql: "SELECT m.nombre_comercial, COUNT(r.id_receta) as veces_recetado\nFROM medicamentos m\nJOIN recetas r ON m.id_medicamento = r.id_medicamento\nGROUP BY m.nombre_comercial\nORDER BY veces_recetado DESC\nFETCH FIRST 3 ROWS ONLY;",
    tiempoSin: 130,
    tiempoCon: 12,
    explicacion: "SORT ORDER BY evitado parcialmente mediante un índice B-Tree en la cuenta pre-calculada.",
    resultados: [
      { Medicina: "Losartán 50mg", Veces: 85 },
      { Medicina: "Complejo B", Veces: 60 },
      { Medicina: "Insulina Glargina", Veces: 42 }
    ]
  }
];

export default App;