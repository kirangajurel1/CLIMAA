

export default function WeatherCard({ title, value, valueExtra = null, unit = "", description, iconUrl = null , icon = null }) {
  return (
    <div className="w-full max-w-sm flex flex-col gap-3 md:gap-5 border border-[rgba(255,255,255,0.08)] border-t-indigo-500/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] backdrop-blur-[20px] p-8 rounded-4xl bg-[#ffffff08] glass-card hover:scale-[1.02] transition-transform"
>
      <div className="flex justify-between items-center text-sm md:text-md font-bold opacity-80">
        <p className="tracking-wider text-slate-400">{title}</p>
        {icon && (<span className="text-xl text-purple-400">{icon}</span>)}
        {iconUrl && (
          <img src={iconUrl} alt={title} className="w-11 h-11 -mr-2" />
        )}
      </div>

      <p className="text-3xl md:text-4xl font-bold flex items-baseline gap-2">
        {value}<span className="text-slate-400 text-2xl md:text-3xl">{unit}</span>
        {valueExtra && (<span className="text-xl md:text-2xl text-slate-500">/ {valueExtra}</span>)}
      </p>


      <p className="text-sm md:text-[16px] text-slate-400 capitalize">{description}</p>
    </div>
  );
}