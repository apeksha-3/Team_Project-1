import re 
import nltk
from nltk.corpus import wordnet

nltk.download('wordnet')
nltk.download('omw-1.4')

def clean_text(text):
    text = re.sub(r'[^\w\s]', '', text)
    text = text.lower()
    return text.split()

def are_similar(w1,w2):
    if w1 == w2:
        return True
    
    syns1 = wordnet.synset(w1)
    syns2 = wordnet.synset(w2)

    for s1 in syns1:
        for s2 in syns2:
            sim = s1.wup_similarity(s2)
            if sim and sim > 0.8:
                return True 
    return False

def modified_lcs(text1 , text2):
    word1 = clean_text(text1)
    word2 = clean_text(text2)

    m = len(word1)
    n = len(word2)

    cost = []
    for i in range (m+1):
        row = [0]*(n+1)
        cost.append(row)

    i = 0 
    while i < m:
        j = 0
        while j < n :
            if are_similar(word1[i],word2[j]):
                cost[i+1][j+1] = cost[i][j] +1
            else :
                if cost[i][j+1] > cost[i + 1][j]:
                    cost[i+1][j+1] = cost[i][j+1]
                else:
                    cost[i+1][j+1] = cost[i+1][j]
            j+=1
        i+=1

    lcs_length = cost[m][n]
    similarity = (lcs_length/max(m,n)) * 100
    return round(similarity,2)