"use client"

import type { ChangeEvent } from "react"
import { Upload } from "lucide-react"

interface FileUploadSectionProps {
  file1: File | null
  file2: File | null
  onFile1Change: (file: File | null) => void
  onFile2Change: (file: File | null) => void
}

export default function FileUploadSection({ file1, file2, onFile1Change, onFile2Change }: FileUploadSectionProps) {
  const handleFile1Change = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onFile1Change(file)
  }

  const handleFile2Change = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onFile2Change(file)
  }

  const UploadBox = ({
    label,
    file,
    onChange,
  }: { label: string; file: File | null; onChange: (e: ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="relative">
      <label className="block">
        <div className="border-2 border-dashed border-slate-600 hover:border-blue-500 rounded-2xl p-8 transition-all cursor-pointer hover:bg-slate-700/30 group">
          <input type="file" accept=".txt" onChange={onChange} className="hidden" />
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-3 group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all">
              <Upload className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-sm font-semibold text-slate-200 mb-1">{label}</span>
            <span className="text-xs text-slate-400">Click to upload or drag and drop</span>
            <span className="text-xs text-slate-500 mt-2">TXT files only</span>
          </div>
        </div>
      </label>
      {file && (
        <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-sm text-green-300 truncate">{file.name}</span>
        </div>
      )}
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <UploadBox label="First Document" file={file1} onChange={handleFile1Change} />
      <UploadBox label="Second Document" file={file2} onChange={handleFile2Change} />
    </div>
  )
}
