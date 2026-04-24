// import React, { useState, useEffect } from 'react';
// import { getWorkouts, getWorkoutStats } from '../api/workouts';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from 'recharts';
//
// export function ReportsPage() {
//   const [workouts, setWorkouts] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [filter, setFilter] = useState('all');
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     loadData();
//   }, []);
//
//   const loadData = async () => {
//     try {
//       const [workoutsData, statsData] = await Promise.all([
//         getWorkouts(),
//         getWorkoutStats()
//       ]);
//       setWorkouts(workoutsData);
//       setStats(statsData);
//     } catch (error) {
//       console.error('Ошибка загрузки:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   // Данные для графика тренировок по месяцам
//   const getMonthlyData = () => {
//     const monthly = {};
//     workouts.forEach(workout => {
//       const month = new Date(workout.date).toLocaleString('ru', { month: 'long' });
//       monthly[month] = (monthly[month] || 0) + 1;
//     });
//     return Object.entries(monthly).map(([month, count]) => ({ month, count }));
//   };
//
//   // Данные для круговой диаграммы по категориям
//   const getCategoryData = () => {
//     if (!stats?.categoryStats) return [];
//     return Object.entries(stats.categoryStats).map(([cat, count]) => ({
//       name: cat === 'cardio' ? 'Кардио' :
//            cat === 'strength' ? 'Силовая' :
//            cat === 'yoga' ? 'Йога' : 'Стретчинг',
//       value: count
//     }));
//   };
//
//   // Данные для графика продолжительности
//   const getDurationData = () => {
//     return workouts.map(w => ({
//       date: new Date(w.date).toLocaleDateString('ru'),
//       duration: w.duration
//     })).reverse();
//   };
//
//   const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];
//
//   if (loading) {
//     return <div className="loader-container"><div className="loader"></div></div>;
//   }
//
//   return (
//     <div style={{ padding: '40px 0', minHeight: 'calc(100vh - 200px)' }}>
//       <div className="container">
//         <h1 style={{ marginBottom: '30px' }}>Отчеты и статистика</h1>
//
//         <div className="stats-grid" style={{ marginBottom: '40px' }}>
//           <div className="stat-card">
//             <i className="fas fa-calendar-check"></i>
//             <div className="stat-info">
//               <h3>Всего тренировок</h3>
//               <div className="stat-number">{stats?.totalWorkouts || 0}</div>
//             </div>
//           </div>
//           <div className="stat-card">
//             <i className="fas fa-running"></i>
//             <div className="stat-info">
//               <h3>Всего упражнений</h3>
//               <div className="stat-number">{stats?.totalExercises || 0}</div>
//             </div>
//           </div>
//           <div className="stat-card">
//             <i className="fas fa-clock"></i>
//             <div className="stat-info">
//               <h3>Общее время</h3>
//               <div className="stat-number">
//                 {workouts.reduce((sum, w) => sum + (w.duration || 0), 0)} мин
//               </div>
//             </div>
//           </div>
//         </div>
//
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
//           {/* График тренировок по месяцам */}
//           <div className="card">
//             <h3 style={{ marginBottom: '20px' }}>Тренировки по месяцам</h3>
//             {getMonthlyData().length > 0 ? (
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={getMonthlyData()}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#4f46e5" />
//                 </BarChart>
//               </ResponsiveContainer>
//             ) : (
//               <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
//                 Нет данных для отображения
//               </div>
//             )}
//           </div>
//
//           {/* Круговая диаграмма категорий */}
//           <div className="card">
//             <h3 style={{ marginBottom: '20px' }}>Распределение по категориям</h3>
//             {getCategoryData().length > 0 ? (
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={getCategoryData()}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {getCategoryData().map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             ) : (
//               <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
//                 Нет данных для отображения
//               </div>
//             )}
//           </div>
//
//           {/* График продолжительности */}
//           <div className="card" style={{ gridColumn: 'span 2' }}>
//             <h3 style={{ marginBottom: '20px' }}>Продолжительность тренировок</h3>
//             {getDurationData().length > 0 ? (
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={getDurationData()}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="duration" stroke="#4f46e5" name="Минуты" />
//                 </LineChart>
//               </ResponsiveContainer>
//             ) : (
//               <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
//                 Нет данных для отображения
//               </div>
//             )}
//           </div>
//         </div>
//
//         {/* Список тренировок */}
//         <div className="card" style={{ marginTop: '30px' }}>
//           <h3 style={{ marginBottom: '20px' }}>История тренировок</h3>
//           <div className="table-container">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Дата</th>
//                   <th>Название</th>
//                   <th>Категория</th>
//                   <th>Продолжительность</th>
//                   <th>Упражнения</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {workouts.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
//                       Нет тренировок
//                     </td>
//                   </tr>
//                 ) : (
//                   workouts.map(workout => (
//                     <tr key={workout.id}>
//                       <td>{new Date(workout.date).toLocaleDateString('ru')}</td>
//                       <td><strong>{workout.name}</strong></td>
//                       <td>{workout.category}</td>
//                       <td>{workout.duration} мин</td>
//                       <td>{workout.exercises?.length || 0}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { getAllTrainings } from '../api/trainings';
import { exportPdf, exportXlsx } from '../api/reports';

export function ReportsPage() {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState({
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0]
    });
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        loadTrainings();
    }, []);

    const loadTrainings = async () => {
        try {
            const data = await getAllTrainings();
            setTrainings(data || []);
        } catch (error) {
            console.error('Ошибка:', error);
            setTrainings([]);
        } finally {
            setLoading(false);
        }
    };

    const totalTrainings = trainings.length;
    const totalExercises = trainings.reduce((sum, t) => sum + (t.exercises?.length || 0), 0);

    const categoryStats = {};
    trainings.forEach(t => {
        categoryStats[t.category] = (categoryStats[t.category] || 0) + 1;
    });

    const handleExportPdf = async () => {
        setExporting(true);
        try {
            const from = new Date(dateRange.from).getTime();
            const to = new Date(dateRange.to).getTime() + 86400000 - 1;
            await exportPdf(from, to);
        } catch (error) {
            console.error('Ошибка экспорта PDF:', error);
            alert('Ошибка при экспорте PDF');
        } finally {
            setExporting(false);
        }
    };


    if (loading) return <div className="loader-container"><div className="loader"></div></div>;

    return (
        <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
            <h1>Отчеты</h1>

            {/* Статистика */}
            <div className="stats-grid" style={{ marginBottom: 32 }}>
                <div className="stat-card">
                    <span className="stat-icon">📊</span>
                    <div><h3>Всего тренировок</h3><p className="stat-number">{totalTrainings}</p></div>
                </div>
                <div className="stat-card">
                    <span className="stat-icon">💪</span>
                    <div><h3>Всего упражнений</h3><p className="stat-number">{totalExercises}</p></div>
                </div>
            </div>

            {/* Экспорт */}
            <div className="card" style={{ marginBottom: 32 }}>
                <h2 style={{ marginBottom: 16 }}>Экспорт отчёта</h2>

                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <div className="form-group">
                        <label>С</label>
                        <input
                            type="date"
                            value={dateRange.from}
                            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>По</label>
                        <input
                            type="date"
                            value={dateRange.to}
                            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                        />
                    </div>

                    <button onClick={handleExportPdf} className="btn" disabled={exporting} style={{ marginBottom: 0 }}>
                        📄 PDF
                    </button>
                </div>
            </div>

            {/* Статистика по категориям */}
            <div className="card" style={{ marginBottom: 32 }}>
                <h2 style={{ marginBottom: 16 }}>Распределение по категориям</h2>
                {Object.keys(categoryStats).length === 0 ? (
                    <p style={{ color: '#6b7280' }}>Нет данных</p>
                ) : (
                    Object.entries(categoryStats).map(([cat, count]) => (
                        <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
                            <span style={{ textTransform: 'capitalize' }}>{cat}</span>
                            <span style={{ fontWeight: 'bold' }}>{count} тренировок</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}