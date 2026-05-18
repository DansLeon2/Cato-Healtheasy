// src/App.jsx
import { useState } from 'react';
import { Pill, HeartPulse, CalendarDays, Stethoscope, HandHeart, CircleUserRound, Search, Bell, Database, Webhook, Bot, History } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inputBusqueda, setInputBusqueda] = useState(''); 
  const [preguntaMostrada, setPreguntaMostrada] = useState('¿Cuándo fue mi última cita con el doctor del corazón y qué pastillas me mandó a comprar?');

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900">
      {/* Sidebar - UCACUE Red Stying - Enfoque Tercera Edad */}
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

          {/* SECCIÓN 2: LO QUE VE EL PROFESOR (ENTREGABLES) */}
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-3">Evaluación Técnica (Para Profesor)</p>
          <nav className="flex flex-col gap-2">
            <MenuButton activeTab={activeTab} setActiveTab={setActiveTab} id="catalogo" icon={Database} label="Catálogo SQL (D5)" />
            <MenuButton activeTab={activeTab} setActiveTab={setActiveTab} id="rest" icon={HandHeart} label="Módulo REST API (D6)" />
            
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header bar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shadow-sm">
          <div className='flex items-center gap-2'>
            <h2 className="text-2xl font-bold text-slate-800">
              Bienvenido, Don Ernesto 👋
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

        {/* Dynamic Content Panel */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-100">

          {activeTab === 'dashboard' ? (
            /* ==================================================== */
            /* PESTAÑA: DASHBOARD (RESUMEN DEL ABUELITO)            */
            /* ==================================================== */
            <div className="flex flex-col gap-6 h-full">
              
              {/* Fila 1: Tarjetas de Resumen (KPIs amigables) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Tarjeta 1: Próxima Cita */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 text-red-600 p-3 rounded-2xl">
                      <CalendarDays size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700">Próxima Cita</h3>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-slate-800 mb-1">Mañana, 09:00 AM</p>
                    <p className="text-slate-500 font-medium flex items-center gap-2">
                      <Stethoscope size={16}/> Cardiología - Dr. Carlos Mendoza
                    </p>
                  </div>
                </div>

                {/* Tarjeta 2: Medicación del Día */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 text-emerald-600 p-3 rounded-2xl">
                      <Pill size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700">Pastillas de Hoy</h3>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-slate-800 mb-1">3 Tomadas</p>
                    <p className="text-slate-500 font-medium">Falta 1 pastilla (Losartán) a las 20:00</p>
                  </div>
                </div>

                {/* Tarjeta 3: Último Control */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl">
                      <HeartPulse size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700">Última Presión</h3>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-slate-800 mb-1">120 / 80</p>
                    <p className="text-slate-500 font-medium">Estado normal. Registrado hace 2 días.</p>
                  </div>
                </div>

              </div>

              {/* Fila 2: Gráfica Simple y Lista de Medicinas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
                
                {/* Gráfica de Barras con Tailwind (Fácil para el Backend) */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-800 mb-6">Mi Presión Arterial (Últimos 5 días)</h3>
                  
                  {/* Contenedor de la gráfica */}
                  <div className="flex-1 flex items-end gap-4 justify-between pt-4 pb-2">
                    {/* Barra 1 */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full bg-slate-100 rounded-t-xl h-40 relative flex items-end justify-center group cursor-pointer">
                        <div className="w-full bg-blue-400 rounded-t-xl transition-all duration-500 hover:bg-blue-500" style={{ height: '65%' }}></div>
                        <span className="absolute -top-8 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">125/82</span>
                      </div>
                      <span className="text-sm font-medium text-slate-500">Lun</span>
                    </div>
                    {/* Barra 2 */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full bg-slate-100 rounded-t-xl h-40 relative flex items-end justify-center group cursor-pointer">
                        <div className="w-full bg-blue-400 rounded-t-xl transition-all duration-500 hover:bg-blue-500" style={{ height: '70%' }}></div>
                        <span className="absolute -top-8 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">130/85</span>
                      </div>
                      <span className="text-sm font-medium text-slate-500">Mar</span>
                    </div>
                    {/* Barra 3 */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full bg-slate-100 rounded-t-xl h-40 relative flex items-end justify-center group cursor-pointer">
                        <div className="w-full bg-blue-400 rounded-t-xl transition-all duration-500 hover:bg-blue-500" style={{ height: '60%' }}></div>
                        <span className="absolute -top-8 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">118/79</span>
                      </div>
                      <span className="text-sm font-medium text-slate-500">Mié</span>
                    </div>
                    {/* Barra 4 (Alerta) */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full bg-slate-100 rounded-t-xl h-40 relative flex items-end justify-center group cursor-pointer">
                        <div className="w-full bg-red-400 rounded-t-xl transition-all duration-500 hover:bg-red-500" style={{ height: '85%' }}></div>
                        <span className="absolute -top-8 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">145/90</span>
                      </div>
                      <span className="text-sm font-bold text-red-500">Jue</span>
                    </div>
                    {/* Barra 5 */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full bg-slate-100 rounded-t-xl h-40 relative flex items-end justify-center group cursor-pointer">
                        <div className="w-full bg-blue-400 rounded-t-xl transition-all duration-500 hover:bg-blue-500" style={{ height: '62%' }}></div>
                        <span className="absolute -top-8 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">120/80</span>
                      </div>
                      <span className="text-sm font-medium text-slate-500">Vie</span>
                    </div>
                  </div>
                </div>

                {/* Lista de Medicinas más usadas */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-800 mb-6">Mis Medicinas Frecuentes</h3>
                  <div className="flex-1 overflow-y-auto pr-2">
                    <ul className="flex flex-col gap-4">
                      
                      <li className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="bg-white p-2 rounded-xl shadow-sm">💊</div>
                          <div>
                            <p className="font-bold text-slate-800">Losartán 50mg</p>
                            <p className="text-sm text-slate-500">Para la presión alta</p>
                          </div>
                        </div>
                        <span className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full text-xs">Sin Stock</span>
                      </li>

                      <li className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="bg-white p-2 rounded-xl shadow-sm">💧</div>
                          <div>
                            <p className="font-bold text-slate-800">Insulina Glargina</p>
                            <p className="text-sm text-slate-500">Control de azúcar</p>
                          </div>
                        </div>
                        <span className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-xs">Stock Completo</span>
                      </li>

                      <li className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="bg-white p-2 rounded-xl shadow-sm">🦴</div>
                          <div>
                            <p className="font-bold text-slate-800">Calcio + Vitamina D</p>
                            <p className="text-sm text-slate-500">Suplemento diario</p>
                          </div>
                        </div>
                        <span className="bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-full text-xs">Quedan 5 pastillas</span>
                      </li>

                    </ul>
                  </div>
                </div>

              </div>
            </div>

          ) : activeTab === 'ia' ? (
            /* ==================================================== */
            /* PESTAÑA: ASISTENTE IA (Búsqueda Única - No Chat)     */
            /* ==================================================== */
            <div className="flex flex-col h-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              
              {/* Header */}
              <div className="bg-red-950 p-5 text-white flex items-center justify-between shadow-md z-10">
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Bot size={20} className="text-red-400" /> Cato AI - Buscador Inteligente
                  </h3>
                  <p className="text-xs text-red-200 mt-1">Escribe tu duda médica. La pantalla mostrará solo el resultado actual.</p>
                </div>
                <div className="bg-red-900 border border-red-700 px-4 py-1.5 rounded-full text-xs font-mono text-emerald-400 shadow-inner flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  BD Sincronizada
                </div>
              </div>

              {/* Área de Resultados (Limpiable) */}
              <div className="flex-1 p-8 overflow-y-auto bg-slate-50 flex flex-col gap-6">
                
                {/* 1. La Pregunta Actual (Título grande) */}
                <div className="border-b-2 border-slate-200 pb-6 mb-2">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Search size={0.01} /> 
                  </p>
                  {/* 1. La Pregunta Actual (Título grande) */}
                <div className="border-b-2 border-slate-200 pb-6 mb-2">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Search size={16} /> Consulta Procesada:
                  </p>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                    "{preguntaMostrada}"
                  </h2>
                </div>  
                </div>

                {/* 2. Resultado Amigable (Para el paciente) */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <p className="text-xl font-bold text-emerald-700 mb-6 flex items-center gap-2">
                     Resultado Encontrado:
                  </p>
                  
                  <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                    <table className="w-full text-left">
                      <thead className="bg-white text-slate-600 border-b border-slate-200 text-sm">
                        <tr>
                          <th className="p-4 font-bold uppercase">Fecha de Cita</th>
                          <th className="p-4 font-bold uppercase">Doctor Tratante</th>
                          <th className="p-4 font-bold uppercase">Receta Médica</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-4 font-black text-lg text-slate-800">12 de Mayo, 2026</td>
                          <td className="p-4 text-slate-700 text-lg">Dr. Carlos Mendoza</td>
                          <td className="p-4">
                            <span className="font-black text-red-600 text-lg">Losartán 50mg</span><br/>
                            <span className="text-sm text-slate-600 font-medium">Comprado: 3 cajas (Tomar 1 al día)</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3. Explicación Técnica (Para que el profe evalúe el D9) */}
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm mt-4">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Database size={16} className="text-red-400"/>
                      <span className="font-bold text-sm tracking-wider uppercase">Generación SQL (Evaluación NLQ)</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded font-mono">Select AI Translation</span>
                  </div>
                  
                  <div className="font-mono text-xs md:text-sm text-emerald-400 overflow-x-auto">
                    <code>
                      <code>
                      <span className="text-pink-500">SELECT</span> c.fecha_hora, med.nombre <span className="text-pink-500">AS</span> doctor, m.nombre_comercial, r.dosis_texto<br/>
                      <span className="text-pink-500">FROM</span> citas c<br/>
                      <span className="text-pink-500">JOIN</span> medicos med <span className="text-pink-500">ON</span> c.id_medico = med.id_medico<br/>
                      <span className="text-pink-500">JOIN</span> recetas r <span className="text-pink-500">ON</span> c.id_cita = r.id_cita<br/>
                      <span className="text-pink-500">JOIN</span> medicamentos m <span className="text-pink-500">ON</span> r.id_medicamento = m.id_medicamento<br/>
                      <span className="text-pink-500">WHERE</span> c.id_paciente = <span className="text-yellow-300">'P-902'</span> <span className="text-pink-500">AND</span> med.especialidad = <span className="text-yellow-300">'Cardiología'</span><br/>
                      <span className="text-pink-500">ORDER BY</span> c.fecha_hora <span className="text-pink-500">DESC FETCH FIRST</span> 1 <span className="text-pink-500">ROWS ONLY</span>;
                    </code></code>
                  </div>
                </div>

              </div>

              {/* Barra de Búsqueda Fija (Input Area) */}
              <div className="p-5 bg-white border-t border-slate-200 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
                <form className="flex gap-4" onSubmit={(e) => {
                  e.preventDefault();
                  if(inputBusqueda.trim() !== '') {
                    setPreguntaMostrada(inputBusqueda);
                    // A FUTURO: Aquí haremos el fetch() al Backend
                    setInputBusqueda(''); // Limpia la barra después de buscar
                  }
                }}>
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      value={inputBusqueda}
                      onChange={(e) => setInputBusqueda(e.target.value)}
                      placeholder="Ej: ¿Qué medicinas me tocan hoy?" 
                      className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all text-slate-800 text-lg placeholder-slate-400 font-medium bg-slate-50 focus:bg-white" 
                    />
                  </div>
                  <button type="submit" className="bg-red-800 hover:bg-red-900 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-md flex items-center gap-3">
                    Buscar <Search size={22}/>
                  </button>
                </form>
              </div>
            </div>

          ) : activeTab === 'catalogo' ? (
            /* ==================================================== */
            /* PESTAÑA: CATÁLOGO DE CONSULTAS SQL (D5)              */
            /* ==================================================== */
            <div className="flex flex-col h-full gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-1200">Seleccionar Consulta:</span>
                  <select className="bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2 font-medium w-[450px] focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>Query 01: Pacientes  65 años con citas atrasadas (JOIN + DATE)</option>
                    <option>Query 02: Historial completo de compras de un paciente (Subquery)</option>
                    <option>Query 03: Médicos con más pacientes de tercera edad (GROUP BY)</option>
                  </select>
                </div>
                <button className="bg-red-800 hover:bg-red-900 text-white px-6 py-2 rounded-lg font-bold shadow-sm transition-all flex items-center gap-2">
                  Ejecutar SQL <Database size={16} />
                </button>
              </div>

              {/* Grid 4 Paneles (Se mantiene igual que antes, solo cambian los datos visuales si lo deseas luego) */}
              <div className="grid grid-cols-2 grid-rows-2 gap-4 flex-1 min-h-0">
                <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 flex flex-col overflow-hidden">
                  <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">SQL Editor</span>
                  </div>
                  <div className="p-4 font-mono text-sm text-slate-300 flex-1 overflow-auto">
                    <span className="text-pink-500">SELECT</span> p.nombre, p.edad, c.fecha_hora<br/>
                    <span className="text-pink-500">FROM</span> pacientes p<br/>
                    <span className="text-pink-500">JOIN</span> citas c <span className="text-pink-500">ON</span> p.id_paciente = c.id_paciente<br/>
                    <span className="text-pink-500">WHERE</span> p.edad &gt;= 65 <span className="text-pink-500">AND</span> c.estado = <span className="text-yellow-300">'Pendiente'</span><br/>
                    <span className="text-pink-500">ORDER BY</span> c.fecha_hora <span className="text-pink-500">ASC</span>;
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Performance Benchmark (D5)</span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-center gap-6">
                    <div className="flex justify-around items-center">
                      <div className="text-center">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Sin Índices (Antes)</p>
                        <p className="text-4xl font-black text-red-500">182 <span className="text-sm font-medium">ms</span></p>
                      </div>
                      <div className="h-16 w-px bg-slate-200"></div>
                      <div className="text-center">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Con Índices (Después)</p>
                        <p className="text-4xl font-black text-emerald-500">14 <span className="text-sm font-medium">ms</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Paneles de abajo... */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-400 col-span-2">
                  <p>Tabla de resultados y Explain Plan se mostrarán aquí al ejecutar.</p>
                </div>
              </div>
            </div>

          ) : activeTab === 'rest' ? (
            /* ==================================================== */
            /* PESTAÑA: MÓDULO REST API                             */
            /* ==================================================== */
            <div className="flex flex-col h-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 p-5 text-white flex items-center justify-between shadow-md z-10">
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <HandHeart size={18} className="text-red-400" /> API REST Client
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Gestión de datos de pacientes (Backend Node.js)</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-b border-slate-200 flex gap-3">
                <select className="bg-slate-800 text-white font-bold font-mono rounded-lg px-4 py-3 w-32">
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                </select>
                <input 
                  type="text" 
                  defaultValue="http://localhost:3000/api/v1/citas/paciente/P-902"
                  className="flex-1 border-2 border-slate-200 rounded-lg px-4 py-3 font-mono text-slate-700 focus:outline-none focus:border-red-500"
                />
                <button className="bg-red-700 hover:bg-red-800 text-white font-bold px-8 py-3 rounded-lg transition-all shadow-md">
                  Enviar Request
                </button>
              </div>

              <div className="flex-1 flex items-center justify-center bg-slate-100 text-slate-400">
                  <p>El visor JSON de respuesta aparecerá aquí.</p>
              </div>
            </div>

          ) : activeTab === 'historial' ? (
            /* ==================================================== */
            /* PESTAÑA: HISTORIAL FARMACÉUTICO Y CITAS              */
            /* ==================================================== */
            <div className="flex flex-col gap-8 h-full">
              
              {/* Sección 1: Cita Urgente (Solo la más próxima) */}
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

              {/* Sección 2: Dos Tablas (Agenda General vs Medicinas) */}
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
                        {/* Citas Futuras */}
                        <tr className="hover:bg-slate-50">
                          <td className="p-4 font-bold text-slate-800">25 May 2026</td>
                          <td className="p-4 text-slate-600">Laboratorio Central</td>
                          <td className="p-4"><span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium text-xs border border-slate-200">Exámenes de sangre</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-4 font-bold text-slate-800">10 Jun 2026</td>
                          <td className="p-4 text-slate-600">Dra. Ana Lucía</td>
                          <td className="p-4"><span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium text-xs border border-slate-200">Chequeo General</span></td>
                        </tr>
                        {/* Citas Pasadas */}
                        <tr className="hover:bg-slate-50 opacity-60">
                          <td className="p-4 font-bold text-slate-800">12 May 2026</td>
                          <td className="p-4 text-slate-600">Dr. Carlos Mendoza</td>
                          <td className="p-4"><span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium text-xs border border-slate-200">Control Hipertensión</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Tabla 2: Inventario de Medicamentos */}
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
                        {/* Estado: Lleno */}
                        <tr className="hover:bg-slate-50">
                          <td className="p-4 font-bold text-slate-800 text-base">Losartán 50mg</td>
                          <td className="p-4 text-slate-600">1 cada 24h</td>
                          <td className="p-4"><span className="bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold text-xs">Lleno</span></td>
                        </tr>
                        {/* Estado: Quedan N */}
                        <tr className="hover:bg-slate-50">
                          <td className="p-4 font-bold text-slate-800 text-base">Calcio + Vit. D</td>
                          <td className="p-4 text-slate-600">1 en almuerzo</td>
                          <td className="p-4"><span className="bg-yellow-100 text-yellow-700 border border-yellow-200 px-3 py-1 rounded-full font-bold text-xs">Quedan 5 unidades</span></td>
                        </tr>
                        {/* Estado: Vacío */}
                        <tr className="hover:bg-slate-50">
                          <td className="p-4 font-bold text-slate-800 text-base">Insulina Glargina</td>
                          <td className="p-4 text-slate-600">Según esquema</td>
                          <td className="p-4"><span className="bg-red-100 text-red-700 border border-red-200 px-3 py-1 rounded-full font-bold text-xs">Vacío</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>

          ) : (
            /* PANTALLA POR DEFECTO PARA LAS PESTAÑAS FALTANTES */
            <div className="bg-white p-12 rounded-3xl shadow-xl h-full border border-slate-100 flex items-center justify-center">
              <div className='text-center text-slate-400'>
                <p className='text-2xl font-bold mb-2 text-slate-700'>En Construcción</p>
                <p>Esta sección se programará pronto.</p>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// Subcomponente para los botones del menú (Para tener el código limpio)
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

export default App;