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
            if sim and sim > 0.75:
                return True 
    return False
