"use client"

interface ResultCardProps {
  similarity: number
}

export default function ResultCard({ similarity }: ResultCardProps) {
  const getConfig = (similarity: number) => {
    if (similarity > 70) {
      return {
        label: "High Plagiarism Detected",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        textColor: "text-red-300",
        barColor: "bg-gradient-to-r from-red-500 to-red-600",
        badgeColor: "bg-red-500/20 text-red-300",
      }
    } else if (similarity >= 40) {
      return {
        label: "Partial Similarity",
        bgColor: "bg-amber-500/10",
        borderColor: "border-amber-500/30",
        textColor: "text-amber-300",
        barColor: "bg-gradient-to-r from-amber-500 to-amber-600",
        badgeColor: "bg-amber-500/20 text-amber-300",
      }
    } else {
      return {
        label: "Low Similarity",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        textColor: "text-green-300",
        barColor: "bg-gradient-to-r from-green-500 to-green-600",
        badgeColor: "bg-green-500/20 text-green-300",
      }
    }
  }

  const config = getConfig(similarity)

  return (
    <div className={`mt-8 p-8 border rounded-2xl ${config.bgColor} ${config.borderColor} transition-all`}>
      <div className="text-center mb-6">
        <div className={`inline-block px-4 py-2 rounded-full ${config.badgeColor} text-sm font-semibold mb-4`}>
          {config.label}
        </div>
        <div className={`text-6xl font-bold ${config.textColor} mb-2`}>{similarity}%</div>
        <p className="text-slate-400 text-sm">Similarity Score</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-700 ${config.barColor}`}
          style={{ width: `${similarity}%` }}
        ></div>
      </div>

      {/* Details */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-3 bg-slate-700/30 rounded-lg">
          <p className="text-xs text-slate-400 mb-1">Status</p>
          <p className={`text-sm font-semibold ${config.textColor}`}>
            {similarity > 70 ? "⚠️ Critical" : similarity >= 40 ? "⚠️ Warning" : "✓ Clear"}
          </p>
        </div>
        <div className="p-3 bg-slate-700/30 rounded-lg">
          <p className="text-xs text-slate-400 mb-1">Confidence</p>
          <p className="text-sm font-semibold text-slate-200">High</p>
        </div>
      </div>
    </div>
  )
}
