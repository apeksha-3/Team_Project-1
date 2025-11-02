import { type NextRequest, NextResponse } from "next/server"

function cleanText(text: string): string[] {
  const cleaned = text.replace(/[^\w\s]/g, "").toLowerCase()
  return cleaned.split(/\s+/).filter((word) => word.length > 0)
}

function areSimilar(w1: string, w2: string): boolean {
  if (w1 === w2) return true

  // Simple similarity check - can be enhanced with more sophisticated algorithms
  const len1 = w1.length
  const len2 = w2.length
  const maxLen = Math.max(len1, len2)

  let matches = 0
  for (let i = 0; i < Math.min(len1, len2); i++) {
    if (w1[i] === w2[i]) matches++
  }

  return matches / maxLen > 0.8
}

function modifiedLCS(text1: string, text2: string): number {
  const words1 = cleanText(text1)
  const words2 = cleanText(text2)

  const m = words1.length
  const n = words2.length

  if (m === 0 || n === 0) return 0

  // Create DP matrix
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0))

  // Fill matrix
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (areSimilar(words1[i], words2[j])) {
        dp[i + 1][j + 1] = dp[i][j] + 1
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j])
      }
    }
  }

  const lcsLength = dp[m][n]
  const similarity = (lcsLength / Math.max(m, n)) * 100
  return Math.round(similarity * 100) / 100
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file1 = formData.get("file1") as File
    const file2 = formData.get("file2") as File

    if (!file1 || !file2) {
      return NextResponse.json({ error: "Both files are required" }, { status: 400 })
    }

    const text1 = await file1.text()
    const text2 = await file2.text()

    const similarity = modifiedLCS(text1, text2)

    return NextResponse.json({ similarity })
  } catch (error) {
    console.error("Comparison error:", error)
    return NextResponse.json({ error: "Failed to compare files" }, { status: 500 })
  }
}
