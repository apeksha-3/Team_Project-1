from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import nltk
from nltk.corpus import wordnet

# Download WordNet data (only once)
nltk.download('wordnet')
nltk.download('omw-1.4')

app = Flask(_name_)
CORS(app)


def clean_text(text):
    text = re.sub(r'[^\w\s]', '', text)
    text = text.lower()
    return text.split()


def are_similar(w1, w2):
    if w1 == w2:
        return True

    syns1 = wordnet.synsets(w1)
    syns2 = wordnet.synsets(w2)

    for s1 in syns1:
        for s2 in syns2:
            sim = s1.wup_similarity(s2)
            if sim and sim > 0.8:
                return True
    return False


def modified_lcs(text1, text2):
    words1 = clean_text(text1)
    words2 = clean_text(text2)

    m = len(words1)
    n = len(words2)

    if m == 0 or n == 0:
        return 0.0

    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m):
        for j in range(n):
            if are_similar(words1[i], words2[j]):
                dp[i + 1][j + 1] = dp[i][j] + 1
            else:
                dp[i + 1][j + 1] = max(dp[i][j + 1], dp[i + 1][j])

    lcs_length = dp[m][n]
    similarity = (lcs_length / max(m, n)) * 100
    return round(similarity, 2)


@app.route('/compare', methods=['POST'])
def compare_files():
    file1 = request.files['file1']
    file2 = request.files['file2']

    text1 = file1.read().decode()
    text2 = file2.read().decode()

    similarity = modified_lcs(text1, text2)

    return jsonify({'similarity': similarity})


if _name_ == '_main_':
    app.run(debug=True, port=5000)