"use client"

import { useState } from "react"
import FileUploadSection from "@/components/file-upload-section"
import ResultCard from "@/components/result-card"
import { AlertCircle } from "lucide-react"

export default function Home() {
  const [similarity, setSimilarity] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [file1, setFile1] = useState<File | null>(null)
  const [file2, setFile2] = useState<File | null>(null)

  const handleCompare = async () => {
    if (!file1 || !file2) {
      setError("Please upload both files")
      return
    }

    setLoading(true)
    setError(null)
    setSimilarity(null)

    try {
      const formData = new FormData()
      formData.append("file1", file1)
      formData.append("file2", file2)

      const response = await fetch("/api/compare", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to compare files")
      }

      const data = await response.json()
      setSimilarity(data.similarity)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFile1(null)
    setFile2(null)
    setSimilarity(null)
    setError(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 text-balance">Plagiarism Detection</h1>
            <p className="text-xl text-slate-300 text-balance">
              Compare two documents using advanced semantic analysis to detect similarities
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-2xl">
            {/* File Upload Section */}
            <FileUploadSection file1={file1} file2={file2} onFile1Change={setFile1} onFile2Change={setFile2} />

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="mb-6 flex items-center justify-center py-8">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-1 bg-slate-800 rounded-full"></div>
                </div>
                <p className="ml-4 text-slate-300 font-medium">Analyzing documents...</p>
              </div>
            )}

            {/* Result Card */}
            {similarity !== null && !loading && <ResultCard similarity={similarity} />}

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4 justify-center flex-wrap">
              <button
                onClick={handleCompare}
                disabled={!file1 || !file2 || loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none"
              >
                {loading ? "Comparing..." : "Compare Files"}
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-slate-700 text-slate-100 font-semibold rounded-xl hover:bg-slate-600 transition-colors"
              >
                Upload Again
              </button>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center text-slate-400 text-sm">
            <p>Supports .txt files • Semantic similarity analysis • Instant results</p>
          </div>
        </div>
      </div>
    </main>
  )
}
