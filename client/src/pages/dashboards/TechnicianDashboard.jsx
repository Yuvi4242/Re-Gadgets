import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Mock @hello-pangea/dnd components for environment stability
const DragDropContext = ({ children }) => <div className="dnd-context">{children}</div>;
const Droppable = ({ children }) => <div className="droppable-zone">{children({ 
  innerRef: null, 
  droppableProps: {}, 
  placeholder: null 
}, { isDraggingOver: false })}</div>;
const Draggable = ({ children }) => <div className="draggable-item">{children({ 
  innerRef: null, 
  draggableProps: {}, 
  dragHandleProps: {} 
}, { isDragging: false })}</div>;

import { Wrench, CheckCircle, Smartphone, Clock, ArrowRight, Play, TestTube, PackageCheck, AlertTriangle, Zap, MoreVertical, Star } from 'lucide-react';
import Card, { CardContent } from '../../components/Card';
import Button from '../../components/Button';
import Skeleton from '../../components/Skeleton';
import { cn } from '../../services/utils';

const TechnicianDashboard = () => {
  console.log("Rendering Technician Dashboard");
  const [loading, setLoading] = useState(true);
  
  // Initial Kanban State
  const [columns, setColumns] = useState({
    discovery: {
      id: 'discovery',
      title: 'Discovery',
      icon: Search,
      color: 'text-brandBlue',
      bg: 'bg-brandBlue/10',
      items: [
        { id: 'JOB-9024', device: 'Steam Deck', issue: 'Stick Drift / R1 Button', priority: 'Medium', time: 'Assigned 2h ago', customer: 'John Wick' },
      ]
    },
    repairing: {
      id: 'repairing',
      title: 'In Repair',
      icon: Wrench,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      items: [
        { id: 'JOB-9021', device: 'Samsung Galaxy Fold 4', issue: 'Hinge Replacement', priority: 'High', time: 'Started 1h ago', customer: 'Sarah Connor' },
      ]
    },
    testing: {
      id: 'testing',
      title: 'QC & Testing',
      icon: TestTube,
      color: 'text-brandPurple',
      bg: 'bg-brandPurple/10',
      items: []
    },
    completed: {
      id: 'completed',
      title: 'Ready',
      icon: PackageCheck,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      items: [
        { id: 'JOB-8992', device: 'iPhone 13 Pro', issue: 'Charging Port', priority: 'Low', time: 'Finished 5m ago', customer: 'Tony Stark' },
      ]
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const destItems = source.droppableId === destination.droppableId ? sourceItems : [...destCol.items];
    
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceCol, items: sourceItems },
      [destination.droppableId]: { ...destCol, items: destItems }
    });
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Workshop Header */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-[var(--border-primary)] p-8 rounded-[2.5rem] relative overflow-hidden shadow-sm">
         <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />
         
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-xl shadow-amber-500/20">
               <Wrench className="w-8 h-8 text-white" />
            </div>
            <div>
               <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight uppercase">Master Workbench</h1>
               <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Session
                  </span>
                  <p className="text-[var(--text-secondary)] text-sm font-bold">2 Active Repairs • Station 04</p>
               </div>
            </div>
         </div>

         <div className="flex gap-3 relative z-10 mt-6 md:mt-0">
            <Button variant="secondary" className="rounded-2xl px-6 border-[var(--border-primary)]">
               <Zap className="w-4 h-4 mr-2" /> Quick Diagnostic
            </Button>
            <Button variant="primary" className="rounded-2xl px-8 bg-amber-500 hover:bg-amber-600 shadow-amber-500/20">
               Clock Out
            </Button>
         </div>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[600px]">
            {Object.values(columns).map((column) => (
               <div key={column.id} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between px-3">
                     <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-xl", column.bg)}>
                           <column.icon className={cn("w-4 h-4", column.color)} />
                        </div>
                        <h3 className="font-black text-sm text-[var(--text-primary)] uppercase tracking-widest">{column.title}</h3>
                     </div>
                     <span className="text-[10px] font-black text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{column.items.length}</span>
                  </div>

                  <Droppable droppableId={column.id}>
                     {(provided, snapshot) => (
                        <div
                           {...provided.droppableProps}
                           ref={provided.innerRef}
                           className={cn(
                              "flex-1 flex flex-col gap-4 p-3 rounded-[2rem] bg-slate-500/5 border-2 border-dashed border-transparent transition-all duration-300",
                              snapshot.isDraggingOver ? "bg-slate-500/10 border-[var(--border-primary)]" : ""
                           )}
                        >
                           {loading ? (
                              <Skeleton className="h-40 w-full rounded-[1.8rem]" />
                           ) : (
                              column.items.map((item, index) => (
                                 <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                       <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className="relative"
                                       >
                                          <Card className={cn(
                                             "border-[var(--border-primary)] shadow-sm group",
                                             snapshot.isDragging ? "shadow-2xl ring-2 ring-brandBlue/30 border-brandBlue rotate-2 scale-105" : "hover:shadow-md"
                                          )}>
                                             <CardContent className="p-5">
                                                <div className="flex justify-between items-start mb-4">
                                                   <span className="text-[10px] font-black text-brandBlue tracking-widest uppercase">{item.id}</span>
                                                   <button className="text-slate-400 hover:text-brandBlue opacity-0 group-hover:opacity-100 transition-opacity">
                                                      <MoreVertical className="w-4 h-4" />
                                                   </button>
                                                </div>
                                                
                                                <h4 className="font-black text-[var(--text-primary)] leading-tight">{item.device}</h4>
                                                <p className="text-xs text-[var(--text-secondary)] font-medium mt-1 mb-4 line-clamp-2">{item.issue}</p>
                                                
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                   <span className={cn(
                                                      "px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter border",
                                                      item.priority === 'High' ? "bg-rose-500/10 text-rose-500 border-rose-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-[var(--border-primary)]"
                                                   )}>
                                                      {item.priority} Priority
                                                   </span>
                                                   <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400 border-[var(--border-primary)] border text-[9px] font-black uppercase tracking-tighter">
                                                      {item.customer}
                                                   </span>
                                                </div>

                                                <div className="pt-4 border-t border-[var(--border-primary)] flex items-center justify-between">
                                                   <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                                                      <Clock className="w-3.5 h-3.5" />
                                                      {item.time}
                                                   </div>
                                                   <div className="flex -space-x-1">
                                                      {[1, 2].map(k => (
                                                         <div key={k} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[8px] font-black">?</div>
                                                      ))}
                                                   </div>
                                                </div>
                                             </CardContent>
                                          </Card>
                                       </div>
                                    )}
                                 </Draggable>
                              ))
                           )}
                           {provided.placeholder}
                           {!loading && column.items.length === 0 && (
                              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center opacity-40">
                                 <Plus className="w-8 h-8 mb-2" />
                                 <p className="text-xs font-bold uppercase tracking-widest">Drop here</p>
                              </div>
                           )}
                        </div>
                     )}
                  </Droppable>
               </div>
            ))}
         </div>
      </DragDropContext>

      {/* Workshop Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="bg-gradient-to-br from-brandBlue to-brandPurple text-white border-0 shadow-xl shadow-brandBlue/20">
            <CardContent className="p-8 flex items-center gap-6">
               <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Play className="w-8 h-8 fill-white" />
               </div>
               <div>
                  <h4 className="text-2xl font-black tracking-tighter">4.2h</h4>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Average Repair Time</p>
               </div>
            </CardContent>
         </Card>
         
         <Card className="bg-brandIndigo text-white border-0 shadow-xl shadow-brandIndigo/20">
            <CardContent className="p-8 flex items-center gap-6">
               <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Star className="w-8 h-8 fill-white" />
               </div>
               <div>
                  <h4 className="text-2xl font-black tracking-tighter">98.4%</h4>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Success Rate</p>
               </div>
            </CardContent>
         </Card>
      </div>

    </div>
  );
};

// Dummy icons/components needed if not imported
const Search = ({ className }) => <Smartphone className={className} />;
const Plus = ({ className }) => <div className={className}>+</div>;

export default TechnicianDashboard;
