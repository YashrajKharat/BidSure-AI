import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function StatCard({
  title,
  value,
  prefix = '',
  suffix = '',
  trend = null, // e.g. "+12.4% vs last tender"
  trendType = 'up', // 'up' | 'down' | 'neutral'
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBg = 'bg-blue-50',
  borderColor = 'border-slate-200/80',
  subtitle = '',
  onClick = null
}) {
  // Animate numerical counter
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (typeof value !== 'number') {
      setDisplayValue(value);
      return;
    }

    const duration = 900;
    const steps = 30;
    const stepTime = duration / steps;
    const stepIncrement = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepIncrement;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div
      onClick={onClick}
      className={`clay-card relative p-6 cursor-pointer select-none ${
        onClick ? 'hover:scale-[1.02]' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            {title}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-baseline gap-1">
            {prefix}
            <span>{typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}</span>
            {suffix}
          </div>
        </div>

        {/* Icon Pill with Claymorphic Depth */}
        <div className={`p-3.5 rounded-2xl ${iconBg} ${iconColor} shrink-0 shadow-sm border border-white/80`}>
          {Icon && <Icon className="w-5 h-5 stroke-[2.2]" />}
        </div>
      </div>

      {/* Subtitle & Trend */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {trend && (
          <div className="flex items-center gap-1 font-semibold">
            {trendType === 'up' && (
              <span className="text-emerald-600 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" /> {trend}
              </span>
            )}
            {trendType === 'down' && (
              <span className="text-rose-600 flex items-center">
                <ArrowDownRight className="w-3.5 h-3.5" /> {trend}
              </span>
            )}
            {trendType === 'neutral' && (
              <span className="text-slate-500 flex items-center">
                <Minus className="w-3.5 h-3.5" /> {trend}
              </span>
            )}
          </div>
        )}

        {subtitle && (
          <span className="text-slate-400 font-medium truncate ml-auto">{subtitle}</span>
        )}
      </div>
    </div>
  );
}
