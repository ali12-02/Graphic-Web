import { useState, useEffect } from "react";
import { Plus, Trash2, Palette, Square, Type, Gauge, Save, GripVertical, ArrowUpDown, Sliders } from "lucide-react"; // 🟢 Import Sliders
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DashboardLayout from "../layout/DashboardLayout";

function SortableItem({ id, content, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1, zIndex: isDragging ? 50 : 1 };
  return (
    <div ref={setNodeRef} style={style} className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition border-b border-white/5 last:border-0">
      <div className="flex items-center gap-4 flex-1">
        <button {...attributes} {...listeners} className="text-gray-400 hover:text-white cursor-grab active:cursor-grabbing p-1"><GripVertical size={18} /></button>
        <span className="text-white text-sm flex-1">{content}</span>
      </div>
      <button onClick={() => onDelete(id)} className="text-red-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition"><Trash2 size={18} /></button>
    </div>
  );
}

function Offers() {
  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState("");
  const [reelColor, setReelColor] = useState("#a855f7"); 
  const [reelBgColor, setReelBgColor] = useState("rgba(255, 255, 255, 0.03)");
  const [reelBgOpacity, setReelBgOpacity] = useState(3); // 🟢 Opacity in percentage (0-100)
  const [reelFontSize, setReelFontSize] = useState(14);
  const [reelFontWeight, setReelFontWeight] = useState("font-medium");
  const [reelSpeed, setReelSpeed] = useState(25);
  
  const [reelPosition, setReelPosition] = useState("after-stats"); 

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  useEffect(() => {
    const savedOffers = JSON.parse(localStorage.getItem("offers")) || [];
    setOffers(savedOffers);
    const savedColor = localStorage.getItem("reelColor"); if (savedColor) setReelColor(savedColor);
    const savedBgColor = localStorage.getItem("reelBgColor"); if (savedBgColor) setReelBgColor(savedBgColor);
    
    // 🟢 Load Opacity
    const savedOpacity = localStorage.getItem("reelBgOpacity");
    if (savedOpacity) setReelBgOpacity(parseInt(savedOpacity) || 3);

    const savedFontSize = localStorage.getItem("reelFontSize"); if (savedFontSize) setReelFontSize(parseInt(savedFontSize) || 14);
    const savedFontWeight = localStorage.getItem("reelFontWeight"); if (savedFontWeight) setReelFontWeight(savedFontWeight);
    const savedSpeed = localStorage.getItem("reelSpeed"); if (savedSpeed) setReelSpeed(parseInt(savedSpeed) || 25);
    
    const savedPosition = localStorage.getItem("reelPosition");
    if (savedPosition) setReelPosition(savedPosition);
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setOffers((items) => {
        const oldIndex = items.findIndex((item) => item === active.id);
        const newIndex = items.findIndex((item) => item === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddOffer = () => {
    if (!newOffer.trim()) return;
    const updated = [...offers, newOffer.trim()];
    setOffers(updated);
    localStorage.setItem("offers", JSON.stringify(updated));
    setNewOffer("");
    window.dispatchEvent(new Event("offersUpdated"));
  };

  const handleDeleteOffer = (id) => {
    const updated = offers.filter((item) => item !== id);
    setOffers(updated);
    localStorage.setItem("offers", JSON.stringify(updated));
    window.dispatchEvent(new Event("offersUpdated"));
  };

  const handleSaveSettings = () => {
    // 🟢 Convert Hex Color to RGB automatically for transparency
    let hex = reelBgColor.replace('#', '');
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Add opacity (0 to 1)
    const opacity = reelBgOpacity / 100;
    const finalBgColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;

    localStorage.setItem("reelColor", reelColor);
    localStorage.setItem("reelBgColor", finalBgColor); // 🟢 Save the rgba value
    localStorage.setItem("reelBgOpacity", reelBgOpacity.toString()); // 🟢 Save opacity percentage
    localStorage.setItem("reelFontSize", reelFontSize.toString());
    localStorage.setItem("reelFontWeight", reelFontWeight);
    localStorage.setItem("reelSpeed", reelSpeed.toString());
    localStorage.setItem("offers", JSON.stringify(offers));
    localStorage.setItem("reelPosition", reelPosition);
    
    window.dispatchEvent(new Event("offersUpdated"));
    alert("✅ Reel Settings Saved Successfully!");
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div><h1 className="text-4xl font-bold text-white">Offers & Reel</h1><p className="mt-2 text-gray-400">Manage your scrolling offers and reel settings.</p></div>
      </div>

      {/* SETTINGS SECTION */}
      <div className="mb-8 bg-[#111] border border-white/10 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-white/5 pb-6">
          <div className="flex-1"><h3 className="text-white font-medium mb-2 flex items-center gap-2"><Palette size={20} className="text-purple-400" /> Text Color</h3>
            <div className="flex items-center gap-4"><input type="color" value={reelColor} onChange={(e) => setReelColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent" /><div className="h-6 w-24 rounded border border-white/10" style={{ backgroundColor: reelColor }}></div></div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-white/5 pb-6">
          <div className="flex-1"><h3 className="text-white font-medium mb-2 flex items-center gap-2"><Square size={20} className="text-purple-400" /> Reel Background Color</h3>
            <div className="flex items-center gap-4"><input type="color" value={reelBgColor} onChange={(e) => setReelBgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent" /><div className="h-6 w-24 rounded border border-white/10" style={{ backgroundColor: reelBgColor }}></div></div>
          </div>
        </div>

        {/* 🟢 NEW: TRANSPARENCY SLIDER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-white/5 pb-6">
          <div className="flex-1 w-full">
            <h3 className="text-white font-medium mb-2 flex items-center gap-2">
              <Sliders size={20} className="text-purple-400" /> Background Transparency
            </h3>
            <div className="flex items-center gap-4 w-full">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={reelBgOpacity} 
                onChange={(e) => setReelBgOpacity(parseInt(e.target.value))} 
                className="w-full h-2 bg-[#0a0a0a] rounded-lg appearance-none cursor-pointer accent-purple-500" 
              />
              <span className="text-white font-medium text-sm min-w-[40px]">{reelBgOpacity}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">0% = Fully Transparent, 100% = Solid Color</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b border-white/5 pb-6">
          <div className="flex-1"><h3 className="text-white font-medium mb-2 flex items-center gap-2"><Type size={20} className="text-purple-400" /> Font Size (px)</h3>
            <input type="number" min="8" max="50" value={reelFontSize} onChange={(e) => setReelFontSize(parseInt(e.target.value) || 14)} className="bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-purple-500 w-full sm:w-32" />
          </div>
          <div className="flex-1"><h3 className="text-white font-medium mb-2 flex items-center gap-2"><strong className="text-purple-400 text-sm">B</strong> Font Weight</h3>
            <select value={reelFontWeight} onChange={(e) => setReelFontWeight(e.target.value)} className="bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-purple-500 w-full sm:w-40">
              <option value="font-normal">Normal</option><option value="font-medium">Medium</option><option value="font-bold">Bold</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b border-white/5 pb-6">
          <div className="flex-1"><h3 className="text-white font-medium mb-2 flex items-center gap-2"><Gauge size={20} className="text-purple-400" /> Reel Speed (Seconds)</h3>
            <input type="number" min="1" max="100" value={reelSpeed} onChange={(e) => setReelSpeed(parseInt(e.target.value) || 25)} className="bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-purple-500 w-full sm:w-32" />
            <p className="text-xs text-gray-500 mt-1">Lower number = Faster speed (5-10 is fast, 25 is normal)</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4 border-t border-white/5">
          <div className="flex-1">
            <h3 className="text-white font-medium mb-2 flex items-center gap-2">
              <ArrowUpDown size={20} className="text-purple-400" /> Reel Position
            </h3>
            <select value={reelPosition} onChange={(e) => setReelPosition(e.target.value)} className="bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-purple-500 w-full sm:w-56">
              <option value="after-stats">After Studio Stats</option>
              <option value="after-hero">After Hero (Top)</option>
              <option value="after-about">After About Section (Bottom)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Select where the scrolling reel should appear.</p>
          </div>
        </div>
      </div>

      {/* ADD OFFER */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-6 mb-8">
        <div className="flex gap-4">
          <input type="text" placeholder="Enter a new offer (e.g. 24/7 Support)" value={newOffer} onChange={(e) => setNewOffer(e.target.value)} className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-purple-500" />
          <button onClick={handleAddOffer} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition"><Plus size={18} /> Add Offer</button>
        </div>
      </div>

      {/* DRAGGABLE OFFERS LIST */}
      <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
        <div className="border-b border-white/5 px-6 py-4"><h3 className="text-white font-medium">Active Offers (Drag to Reorder)</h3></div>
        {offers.length === 0 ? (
          <div className="py-10 text-center text-gray-500">No offers added yet. Add one to see it in the live reel!</div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={offers} strategy={verticalListSortingStrategy}>
              <div className="divide-y divide-white/5">
                {offers.map((offer) => <SortableItem key={offer} id={offer} content={offer} onDelete={handleDeleteOffer} />)}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* FINAL SAVE BUTTON */}
      <div className="mt-8 flex justify-center">
        <button onClick={handleSaveSettings} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition w-full sm:w-auto shadow-lg shadow-purple-900/30">
          <Save size={20} /> Save All Reel Settings
        </button>
      </div>
    </DashboardLayout>
  );
}

export default Offers;